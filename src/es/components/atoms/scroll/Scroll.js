// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/**
 * Scroll of decentral ninja
 *
 * @export
 * @class Scroll
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} src used for the image source
 *  {string} href used for the link reference
 * }
 */
export default class Scroll extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldRenderCSS()) this.renderCSS()
    if (this.shouldRenderHTML()) this.renderHTML()
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
    return !this.aIconMdx
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > div {
        display: flex;
        background-color: var(--color-secondary);
        border: 2px solid var(--color-secondary);
        border-radius: 50%;
        padding: 0.25em;
        transition: background-color .3s ease-out;
        justify-content: center;
        align-items: center;
      }
      :host(.hover) > div, :host(:hover) > div {
        background-color: var(--background-color);
      }
      :host > div > wct-icon-mdx {
        color: var(--background-color);
        transform: translateY(0.25em);
        transition: color .3s ease-out;
        height: auto;
        width: 100%;
      }
      :host(.hover) > div > wct-icon-mdx, :host(:hover) > div > wct-icon-mdx {
        color: var(--color-hover);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = ''
    // https://tabler-icons.io/
    this.html = /* html */'<div><wct-icon-mdx title="scroll down" hover-on-parent-element id="show-modal" icon-url="../../../../../../img/icons/swipe-down.svg" size="2em"></wct-icon-mdx></div>'
  }

  get aIconMdx () {
    return this.root.querySelector('wct-icon-mdx')
  }
}
