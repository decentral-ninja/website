// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/**
 * Body
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Body
 * @type {CustomElementConstructor}
 * @css {
 * }
 * @attribute {
 * }
 */
export default class Body extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.setAttribute('aria-label', 'Body')
    let timeoutId = null
    this.scrollEventListener = event => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        // isScrolledBottom
        if (this.main.scrollHeight < this.main.scrollTop + this.main.offsetHeight + 40 /* tollerance */) {
          this.setAttribute('is-scrolled-bottom', '')
          if (this.hasAttribute('scroll-icon-only-show-on-event')) this.removeAttribute('scroll-icon-has-show-event')
        } else {
          this.removeAttribute('is-scrolled-bottom')
        }
        if (this.hasAttribute('scroll-event-name')) this.dispatchEvent(new CustomEvent(this.getAttribute('scroll-event-name') || 'merge-active-room', {
          detail: {
            scrollTop: this.main.scrollTop
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }, 400)
    }
    this.mainScrollEventListener = event => {
      const options = {}
      if (event.detail?.x) options.left = event.detail?.x
      options.top = event.detail?.y || this.main.scrollHeight
      options.behavior = event.detail?.behavior || 'smooth'
      this.main.scroll(options)
    }
    this.scrollIconShowEventListener = event => {
      this.setAttribute('scroll-icon-has-show-event', '')
      this.scrollEventListener()
    }
    this.aScrollClickEventListener = event => {
      this.mainScrollEventListener({detail: {behavior: 'instant'}})
      setTimeout(() => this.mainScrollEventListener({detail: {behavior: 'smooth'}}), 200)
      if (this.hasAttribute('scroll-icon-only-show-on-event')) this.removeAttribute('scroll-icon-has-show-event')
    }
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
    this.globalEventTarget.addEventListener('main-scroll', this.mainScrollEventListener)
    if (this.aScroll) {
      this.main.addEventListener('scroll', this.scrollEventListener)
      this.globalEventTarget.addEventListener('scroll-icon-show-event', this.scrollIconShowEventListener)
      this.setAttribute('is-scrolled-bottom', '')
      this.aScroll.addEventListener('click', this.aScrollClickEventListener)
    }
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener('main-scroll', this.mainScrollEventListener)
    if (this.aScroll) {
      this.main.removeEventListener('scroll', this.scrollEventListener)
      this.globalEventTarget.removeEventListener('scroll-icon-show-event', this.scrollIconShowEventListener)
      this.aScroll.removeEventListener('click', this.aScrollClickEventListener)
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
    return !this.main
  }

  /**
   * renders the o-body css
   *
   * @return {Promise<void>}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        --show: none;
        --margin: var(--spacing);
        --border-radius: 0.5em;
        grid-area: body;
        background-color: var(--color-rgba-50);
        border-radius: var(--border-radius);
        border: 2px solid var(--color);
        margin: 0 var(--margin);
        overflow: hidden;
        position: relative;
      }
      :host:before {
        border-radius: var(--border-radius);
        content:"";
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        box-shadow: inset 4px 4px 8px var(--background-color), inset -4px -4px 8px var(--background-color);
        z-index: 1;
      }
      :host > main {
        overflow-y: auto;
        max-height: 100%;
        height: 100%;
        scrollbar-color: var(--color) var(--background-color);
        scrollbar-width: thin;
      }
      :host > main > div.pattern, :host > main > div.pattern:before {
        background-repeat: repeat;
        /* https://heropatterns.com/ */
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='var(--background-color)' fill-opacity='0.1' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
      }
      :host > main > div.pattern {
        padding: var(--spacing);
        min-height: 100%;
        position: relative;
      }
      :host > main > div.pattern:before {
        padding: 0;
        content:"";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        pointer-events: none;
      }
      :host > main > div.pattern:before {
        top: -100%;
      }
      :host > main > div.pattern > div.content {
        display: flex;
        flex-direction: column;
        margin: auto;
        max-width: min(100%, 1400px);
        position: relative;
      }
      :host > a-scroll {
        position: absolute;
        bottom: var(--spacing);
        right: calc(3 * var(--spacing));
        opacity: 0.8;
        transition: opacity 0.3s ease-out;
      }
      :host([is-scrolled-bottom]) > a-scroll, :host([scroll-icon-only-show-on-event]:not([scroll-icon-has-show-event])) > a-scroll {
        opacity: 0;
        pointer-events: none;
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
    /** @type {import("../../../event-driven-web-components-prototypes/src/Shadow.js").fetchCSSParams[]} */
    const styles = [
      {
        path: `${this.importMetaUrl}../../../web-components-toolbox/src/css/reset.css`, // no variables for this reason no namespace
        namespace: false
      },
      {
        path: `${this.importMetaUrl}../../../web-components-toolbox/src/css/style.css`, // apply namespace and fallback to allow overwriting on deeper level
        namespaceFallback: true
      }
    ]
    switch (this.getAttribute('namespace')) {
      case 'body-default-':
        return this.fetchCSS([{
          path: `${this.importMetaUrl}./default-/default-.css`, // apply namespace since it is specific and no fallback
          namespace: false
        }, ...styles], false)
      default:
        return this.fetchCSS(styles, false)
    }
  }

  /**
   * renders the html
   *
   * @return {Promise<void>}
   */
  renderHTML () {
    this.main = this.root.querySelector(this.cssSelector + ' > main') || document.createElement('main')
    let patternDiv = this.main.querySelector('div.pattern')
    if (!patternDiv) {
      patternDiv = document.createElement('div')
      patternDiv.classList.add('pattern')
      this.main.appendChild(patternDiv)
    }
    let contentDiv = patternDiv.querySelector('div.content')
    if (!contentDiv) {
      contentDiv = document.createElement('div')
      contentDiv.classList.add('content')
      patternDiv.appendChild(contentDiv)
    }
    Array.from(this.root.children).forEach(node => {
      if (node === this.main || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      contentDiv.appendChild(node)
    })
    this.html = this.main
    if (!this.hasAttribute('scroll-icon')) return Promise.resolve()
    this.html = '<a-scroll></a-scroll>'
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../../atoms/scroll/Scroll.js`,
        name: 'a-scroll'
      }
    ])
  }

  /**
   * to avoid connect and disconnect callbacks within children when moving them into div.content
   *
   * @param {string} html
   * @return {boolean}
   */
  setContent (html) {
    const contentEl = this.root.querySelector('.content')
    if (!contentEl) return false
    contentEl.innerHTML = html
    return true
  }

  get aScroll () {
    return this.root.querySelector('a-scroll')
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
