/**
 * y-bluetooth-provider.js
 *
 * Sketch of a Yjs connection provider over the Web Bluetooth API (GATT).
 *
 * IMPORTANT ARCHITECTURAL NOTE:
 * Web Bluetooth only implements the BLE Central (GATT client) role — a browser
 * page can never act as a peripheral/GATT server. So this provider connects to
 * ONE peripheral (a microcontroller, phone-as-peripheral, or Node process using
 * e.g. @abandonware/bleno). Two browser tabs cannot connect directly to each
 * other. For >2-party sync, the peripheral must be a relay/hub that accepts
 * multiple simultaneous Central connections and forwards frames between them —
 * this provider only implements the browser side of one such link.
 *
 * The peripheral must implement the same framing + message protocol on its side:
 *   - one write-capable characteristic (browser -> peripheral)
 *   - one notify-capable characteristic (peripheral -> browser)
 *   - frames of [msgId:uint8][chunkIndex:uint8][isLast:uint8] + payload bytes
 *
 * Sync + awareness reuse y-protocols as-is (they're already transport-agnostic).
 */

import * as awarenessProtocol from 'y-protocols/awareness.js'
import * as syncProtocol from 'y-protocols/sync.js'
import * as encoding from 'lib0/encoding'
import * as decoding from 'lib0/decoding'
import { Observable } from 'lib0/observable'

const messageSync = 0
const messageAwareness = 1

// [msgId][chunkIndex][isLast] prefix on every GATT write/notification
const FRAME_HEADER_SIZE = 3

