// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'

/* global self */

/**
 * Logo of decentral ninja
 *
 * @export
 * @class Logo
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} src used for the image source
 *  {string} href used for the link reference
 * }
 */
export default class Logo extends Shadow() {
  static get observedAttributes () {
    return ['favicon']
  }

  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.transitionDuration = 3000
    this.clickEventListener = event => self.open(this.getAttribute('href'), '_self')
    this.animationiterationListener = event => {
      if (this.hasAttribute('favicon')) {
        this.removeAttribute('animation')
      } else {
        this.setAttribute('animation', 'true')
      }
    }
    this.animationiterationListener()
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => {
      if (this.getAttribute('href')) this.addEventListener('click', this.clickEventListener)
      this.svgs.forEach(svg => svg.addEventListener('animationiteration', this.animationiterationListener))
      this.hidden = false
    })
  }

  disconnectedCallback () {
    if (this.getAttribute('href')) this.removeEventListener('click', this.clickEventListener)
    this.svgs.forEach(svg => svg.removeEventListener('animationiteration', this.animationiterationListener))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.hasAttribute('favicon')) this.animationiterationListener()
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
    return !this.svg
  }

  /**
   * renders the css
   *
   * @return {Promise<void>}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        --show: show 3s ease-out;
        color: var(--color);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
      }
      :host > svg {
        grid-column: 1;
        grid-row: 1;
        height: var(--svg-height, var(--svg-size, auto));
        width: var(--svg-width, var(--svg-size, min(100dvw, 100dvh, 100%)));
        transition: var(--transition, opacity ${this.transitionDuration}ms ease-out);
      }
      :host > svg g[inkscape-label=bg] > * {
        display: none;
      }
      :host > svg g[inkscape-label=ninjaStar] circle {
        display: none;
      }
      :host > svg:first-of-type {
        opacity: 1;
      }
      :host > svg:last-of-type {
        /* TODO: Transition of opacity has been jumpy */
        opacity: 0;
        display: none;
      }
      :host([favicon]) > svg:first-of-type {
        opacity: 0;
      }
      :host([favicon]) > svg:last-of-type {
        opacity: 1;
        display: block;
      }
      :host(:not([favicon])) > svg g[inkscape-label=star] {
        opacity: 0.8;
      }
      :host([animation]) > svg g[inkscape-label=star] {
        transform-origin: center;
        animation: rotate 300s linear infinite;
      }
      :host([animation]) > svg g[inkscape-label=ninjaStar] {
        transform-origin: center;
        animation: rotate 1800s linear infinite reverse;
      }
      :host([animation]) > svg g[inkscape-label=starInner] {
        transform-origin: center;
        animation: rotate 30s linear infinite reverse;
      }
      :host([animation]) > svg g[inkscape-label=starInner] path {
        transform-origin: center;
        animation: scaleAndOpacity 10050ms ease-in-out infinite;
      }
      :host([animation]) > svg g[inkscape-label=ajna] {
        transform-origin: center;
        animation: rotate 30s linear infinite reverse;
      }
      :host([animation]) > svg g[inkscape-label=ajnaGlow] {
        animation: opacity 30s ease-in-out infinite;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes scaleAndOpacity {
        0% {
          transform: scale(0);
          opacity: 1;
          stroke-width: 0.1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
          stroke-width: 0.03;
        }
        100% {
          transform: scale(0);
          opacity: 1;
          stroke-width: 0.1;
        }
      }
      @keyframes opacity {
        0% {
          opacity: 0.9;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          opacity: 0.9;
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
      case 'logo-default-':
        return this.fetchCSS([{
          // @ts-ignore
          path: `${this.importMetaUrl}./default-/default-.css`,
          namespace: false
        }], false)
      case 'logo-invert-':
        return this.fetchCSS([{
          // @ts-ignore
          path: `${this.importMetaUrl}./invert-/invert-.css`,
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
    this.html = ''
    this.html = '<svg></svg>' // placeholder for keeping the size
    return this.fetchHTML([
      `${this.getAttribute('base-url') || this.importMetaUrl}${this.getAttribute('url') || '../../../../img/logo.svg'}`,
      `${this.getAttribute('base-url') || this.importMetaUrl}${this.getAttribute('url') || '../../../../img/logoIcon.svg'}`
    ], false).then(svgs => {
      svgs = svgs.map(svg => svg
        .replace(/inkscape:label/g, 'inkscape-label') // fix svg exported from inkscape
        .replace(/#fff8e0/g, 'currentColor') // make whitish caller accessible
        .replace(/#000f33/g, `var(--${this.getAttribute('namespace') || ''}background-color)`) // make blueish caller accessible
        .replace(/#ff0005/g, `var(--${this.getAttribute('namespace') || ''}color-shadow)`) // make red-ish caller accessible
        .replace(/#fccf00/g, `var(--${this.getAttribute('namespace') || ''}color-star)`) // make gold-ish caller accessible
        .replace(/#000000/g, 'currentColor')) // make shadow caller accessible
      this.html = ''
      this.html = svgs[0]
      this.html = svgs[1]
    })
  }

  get svg () {
    return this.root.querySelector('svg')
  }

  get svgs () {
    return this.root.querySelectorAll('svg')
  }
}
