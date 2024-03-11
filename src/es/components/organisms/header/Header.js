// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/**
 * Header
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 * @css {
 * }
 * @attribute {
 * }
 */
export default class Header extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.setAttribute('aria-label', 'Header')
    this.transitionDuration = this.getAttribute('transition-duration') || 400
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    // Logo has loader
    // showPromises.push(new Promise(resolve => this.addEventListener('a-logo-load', event => resolve(event), { once: true })))
    Promise.all(showPromises).then(() => {
      if (this.hasAttribute('toggle-once')) {
        if (this.hasAttribute('open')) this.addEventListener('a-logo-click', this.toggle, { once: true })
        this.addEventListener('a-logo-animationiteration', event => {
          this.close()
          this.removeEventListener('a-logo-click', this.toggle)
        }, { once: true })
      } else {
        this.addEventListener('a-logo-animationiteration', this.close, { once: true })
        this.addEventListener('a-logo-click', this.toggle)
      }
      this.addEventListener('a-logo-click', event => this.removeEventListener('a-logo-animationiteration', this.close), { once: true })
      this.connectedCallbackOnce()
      this.hidden = false
    })
  }

  connectedCallbackOnce () {
    if (this.hasAttribute('open')) {
      this.open()
    } else {
      this.close()
    }
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    if (!this.hasAttribute('toggle-once')) {
      this.removeEventListener('a-logo-click', this.toggle)
    }
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
    return !this.header
  }

  /**
   * renders the o-header css
   *
   * @return {Promise<void>}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        ${this.hasAttribute('height-auto')
          ? '--header-height: auto;'
          : ''
        }
        --padding: var(--spacing);
        --height: var(--header-height, 3em);
        grid-area: header;
        padding: var(--padding);
        min-height: var(--height);
        z-index: 1;
      }
      :host > header, :host > header > div {
        display: flex;
        gap: var(--spacing);
        justify-content: var(--header-justify-content, space-between);
        align-items: var(--header-align-items, top);
        position: relative;
        tap-highlight-color: transparent;
        --webkit-tap-highlight-color: transparent;
      }
      :host > header > *:first-child {
        overflow: hidden;
      }
      :host > header > *:first-child {
        z-index: 1;
      }
      :host([count-header-children="1"]) > header {
        justify-content: flex-end;
      }
      :host > header a-logo {
        position: absolute;
        right: 0;
        width: var(--height);
        transform: translate(0, 0);
        ${this.hasAttribute('logo-max-width')
          ? 'width: max-content;'
          : ''
        }
      }
      :host > header a-logo:not([no-animation]) {
        animation: transition-reverse ${this.transitionDuration}ms ease-out;
        will-change: width;
      }
      :host > header > a {
        display: flex;
        align-items: center;
        color: var(--a-color);
        font-family: var(--font-family-secondary);
        transition: color .3s ease-out;
      }
      :host > header > a:hover {
        color: var(--color-hover);
      }
      :host > header > a > a-icon-chat {
        width: calc(var(--height) - 0.5em);
      }
      :host([close]) > header a-logo {
        order: 2;
        position: static;
      }
      :host([open]) > header a-logo:not([no-animation]) {
        width: 100svw;
        transform: translate(calc(50svw - 50% + var(--padding)), calc(50svh - 50% - var(--padding)));
        animation: transition ${this.transitionDuration}ms ease-out;
      }
      @keyframes transition {
        from {
          transform: translate(0, 0);
          width: var(--height);
        }
        to {
          transform: translate(calc(50svw - 50% + var(--padding)), calc(50svh - 50% - var(--padding)));
          width: 100svw;
        }
      }
      @keyframes transition-reverse {
        from {
          transform: translate(calc(50svw - 50% + var(--padding)), calc(50svh - 50% - var(--padding)));
          width: 100svw;
        }
        to {
          transform: translate(0, 0);
          width: var(--height);
        }
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
      case 'header-default-':
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
    this.header = this.root.querySelector(this.cssSelector + ' > header') || document.createElement('header')
    Array.from(this.root.children).forEach(node => {
      if (node === this.header || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.header.appendChild(node)
    })
    this.setAttribute('count-header-children', this.header.children.length)
    this.html = this.header
    return Promise.resolve()
  }

  /**
   * to avoid connect and disconnect callbacks within children when moving them into header
   *
   * @param {string} html
   * @return {boolean}
   */
  setContent (html) {
    const contentEl = this.header
    if (!contentEl) return false
    contentEl.innerHTML = html
    return true
  }

  open = () => {
    clearTimeout(this.closeTimeout)
    clearTimeout(this.faviconTimeout)
    this.setAttribute('open', 'true')
    this.removeAttribute('close')
    this.logo.removeAttribute('favicon')
    this.dispatchEvent(new CustomEvent(this.getAttribute('open-event-name') || this.tagName.toLowerCase() + '-open', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  close = () => {
    this.removeAttribute('open')
    clearTimeout(this.closeTimeout)
    this.closeTimeout = setTimeout(() => this.setAttribute('close', 'true'), this.transitionDuration * 2)
    clearTimeout(this.faviconTimeout)
    this.faviconTimeout = setTimeout(() => this.logo.setAttribute('favicon', 'true'), this.transitionDuration / 2)
    this.dispatchEvent(new CustomEvent(this.getAttribute('close-event-name') || this.tagName.toLowerCase() + '-close', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  toggle = () => {
    if (this.hasAttribute('open')) {
      this.close()
    } else {
      this.open()
    }
  }

  get logo () {
    return this.root.querySelector('a-logo')
  }
}