export class BluetoothProvider extends Observable {
  /**
   * @param {Y.Doc} doc
   * @param {object} opts
   * @param {string} opts.serviceUUID
   * @param {string} opts.txCharacteristicUUID  browser -> peripheral (write)
   * @param {string} opts.rxCharacteristicUUID  peripheral -> browser (notify)
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {number} [opts.chunkPayloadSize] bytes per GATT write, excluding the
   *   3-byte frame header. Web Bluetooth doesn't expose the negotiated ATT MTU,
   *   so this is a guess. 180 works on most modern Chromium/Android stacks after
   *   MTU negotiation; drop it to ~17 if writes start throwing on older/unusual
   *   hardware (23-byte unnegotiated MTU minus 3-byte ATT write header minus our
   *   3-byte frame header).
   * @param {string} [opts.namePrefix] optional device name filter for requestDevice
   */
  constructor(doc, {
    serviceUUID,
    txCharacteristicUUID,
    rxCharacteristicUUID,
    awareness = new awarenessProtocol.Awareness(doc),
    chunkPayloadSize = 180,
    namePrefix
  } = {}) {
    super()
    this.doc = doc
    this.awareness = awareness
    this.serviceUUID = serviceUUID
    this.txCharacteristicUUID = txCharacteristicUUID
    this.rxCharacteristicUUID = rxCharacteristicUUID
    this.chunkPayloadSize = chunkPayloadSize
    this.namePrefix = namePrefix

    this.device = null
    this.server = null
    this.txChar = null
    this.rxChar = null
    this.connected = false
    this.synced = false

    this._outMsgId = 0
    // reassembly state per in-flight logical message
    this._inBuffers = new Map() // msgId -> { chunks: Uint8Array[], expectedIndex: number }

    this._onDocUpdate = this._onDocUpdate.bind(this)
    this._onAwarenessUpdate = this._onAwarenessUpdate.bind(this)
    this._onNotify = this._onNotify.bind(this)
    this._onGattDisconnected = this._onGattDisconnected.bind(this)

    doc.on('update', this._onDocUpdate)
    awareness.on('update', this._onAwarenessUpdate)

    window.addEventListener('beforeunload', () => {
      awarenessProtocol.removeAwarenessStates(this.awareness, [doc.clientID], 'window unload')
    })

    // re-broadcast full state on foregrounding: background-tab throttling can
    // stall our regular heartbeats past the 30s awareness timeout on the remote side
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.connected) {
        this._broadcastFullAwarenessState()
      }
    })
  }

  async connect() {
    const filters = this.namePrefix
      ? [{ namePrefix: this.namePrefix, services: [this.serviceUUID] }]
      : [{ services: [this.serviceUUID] }]

    this.device = await navigator.bluetooth.requestDevice({
      filters,
      optionalServices: [this.serviceUUID]
    })
    this.device.addEventListener('gattserverdisconnected', this._onGattDisconnected)

    this.server = await this.device.gatt.connect()
    const service = await this.server.getPrimaryService(this.serviceUUID)
    this.txChar = await service.getCharacteristic(this.txCharacteristicUUID)
    this.rxChar = await service.getCharacteristic(this.rxCharacteristicUUID)

    await this.rxChar.startNotifications()
    this.rxChar.addEventListener('characteristicvaluechanged', this._onNotify)

    this.connected = true
    this.emit('status', [{ status: 'connected' }])

    // mirrors the handshake y-websocket does on open: kick off doc sync,
    // then push our current awareness state
    this._sendSyncStep1()
    this._broadcastFullAwarenessState()
  }

  disconnect() {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect()
    }
    this._teardown()
  }

  destroy() {
    this.doc.off('update', this._onDocUpdate)
    this.awareness.off('update', this._onAwarenessUpdate)
    this.disconnect()
    super.destroy()
  }

  // ---------------------------------------------------------------- outgoing

  _sendSyncStep1() {
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageSync)
    syncProtocol.writeSyncStep1(encoder, this.doc)
    this._sendMessage(encoding.toUint8Array(encoder))
  }

  _onDocUpdate(update, origin) {
    if (origin === this) return // don't echo updates we just applied from bluetooth
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageSync)
    syncProtocol.writeUpdate(encoder, update)
    this._sendMessage(encoding.toUint8Array(encoder))
  }

  _onAwarenessUpdate({ added, updated, removed }) {
    this._broadcastAwareness(added.concat(updated, removed))
  }

  _broadcastFullAwarenessState() {
    this._broadcastAwareness(Array.from(this.awareness.getStates().keys()))
  }

  _broadcastAwareness(clients) {
    if (!this.connected || clients.length === 0) return
    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageAwareness)
    encoding.writeVarUint8Array(
      encoder,
      awarenessProtocol.encodeAwarenessUpdate(this.awareness, clients)
    )
    this._sendMessage(encoding.toUint8Array(encoder))
  }

  /**
   * Split one logical protocol message into MTU-sized GATT writes and send them
   * sequentially, awaiting each write so we never outrun the link. Sequential +
   * awaited writes also means the peripheral can assume in-order chunk delivery
   * and doesn't need to sort by chunkIndex — this implementation still checks it
   * defensively and drops the message on any gap.
   */
  async _sendMessage(bytes) {
    if (!this.txChar) return
    const msgId = this._outMsgId = (this._outMsgId + 1) & 0xff
    const payloadSize = this.chunkPayloadSize
    const total = Math.max(1, Math.ceil(bytes.length / payloadSize))

    for (let i = 0; i < total; i++) {
      const start = i * payloadSize
      const chunk = bytes.subarray(start, start + payloadSize)
      const frame = new Uint8Array(FRAME_HEADER_SIZE + chunk.length)
      frame[0] = msgId
      frame[1] = i
      frame[2] = i === total - 1 ? 1 : 0
      frame.set(chunk, FRAME_HEADER_SIZE)

      try {
        await this.txChar.writeValueWithResponse(frame)
      } catch (err) {
        // a mid-message write failure leaves a partial message on the wire;
        // rather than trying to resume, drop it. The next full sync-step-1 /
        // awareness broadcast will repair state, same philosophy as y-webrtc's
        // recovery-through-resync rather than reliable delivery.
        this.emit('error', [err])
        return
      }
    }
  }

  // ---------------------------------------------------------------- incoming

  _onNotify(event) {
    const frame = new Uint8Array(event.target.value.buffer)
    const msgId = frame[0]
    const chunkIndex = frame[1]
    const isLast = frame[2] === 1
    const payload = frame.subarray(FRAME_HEADER_SIZE)

    let buf = this._inBuffers.get(msgId)
    if (!buf) {
      buf = { chunks: [], expectedIndex: 0 }
      this._inBuffers.set(msgId, buf)
    }

    if (chunkIndex !== buf.expectedIndex) {
      // out-of-order or dropped chunk: discard the in-progress message and
      // wait for the sender's next full broadcast to repair state
      this._inBuffers.delete(msgId)
      return
    }

    buf.chunks.push(payload)
    buf.expectedIndex++

    if (isLast) {
      this._inBuffers.delete(msgId)
      const total = buf.chunks.reduce((n, c) => n + c.length, 0)
      const message = new Uint8Array(total)
      let offset = 0
      for (const c of buf.chunks) {
        message.set(c, offset)
        offset += c.length
      }
      this._handleMessage(message)
    }
  }

  _handleMessage(message) {
    const decoder = decoding.createDecoder(message)
    const messageType = decoding.readVarUint(decoder)

    switch (messageType) {
      case messageSync: {
        const encoder = encoding.createEncoder()
        encoding.writeVarUint(encoder, messageSync)
        // origin = this, so _onDocUpdate ignores the update we just applied
        const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, this.doc, this)

        if (!this.synced && syncMessageType === syncProtocol.messageYjsSyncStep2) {
          this.synced = true
          this.emit('synced', [true])
          this.emit('status', [{ status: 'synced' }])
        }
        // readSyncMessage may have written a reply (e.g. syncStep2 in response
        // to the peer's syncStep1) — send it back if so
        if (encoding.length(encoder) > 1) {
          this._sendMessage(encoding.toUint8Array(encoder))
        }
        break
      }
      case messageAwareness: {
        awarenessProtocol.applyAwarenessUpdate(
          this.awareness,
          decoding.readVarUint8Array(decoder),
          this
        )
        break
      }
    }
  }

  _onGattDisconnected() {
    this.connected = false
    this.synced = false
    awarenessProtocol.removeAwarenessStates(
      this.awareness,
      Array.from(this.awareness.getStates().keys()).filter(id => id !== this.doc.clientID),
      'bluetooth disconnected'
    )
    this.emit('status', [{ status: 'disconnected' }])
    this._teardown()
  }

  _teardown() {
    this.connected = false
    if (this.rxChar) {
      this.rxChar.removeEventListener('characteristicvaluechanged', this._onNotify)
    }
    this._inBuffers.clear()
  }
}
