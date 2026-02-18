// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/* global Environment */

/**
* @export
* @class IconCombinations
* @type {CustomElementConstructor}
*/
export default class IconCombinations extends Shadow() {
  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, tabindex: 'no-tabindex', ...options }, ...args)
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
        width: fit-content;
      }
      :host > section > *, :host > section > wct-icon-mdx {
        grid-column: 1;
        grid-row: 1;
        display: block;
      }
      :host > section > wct-icon-mdx {
        align-self: center;
        justify-self: center;
      }
      :host([keys]) > section > wct-icon-mdx {
        opacity: 0.6;
      }
      :host([icons-count="2"][keys]) > section > wct-icon-mdx:first-of-type {
        transform: rotate(20deg);
      }
      :host([icons-count="2"][keys]) > section > wct-icon-mdx:last-of-type {
        transform: rotate(-20deg) translate(12%, 11%);
      }
      :host([add-key]) > section > wct-icon-mdx:first-of-type {
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 297 297'%3E%3Cpath d='M294.061 101.395a9.869 9.869 0 00-6.976-2.887l-88.617.012.013-88.655a9.868 9.868 0 00-2.888-6.977A9.868 9.868 0 00188.616 0l-80.188.012c-5.445.002-9.859 4.415-9.86 9.86l-.016 88.662-88.626.014c-5.446 0-9.86 4.415-9.861 9.86L.051 188.63a9.863 9.863 0 009.865 9.865l88.621-.012-.014 88.653a9.86 9.86 0 009.866 9.865l80.187-.016c5.445 0 9.859-4.415 9.86-9.86l.014-88.658 88.629-.016c5.445 0 9.859-4.415 9.86-9.86l.012-80.22a9.876 9.876 0 00-2.89-6.976z'/%3E%3C/svg%3E") 98% 82% / 50% no-repeat exclude, linear-gradient(#000 0 0)
      }
      :host([add-key]) > section > wct-icon-mdx:last-of-type {
        align-self: end;
        justify-self: end;
      }
      /* COULD-DO: https://prismic.io/blog/css-animation-examples */
      :host > section > a-loading {
        display: none;
      }
      :host([no-pointer-events-updating][updating]) > section > * {
        pointer-events: none;
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
      <section part=section>
        <a-loading namespace="loading-default-" size="1.5"></a-loading>
      </section>
    `
    const templateContent = this.template?.content
    if (templateContent) {
      this.section.prepend(templateContent)
      this.template.remove()
    }
    children.forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE' || node.nodeName === 'TEMPLATE') return false
      node.setAttribute('hover-on-parent-shadow-root-host', '')
      this.section.prepend(node)
    })
    this.setAttribute('icons-count', Array.from(this.section.children).reduce((acc, child) => child.tagName !== 'A-LOADING' ? acc + 1 : acc, 0))
    return this.fetchModules([
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../loading/Loading.js?${Environment?.version || ''}`,
        name: 'a-loading'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js?${Environment?.version || ''}`,
        name: 'wct-icon-mdx'
      }
    ])
  }

  get section () {
    return this.root.querySelector('section')
  }

  get template () {
    return this.root.querySelector('template')
  }
}
