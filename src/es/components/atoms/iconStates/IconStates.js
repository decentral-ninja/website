// @ts-check
import { Shadow } from '../../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
* @export
* @class IconStates
* @type {CustomElementConstructor}
*/
export default class IconStates extends Shadow() {
  static get observedAttributes () {
    return ['state', 'counter']
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
    if (name === 'counter') {
      this.counterEl.textContent = this.getAttribute('counter')
    } else if (name = 'state') {
      this.customStyle.innerText = /* css */`
        :host > section${this.stateElsStates.some(attribute => attribute.includes(`${this.getAttribute('state') || 'default'}-hover`)) ? ':not(:hover)' : '' } > wct-icon-mdx[state=${this.getAttribute('state') || 'default'}] {
          display: contents;
        }
        :host > section:hover > wct-icon-mdx[state=${this.getAttribute('state') || 'default'}-hover] {
          display: contents;
        }
        :host > section > wct-icon-mdx[state=${this.getAttribute('state') || 'default'}][no-counter] ~ p, :host > section:hover > wct-icon-mdx[state=${this.getAttribute('state') || 'default'}-hover][no-counter] ~ p {
          display: none;
        }
      `
    }
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
      ${
        this.stateElsStates.some(attribute => attribute.includes('hover'))
          ? /* css */`
            :host > section:hover {
              cursor: pointer;
            }
          `
          : ''
      }
      :host > section {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        align-content: center;
        justify-content: center;
        width: fit-content;
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
      :host  > section > p {
        color: var(--color-disabled);
        padding: 0;
        margin: 0;
        width: 100%;
        transition: color 0.3s ease-out;
      }
      :host  > section > p:has(> span:empty), :host(:not([show-counter-on-hover])) > section:hover > p {
        display: none;
      }
      :host  > section > p > span {
        background-color: var(--color-secondary);
        border-radius: 50%;
        color: white;
        cursor: pointer;
        font-size: 0.75em;
        height: fit-content;
        margin-right: 1.5em;
        max-width: 2em;
        opacity: 0.75;
        overflow: hidden;
        padding: 0.1em 0.5em;
        text-overflow: ellipsis;
        transform: translate(1.5em, 1.25em);
        transition: background-color 0.3s ease-out;
        white-space: nowrap;
        width: fit-content;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host > section:has(> .hover) > p > span, :host > section:hover > p > span {
        background-color: var(--color-yellow);
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
        <p><span></span></p>
      </section>
    `
    children.forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.section.prepend(node)
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

  get stateElsStates () {
    return Array.from(this.root.querySelectorAll('[state]')).map(el => el.getAttribute('state'))
  }

  get counterEl () {
    return this.root.querySelector('section > p > span')
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
