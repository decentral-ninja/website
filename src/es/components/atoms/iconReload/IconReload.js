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
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldRenderCSS()) this.renderCSS()
    if (this.shouldRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickEventListener, { once: true })
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickEventListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
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

  get icon () {
    return this.root.querySelector('wct-icon-mdx')
  }
}
