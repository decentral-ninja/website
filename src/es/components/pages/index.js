// @ts-check
import { Mutation } from '../../event-driven-web-components-prototypes/src/Mutation.js'

/**
* Decentral Ninja Main/Start Page
*
* @export
* @class Index
* @type {CustomElementConstructor}
*/
export default class Index extends Mutation() {
  constructor (options = {}, ...args) {
    super({
      importMetaUrl: import.meta.url,
      mutationObserverInit: { attributes: true, attributeFilter: ['open'] },
      ...options
    }, ...args)

    this.transitionDuration = this.getAttribute('transition-duration') || 400
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => {
      this.mutationObserver.observe(this.header, this.mutationObserverInit)
      this.hidden = false
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
  }

  mutationCallback (mutationList, observer) {
    if (mutationList[0] && mutationList[0].type === 'attributes') this.classList[this.header.hasAttribute('open')
      ? 'add'
      : 'remove'
    ]('header-open')
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
    // @ts-ignore
    return !this.section
  }

  /**
  * renders the css
  *
  * @return {Promise<void>}
  */
  renderCSS () {
    this.css = /* css */ `
      :host > section {
        display: grid;
        grid-template-areas: "header"
                             "body"
                             "footer";
        grid-template-columns: 100%;
        grid-template-rows: minmax(var(--header-min-height , 0.5em), auto) 1fr minmax(var(--footer-min-height, 0.5em), auto);
        min-height: var(--min-height, 100dvh);
        max-height: 100vh;
      }
      :host > section > o-body {
        transition: var(--transition, opacity ${this.transitionDuration}ms ease-out);
        will-change: opacity;
      }
      /* :host > section:has(o-header[open]) > o-body {  did was ignored by the render cycle on iphone, workaround with mutation observer */
      :host(.header-open) > section > o-body {
        opacity: 0;
        pointer-events: none;
      }
      @media only screen and (max-width: _max-width_) {
        :host > section {
          grid-template-rows: minmax(var(--header-height-mobile, var(--header-height, 0.5em)), auto) 1fr minmax(var(--footer-min-height-mobile, var(--footer-min-height, 0.5em)), auto);
        }
      }
    `
    return this.renderGlobalCSS()
  }

  /**
  * renders the css
  *
  * @return {Promise<void>}
  */
  renderGlobalCSS () {
    // set global styles in the light dom
    this.style.textContent = ''
    this.setCss(/* css */`
      :root {
        background-color: var(--root-background-color, var(--background-color, transparent));
        color: var(--color, white);
        font-family: var(--font-family, sans-serif);
        font-size: var(--font-size, 10px);
        font-weight: var(--font-weight, normal);
        letter-spacing: var(--letter-spacing, normal);
        line-height: var(--line-height, normal);
        word-break: var(--word-break, normal);
      }
      body {
        margin: 0;
        min-height: var(--body-min-height, var(--min-height, 100dvh));
        overflow: hidden;
        padding: 0;
      }
      @media only screen and (max-width: _max-width_) {
        :root {
          font-size: var(--font-size-mobile, var(--font-size, 10px));
          font-weight: var(--font-weight-mobile, var(--font-weight, normal));
          line-height: var(--line-height-mobile, var(--line-height, normal));
          word-break: var(--word-break-mobile, var(--word-break, normal));
        }
      }
    `, undefined, false, false, this.style, false)
    document.head.appendChild(this.style)
    return Promise.resolve()
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../organisms/header/Header.js`,
        name: 'o-header'
      },
      {
        path: `${this.importMetaUrl}../organisms/body/Body.js`,
        name: 'o-body'
      },
      {
        path: `${this.importMetaUrl}../organisms/footer/Footer.js`,
        name: 'o-footer'
      }
    ]).then((children) => {
      // Header is expected to be initially open, below <o-header open></o-header>
      this.classList.add('header-open')
      this.html = /* html */`
        <section>
          <o-header open></o-header>
          <o-body>
            <a href="https://weedshaker.github.io/event-driven-web-components-yjs/tests/exampleTwo.html" target="_self">
              <h1>under construction... click to chat 👈</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sequi non dolor id illum expedita officia, corporis impedit recusandae enim ea veniam rem iure. Quia, veritatis. Reiciendis fugiat temporibus recusandae.</p>
            </a>
          </o-body>
          <o-footer><a href="https://github.com/decentral-ninja" target="_blank">© decentral.ninja / alpha 0.6</a></o-footer>
        </section>
      `
    })
  }

  get section () {
    return this.root.querySelector('section')
  }

  get header () {
    return this.root.querySelector('o-header')
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
