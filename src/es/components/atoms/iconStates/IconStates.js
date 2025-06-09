// @ts-check
import { Shadow } from '../../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
* @export
* @class IconStates
* @type {CustomElementConstructor}
*/
export default class IconStates extends Shadow() {
  static get observedAttributes () {
    return ['state']
  }

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

  attributeChangedCallback (name, oldValue, newValue) {
    this.customStyle.innerText = /* css */`
      :host > section > wct-icon-mdx[state=${this.getAttribute('state') || 'default'}] {
        display: contents;
      }
    `
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
    return !this.section
  }

  /**
   * renders the css
   * @returns Promise<void>
   */
  renderCSS () {
    this.attributeChangedCallback()
    this.css = /* css */`
      :host {
        display: contents;
      }
      :host > section {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        align-content: center;
        justify-content: center;
      }
      :host > section > *, :host > section > wct-icon-mdx::part(svg) {
        grid-column: 1;
        grid-row: 1;
      }
      :host > section > wct-icon-mdx::part(svg) {
        align-self: center;
        justify-self: center;
      }
      :host > section > wct-icon-mdx {
        display: none;
      }
      :host > section > a-loading {
        display: none;
      }
      :host([updating]) > section > a-loading {
        display: flex;
      }
      :host([updating]) > section > wct-icon-mdx {
        color: var(--color-disabled) !important;
        --color: var(--color-disabled);
        --color-active: var(--color-disabled);
        --color-black: var(--color-disabled);
        --color-custom-loader: var(--color-disabled);
        --color-error: var(--color-disabled);
        --color-gray-lighter: var(--color-disabled);
        --color-gray: var(--color-disabled);
        --color-green-full: var(--color-disabled);
        --color-green-rgba-50: var(--color-disabled);
        --color-green-rgba-75: var(--color-disabled);
        --color-green: var(--color-disabled);
        --color-hover: var(--color-disabled);
        --color-jitsi: var(--color-disabled);
        --color-provider: var(--color-disabled);
        --color-rgba-50: var(--color-disabled);
        --color-secondary-rgba-50: var(--color-disabled);
        --color-secondary: var(--color-disabled);
        --color-user-self: var(--color-disabled);
        --color-user: var(--color-disabled);
        --color-wormhole: var(--color-disabled);
        --color-yellow: var(--color-disabled);
      }
    `
    return Promise.resolve()
  }

  /**
   * Render HTML
   * @returns Promise<void>
   */
  renderHTML () {
    const children = Array.from(this.root.children)
    this.html = /* html */`
      <section>
        <a-loading namespace="loading-default-" size="1.5"></a-loading>
      </section>
    `
    children.forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.section.appendChild(node)
    })
    this.html = this.customStyle
    return this.fetchModules([
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../loading/Loading.js?${Environment?.version || ''}`,
        name: 'a-loading'
      }
    ])
  }

  get section () {
    return this.root.querySelector('section')
  }

  get customStyle () {
    return (
      this._customStyle ||
        (this._customStyle = (() => {
          const style = document.createElement('style')
          style.setAttribute('protected', 'true')
          return style
        })())
    )
  }
}
