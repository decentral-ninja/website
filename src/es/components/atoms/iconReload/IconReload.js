// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/**
 * IconReload of decentral ninja
 *
 * @export
 * @class IconReload
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} src used for the image source
 *  {string} href used for the link reference
 * }
 */
export default class IconReload extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.clickEventListener = event => location.reload()

    let lastUsersEventDetail = null
    let usersTimeoutId = null
    const usersSkipTimeoutClear = 5
    let usersTimeoutCounter = 1
    this.usersEventListener = async event => {
      lastUsersEventDetail = event.detail
      if (usersTimeoutCounter % usersSkipTimeoutClear) clearTimeout(usersTimeoutId)
      usersTimeoutCounter++
      usersTimeoutId = setTimeout(async () => {
        usersTimeoutCounter = 1
        if (this.hasConnectionProblem()) this.setAttributeIsConnectedToUsers(event.detail)
        // @ts-ignore
      }, self.Environment.awarenessEventListenerDelay || 1000)
    }

    let lastProvidersEventDetail = null
    let providersTimeoutId = null
    const providersSkipTimeoutClear = 5
    let providersTimeoutCounter = 1
    this.providersEventListener = (event, setUpdating = true) => {
      lastProvidersEventDetail = event.detail
      if (providersTimeoutCounter % providersSkipTimeoutClear) clearTimeout(providersTimeoutId)
      providersTimeoutCounter++
      providersTimeoutId = setTimeout(async () => {
        providersTimeoutCounter = 1
        if (this.hasConnectionProblem()) this.setAttributeIsConnectedToProviders(event.detail)
        // @ts-ignore
      }, self.Environment.awarenessEventListenerDelay || 1000)
    }

    this.visibilitychangeEventListener = event => {
      if (document.hidden) return
      if (lastUsersEventDetail) this.setAttributeIsConnectedToUsers(lastUsersEventDetail)
      if (lastProvidersEventDetail) this.setAttributeIsConnectedToProviders(lastProvidersEventDetail)
    }

    this.onlineEventListener = event => this.setAttribute('online', '')
    this.offlineEventListener = event => this.removeAttribute('online')
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldRenderCSS()) this.renderCSS()
    if (this.shouldRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickEventListener, { once: true })
    this.globalEventTarget.addEventListener('yjs-users', this.usersEventListener)
    this.globalEventTarget.addEventListener('yjs-providers-data', this.providersEventListener)
    document.addEventListener('visibilitychange', this.visibilitychangeEventListener)
    self.addEventListener('online', this.onlineEventListener)
    self.addEventListener('offline', this.offlineEventListener)
    if (navigator.onLine) {
      this.onlineEventListener()
    } else {
      this.offlineEventListener()
    }
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickEventListener)
    this.globalEventTarget.removeEventListener('yjs-users', this.usersEventListener)
    this.globalEventTarget.removeEventListener('yjs-providers-data', this.providersEventListener)
    document.removeEventListener('visibilitychange', this.visibilitychangeEventListener)
    self.removeEventListener('online', this.onlineEventListener)
    self.removeEventListener('offline', this.offlineEventListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderCSS () {
    return !this.root.querySelector(`${this.cssSelector} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderHTML () {
    return !this.icon
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        --color: var(--color-error);
        --color-hover: var(--color-yellow);
        display: none;
      }
      /* navigator.onLine && this.getAttribute('is-connected-to-users') === 'true' && this.getAttribute('is-connected-to-providers') === 'false' */
      :host([online][is-connected-to-users=true][is-connected-to-providers=false]) {
        display: flex;
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = /* html */`
      <wct-icon-mdx title=reload icon-url="../../../../../../img/icons/reload.svg" size="2em"></wct-icon-mdx>
    `
    return this.fetchModules([
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js?${Environment?.version || ''}`,
        name: 'wct-icon-mdx'
      }
    ])
  }

  async setAttributeIsConnectedToUsers (eventDetail) {
    this.setAttribute('is-connected-to-users', (await eventDetail.getData()).usersConnectedWithSelf.size - 1 > 0)
  }

  async setAttributeIsConnectedToProviders (eventDetail) {
    const data = await eventDetail.getData()
    this.setAttribute('is-connected-to-providers', (await Promise.all((await data.getSessionProvidersByStatus()).connected.map(provider => data.pingProvider(provider.split(data.separator)[1], true)))).some(ping => ping.status === 'success'))
  }

  hasConnectionProblem () {
    // no attribute or selector :host([online][is-connected-to-users=true][is-connected-to-providers=false])
    return !this.hasAttribute('is-connected-to-users') || !this.hasAttribute('is-connected-to-providers') || (navigator.onLine && this.getAttribute('is-connected-to-users') === 'true' && this.getAttribute('is-connected-to-providers') === 'false')
  }

  get icon () {
    return this.root.querySelector('wct-icon-mdx')
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
