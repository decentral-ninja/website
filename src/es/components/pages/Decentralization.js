// @ts-check
import Index from './Index.js'

/* global Environment */

/**
* Decentral Ninja Decentralization Page
*
* @export
* @class Decentralization
* @type {CustomElementConstructor}
*/
export default class Decentralization extends Index {
  constructor (...args) {
    super(...args)

    this.removeAttribute('noise')
    this.transitionDuration = 0
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    // @ts-ignore
    this.html = /* html */`
      <section>
        <o-header height-auto logo-width="2em" close toggle-once style="--header-align-items: center;">
          <header>
            <a href="?page=/chat&${this.providerQuery}" route target="_self"><span>chat 👉</span> <a-icon-chat hover-selector="a"></a-icon-chat></a>
            <a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a>
          </header>
        </o-header>
        <o-body>
          <style protected>
            :host {
              --ul-list-style: decimal;
            }
            :host .sub {
              --ul-margin: 0;
              --ul-list-style: lower-alpha;
            }
            :host pre {
              text-align: center;
              overflow: auto;
              max-width: 100%;
            }
          </style>
          <main>
            <div class=pattern>
              <div class=content>
                <h1>Decentralization</h1>
                <p><a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a></p>
                <h3>分散化</h3>
                <hr>
                <h3>storage</h3>
                <p>DCN lives to 100% in your browser. All data is on your device at all times. Local- and offline-first storage. Your browser holds shareable data in your local database (CRDT), which syncs without conflict.</p>
                <wct-picture defaultSource="${this.importMetaUrl}../../../../docs/browser.drawio.svg" alt="browser architecture"></wct-picture>
                <p>Files are handled through <a href="https://webtorrent.io/" target="_blank">webtorrent.io</a> and <a href="https://about.ipfs.io/" target="_blank">ipfs.io</a>. All other data is exchanged as CRDT through a flexible <a href="https://docs.yjs.dev/ecosystem/connection-provider" target="_blank">provider system</a>. Additionally, the CRDT is snapshotted to IPFS/webtorrent every time you share a room or message.</p>
                <p>DCN supports multiple connection methods (webrtc, websocket, trystero - BitTorrent, Nostr, MQTT, IPFS), see <a href="?page=/how" route target="_self">how to use? - provider list <wct-icon-mdx title="providers" icon-url="../../../../../../img/icons/network.svg" size="1em"></wct-icon-mdx></a>. Websockets allow a temporary storage, so that data syncs when users are offline (see keepAlive). It can also act as a notification service.</p>
                <hr>
                <h3>browser limitations</h3>
                <p>A browser can not make a direct connection to an other browser. Because a browser does not have acces to raw TCP or UDP:</p>
                <pre>
Browser JavaScript
┌──────────────────────────────────────┐
│ fetch()           HTTP(S)            │
│ WebSocket API    WebSocket           │
│ WebRTC API       WebRTC              │
│ WebTransport     HTTP/3              │
└──────────────────────────────────────┘
                ▲
                │
Browser APIs
═══════════════════════════════════════
                │
                ▼
❌ No access from JavaScript
to raw TCP or UDP sockets
═══════════════════════════════════════
                │
┌──────────────────────────────────────┐
│ TCP                                  │
│ UDP                                  │
│ TLS                                  │
│ QUIC                                 │
│ IP                                   │
│ Ethernet / Wi-Fi                     │
└──────────────────────────────────────┘
                │
             Internet
                </pre>
                <p>This is the reason, that we need to use handshake providers (servers) to communicate from browser to browser.</p>
                <hr>
                <h3>decentralized network</h3>
                
                <h3>example:</h3>
                <wct-picture defaultSource="${this.importMetaUrl}../../../../docs/connection-graph.svg" alt="connection graph"></wct-picture>
                <p>At the above example there are four users and three providers. User-one and user-four sync the data with two providers and for that create a bridge, due to which user-two and user-three are in sync with everyone.</p>
                <hr>
                <h3>self hosting</h3>
                <p>All parts of DCN can be hosted by yourself. The instances you can access by default are located in Switzerland and for that reason, they may are slow from your location, depending where you are. <a href="https://github.com/decentral-ninja/website" target=_blank>Open an issue, if you would like to add one of your providers to the default listing.</a></p>
                <hr>
                <h4 style="text-decoration: underline;">hosting - decentral ninja (DCN web):</h4>
                <ul>
                  <li>decentral-ninja/website - <a href="https://github.com/decentral-ninja/website" target="_blank">github</a></li>
                </ul>
                <p>customize your own DCN web. Users from your origin (example https://your-website.com) will still be able to connect with users on origin https://decentral.ninja . Note: Every origin creates a separate session and for that is isolated within the browser. Try <a href="https://dcn-web.hostlocal.app/ipfs/QmUcYNResv37Cr3gK2jZ4LKVVrv32dU4mdjRTxbx8z8Rao" target=_blank>DCN hosted at ipfs</a>... on any public ipfs gateway: <a href="https://ipfs.oversas.org/ipfs/QmUcYNResv37Cr3gK2jZ4LKVVrv32dU4mdjRTxbx8z8Rao" target=_blank>https://ipfs.oversas.org</a>!</p>
                <hr>
                <h4 style="text-decoration: underline;">hosting - CRDT connection providers:</h4>
                <ul>
                  <li>websocket - <a href="https://github.com/Weedshaker/y-websocket/tree/master" target="_blank">github</a>, <a href="https://hub.docker.com/repository/docker/weedshaker/y-websocket/general" target="_blank">docker container</a></li>
                  <li>webrtc - <a href="https://github.com/yjs/y-webrtc" target="_blank">github</a></li>
                </ul>
                <p>providers can be changed and shared by users and are shared within a DCN link. They can also be configured at <a href="https://github.com/decentral-ninja/website/blob/main/src/es/Environment.js" target="_blank">Environment.js</a> in case you host your own DCN web.</p>
                <hr>
                <h4 style="text-decoration: underline;">hosting - file sharing:</h4>
                <ul>
                  <li>bittorrent-tracker - <a href="https://github.com/webtorrent/bittorrent-tracker" target="_blank">github</a></li>
                  <li>kubo - <a href="https://github.com/ipfs/kubo" target="_blank">github</a></li>
                </ul>
                <p>file sharing services can be configured at <a href="https://github.com/decentral-ninja/website/blob/main/src/es/Environment.js" target="_blank">Environment.js</a> in case you host your own DCN web.</p>
                <hr>
                <h4 style="text-decoration: underline;">hosting - video call:</h4>
                <ul>
                  <li>jitsi - <a href="https://github.com/jitsi/jitsi-meet" target="_blank">github</a></li>
                </ul>
                <p>jitsi urls can be configured at <a href="https://github.com/decentral-ninja/website/blob/main/src/es/Environment.js" target="_blank">Environment.js</a> in case you host your own DCN web.</p>
              </div>
            </div>
          </main>
        </o-body>
        <o-footer></o-footer>
      </section>
    `
    return this.fetchModules([
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/header/Header.js?${Environment?.version || ''}`,
        name: 'o-header'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../atoms/logo/Logo.js?${Environment?.version || ''}`,
        name: 'a-logo'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/body/Body.js?${Environment?.version || ''}`,
        name: 'o-body'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/footer/Footer.js?${Environment?.version || ''}`,
        name: 'o-footer'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../atoms/iconChat/IconChat.js?${Environment?.version || ''}`,
        name: 'a-icon-chat'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/organisms/grid/Grid.js?${Environment?.version || ''}`,
        name: 'wct-grid'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/button/Button.js?${Environment?.version || ''}`,
        name: 'wct-button'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/picture/Picture.js?${Environment?.version || ''}`,
        name: 'wct-picture'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js?${Environment?.version || ''}`,
        name: 'wct-icon-mdx'
      }
    ])
  }
}
