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
    this.transitionDuration = this.getAttribute('transition-duration') || 600
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    showPromises.push(new Promise(resolve => this.addEventListener('a-logo-load', event => resolve(event), { once: true })))
    Promise.all(showPromises).then(() => {
      this.open()
      if (this.hasAttribute('toggle-once')) {
        this.addEventListener('a-logo-animationiteration', event => {
          this.close()
          this.removeEventListener('a-logo-click', this.toggle)
        }, { once: true })
        this.addEventListener('a-logo-click', this.toggle, { once: true })
        this.addEventListener('click', this.clickEventListener)
      } else {
        this.addEventListener('a-logo-animationiteration', this.close, { once: true })
        this.addEventListener('a-logo-click', this.toggle)
      }
      this.addEventListener('a-logo-click', event => this.removeEventListener('a-logo-animationiteration', this.close), { once: true })
      this.hidden = false
    })
  }

  disconnectedCallback () {
    if (this.hasAttribute('toggle-once')) {
      this.removeEventListener('click', this.clickEventListener)
    } else {
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
        --show: show 1s ease-out;
        --padding: 0.5em;
        --height: 3em;
        grid-area: header;
        padding: var(--padding);
        min-height: var(--height);
        z-index: 1;
      }
      :host > header {
        display: flex;
        justify-content: flex-end;
      }
      :host > header > a-logo {
        position: absolute;
        width: var(--height);
        transform: translate(0, 0);
        transition: var(--transition, transform ${this.transitionDuration}ms ease-out, width ${this.transitionDuration}ms ease-out);
        will-change: transform, width;
      }
      :host([toggle-once]) > header > a-logo:active {
        transform: scale(0.7);
      }
      :host([close]) > header > a-logo {
        position: static;
      }
      :host([open]) > header > a-logo {
        transform: translate(calc(50dvw - 50% + var(--padding)), calc(50dvh - 50% - var(--padding)));
        width: 100dvw;
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
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../../atoms/logo/Logo.js`,
        name: 'a-logo'
      }
    ]).then((children) => {
      this.html = /* html */`
        <header>
          <a-logo namespace="logo-default-"></a-logo>
        </header>
      `
    })
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
    this.closeTimeout = setTimeout(() => this.setAttribute('close', 'true'), this.transitionDuration * 1.2);
    clearTimeout(this.faviconTimeout)
    this.faviconTimeout = setTimeout(() => this.logo.setAttribute('favicon', 'true'), this.transitionDuration / 2);
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

  clickEventListener = () => {
    this.dispatchEvent(new CustomEvent(this.getAttribute('click-event-name') || this.tagName.toLowerCase() + '-click', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  get header () {
    return this.root.querySelector('header')
  }

  get logo () {
    return this.root.querySelector('a-logo')
  }
}
