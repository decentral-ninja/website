// @ts-check
import { Shadow } from '../../event-driven-web-components-prototypes/src/Shadow.js'

/**
* Decentral Ninja Main/Start Page
*
* @export
* @class Index
* @type {CustomElementConstructor}
*/
export default class Index extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)
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
    // @ts-ignore
    return !this.logo
  }

  /**
  * renders the css
  *
  * @return {void}
  */
  renderCSS () {
    this.css = /* css */ `
    :host {
      display: block;
    }
    :host > a-logo {
      height: 100dvh;
    }
    `
    // set global styles in the light dom
    this.style.textContent = ''
    this.setCss(/* css */`
      body {
        background-color: var(--background-color);
        margin: 0;
        overflow: hidden;
        padding: 0;
      }
    `, undefined, false, false, this.style, false)
    document.head.appendChild(this.style)
  }

  /**
  * renders the html
  *
  * @return {void}
  */
  renderHTML () {
    // TODO: make a header with nav which loads the logo
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../atoms/logo/Logo.js`,
        name: 'a-logo'
      }
    ]).then((children) => {
      // const icon = new children[0].constructorClass({ namespace: this.getAttribute('namespace') || '', namespaceFallback: this.hasAttribute('namespace-fallback'), mobileBreakpoint: this.mobileBreakpoint }) // eslint-disable-line
      this.html = /* html */`
        <a-logo namespace="logo-default-" href="https://weedshaker.github.io/event-driven-web-components-yjs/tests/exampleTwo.html"></a-logo>
      `
    })
  }

  get logo () {
    return this.root.querySelector('a-logo')
  }

  get style () {
    return this._style || (this._style = document.head.querySelector('[page-style]')) || (this._style = (() => {
      const style = document.createElement('style')
      style.setAttribute('page-style', 'true')
      style.setAttribute('protected', 'true')
      return style
    })())
  }
}
