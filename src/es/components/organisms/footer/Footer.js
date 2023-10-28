// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/**
 * Footer
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @css {
 * }
 * @attribute {
 * }
 */
export default class Footer extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.setAttribute('aria-label', 'Footer')
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
  }

  disconnectedCallback () {}

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
    return !this.footer
  }

  /**
   * renders the o-footer css
   *
   * @return {Promise<void>}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: footer;
        padding: 0.5em;
      }
    `
    return this.fetchTemplate()
  }

  /**
   * fetches the template
   *
   * @return {Promise<void>}
   */
  fetchTemplate () {
    switch (this.getAttribute('namespace')) {
      case 'footer-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }], false)
      default:
        return Promise.resolve()
    }
  }

  /**
   * renders the html
   *
   * @return {Promise<void>}
   */
  renderHTML () {
    this.footer = this.root.querySelector(this.cssSelector + ' > footer') || document.createElement('footer')
    Array.from(this.root.children).forEach(node => {
      if (node === this.footer || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.footer.appendChild(node)
    })
    this.html = this.footer
    return Promise.resolve()
  }
}
