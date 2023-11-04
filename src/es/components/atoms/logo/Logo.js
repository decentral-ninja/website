// @ts-check
import { Shadow } from '../../../event-driven-web-components-prototypes/src/Shadow.js'
import { WebWorker } from '../../../event-driven-web-components-prototypes/src/WebWorker.js'

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
export default class Logo extends Shadow(WebWorker()) {
  static get observedAttributes () {
    return ['favicon']
  }

  constructor (options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, ...options }, ...args)

    this.setAttribute('aria-label', 'show navigation menu')
    this.setAttribute('aria-expanded', 'true')
    this.transitionDuration = this.getAttribute('transition-duration') || 400
    this.clickEventListener = event => {
      if (this.getAttribute('href')) {
        self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
      } else {
        this.dispatchEvent(new CustomEvent(this.getAttribute('click-event-name') || this.tagName.toLowerCase() + '-click', {
          detail: {
            open: () => this.setAttribute('favicon', 'true'),
            close: () => this.removeAttribute('favicon')
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }
    this.animationiterationListener = (event, dispatch = true) => {
      // workaround for nice css transition between the two logos
      if (this.hasAttribute('favicon')) {
        // TODO: smoothen the transition ether reverse animation to initial position or change opacity before removing the animation attribute
        this.removeAttribute('animation')
      } else {
        this.setAttribute('animation', 'true')
      }
      if (dispatch) this.dispatchEvent(new CustomEvent(this.getAttribute('animationiteration-event-name') || this.tagName.toLowerCase() + '-animationiteration', {
        detail: {
          open: () => this.setAttribute('favicon', 'true'),
          close: () => this.removeAttribute('favicon'),
          origEvent: event
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.animationiterationListener(null, false)
  }

  connectedCallback () {
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => {
      this.addEventListener('click', this.clickEventListener)
      this.svgs.forEach(svg => svg.addEventListener('animationiteration', this.animationiterationListener))
    })
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickEventListener)
    this.svgs.forEach(svg => svg.removeEventListener('animationiteration', this.animationiterationListener))
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this.animationiterationListener(null, false)
    this.setAttribute('aria-expanded', this.hasAttribute('favicon') ? 'false' : 'true')
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
        --show: none;
        color: var(--color);
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
        tap-highlight-color: transparent;
        -webkit-tap-highlight-color: transparent;
      }
      :host > svg {
        filter: grayscale(1);
        grid-column: 1;
        grid-row: 1;
        height: var(--svg-height, var(--svg-size, auto));
        opacity: 0;
        transition: var(--transition, opacity ${this.transitionDuration}ms ease-out, filter 5000ms ease-in);
        width: var(--svg-width, var(--svg-size, min(100dvw, 100dvh, 100%)));
        will-change: opacity, filter;
      }
      :host([loaded]) > svg {
        filter: grayscale(0);
      }
      :host([favicon][auto-width]) > svg {
        will-change: width;
        transition: var(--transition, width ${this.transitionDuration}ms ease-out);
        width: var(--favicon-svg-width, var(--favicon-svg-size, var(--svg-width, var(--svg-size, 3em))));
      }
      :host([loaded]) > svg.first {
        opacity: 1;
      }
      :host > svg:not(.first) {
        opacity: 0;
      }
      :host([favicon]) > svg.first {
        opacity: 0;
      }
      :host([favicon][loaded]) > svg:not(.first) {
        opacity: 1;
      }
      :host(:not([favicon])) > svg g[inkscape-label=star] {
        opacity: 0.8;
      }
      :host([animation]) > svg g[inkscape-label=star] {
        transform-origin: center;
        animation: rotate 300s linear infinite;
        will-change: transform;
      }
      :host([animation]) > svg g[inkscape-label=ninjaStar] {
        transform-origin: center;
        animation: rotate 1800s linear infinite reverse;
        will-change: transform;
      }
      :host([animation]) > svg g[inkscape-label=starInner] {
        transform-origin: center;
        animation: rotate 30s linear infinite reverse;
        will-change: transform;
      }
      :host([animation]) > svg g[inkscape-label=starInner] path {
        transform-origin: center;
        animation: scaleAndStroke 10050ms ease-in-out infinite;
        will-change: transform, stroke-width;
      }
      :host([animation]) > svg g[inkscape-label=ajna] {
        transform-origin: center;
        animation: rotate 30s linear infinite reverse;
        will-change: transform;
      }
      :host([animation]) > svg g[inkscape-label=ajnaGlow] {
        animation: opacity 30s ease-in-out infinite;
        will-change: opacity;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes scaleAndStroke {
        0% {
          transform: scale(0);
          stroke-width: 0.1;
        }
        50% {
          transform: scale(1.2);
          stroke-width: 0.02;
        }
        100% {
          transform: scale(0);
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
      /* two elements which could not be removed in inkscape */
      :host > svg g[inkscape-label=bg] > * {
        display: none;
      }
      :host > svg g[inkscape-label=ninjaStar] circle {
        display: none;
      }
      /* LOADER: https://www.cssportal.com/css-loader-generator/ */
      :host > div.custom-loader {
        width: var(--svg-width, var(--svg-size, min(100dvw, 100dvh, 100%)));
      }
      :host > div.custom-loader > div {
        margin: auto;
        width: 3.5em;
        height: 3.5em;
        border-radius: 50%;
        border: 0.5em solid #0000;
        border-right-color: var(--color-rgba-50);
        position: relative;
        animation: s4 1s infinite linear;
        opacity: 1 !important;
        transition: none;
      }
      :host > div.custom-loader > div:before,
      :host > div.custom-loader > div:after {
        content: "";
        position: absolute;
        inset:-0.5em;
        border-radius: 50%;
        border:inherit;
        animation:inherit;
        animation-duration: 2s;
      }
      :host > div.custom-loader > div:after {
        animation-duration: 4s;
      }
      @keyframes s4 {
        100% {transform: rotate(1turn)}
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
    this.html = '<div class="custom-loader"><div></div></div>' // placeholder for keeping the size
    return this.fetchHTML([
      `${this.getAttribute('base-url') || this.importMetaUrl}${this.getAttribute('url') || '../../../../img/logo.svg'}`,
      `${this.getAttribute('base-url') || this.importMetaUrl}${this.getAttribute('url') || '../../../../img/logoIcon.svg'}`
    ], false).then(async svgs => {
      const replaces = [
        // fix svg exported from inkscape
        {
          pattern: 'inkscape:label',
          flags: 'g',
          replacement: 'inkscape-label'
        },
        // make whitish caller accessible
        {
          pattern: '#fff8e0',
          flags: 'g',
          replacement: 'currentColor'
        },
        // make blueish caller accessible
        {
          pattern: '#000f33',
          flags: 'g',
          replacement: `var(--${this.getAttribute('namespace') || ''}background-color)`
        },
        // make red-ish caller accessible
        {
          pattern: '#ff0005',
          flags: 'g',
          replacement: `var(--${this.getAttribute('namespace') || ''}color-shadow)`
        },
        // make gold-ish caller accessible
        {
          pattern: '#fccf00',
          flags: 'g',
          replacement: `var(--${this.getAttribute('namespace') || ''}color-star)`
        },
        // make shadow caller accessible
        {
          pattern: '#000000',
          flags: 'g',
          replacement: 'currentColor'
        }
      ]
      this.html = ''
      this.html = await replaces.reduce(async (svg, replace) => this.webWorker(Logo.replace, await svg, replace.pattern, replace.flags, replace.replacement), svgs[0])
      this.svg.classList.add('first')
      this.html = await replaces.reduce(async (svg, replace) => this.webWorker(Logo.replace, await svg, replace.pattern, replace.flags, replace.replacement), svgs[1])
      this.setAttribute('loaded', 'true')
      this.dispatchEvent(new CustomEvent(this.getAttribute('load-event-name') || this.tagName.toLowerCase() + '-load', {
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    })
  }

  /**
   * casual string replace function which can be used as a webworker
   *
   * @param {string} text
   * @param {string} pattern
   * @param {string} flags
   * @param {string} replacement
   * @return {string}
   */
  static replace (text, pattern, flags, replacement) {
    return text.replace(new RegExp(pattern, flags), replacement)
  }

  get svg () {
    return this.root.querySelector('svg')
  }

  get svgs () {
    return this.root.querySelectorAll('svg')
  }
}
