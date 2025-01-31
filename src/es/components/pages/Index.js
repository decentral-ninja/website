// @ts-check
import { Mutation } from '../../event-driven-web-components-prototypes/src/Mutation.js'

/* global Environment */

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

    this.setAttribute('noise', '')
    this.transitionDuration = this.getAttribute('transition-duration') || 400
  }

  connectedCallback () {
    this.hidden = true
    document.documentElement.removeAttribute('invert')
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
    if (mutationList[0] && mutationList[0].type === 'attributes') {
      this.classList[this.header.hasAttribute('open')
        ? 'add'
        : 'remove'
      ]('header-open')
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
      :host([noise].header-open)::after {
        animation: noise .2s steps(1) infinite;
        background-repeat: repeat;
        background-size: 100px 100px;
        background: transparent url(_import-meta-url_../../../img/macaque-noise.webp) repeat 0 0;
        bottom: 0;
        content: '';
        left: 0;
        opacity: 1;
        overflow: hidden;
        pointer-events: none;
        position: fixed;
        right: 0;
        top: 0;
        transform-origin: 50% 50%;
        z-index: 9998;
      }
      :host {
        font-size: var(--font-size, 10px);
        font-weight: var(--font-weight, normal);
        line-height: var(--line-height, normal);
        width: 100%;
        word-break: var(--word-break, normal);
      }
      :host section {
        display: grid;
        grid-template-areas: "header"
                             "body"
                             "footer";
        grid-template-columns: 100%;
        grid-template-rows: minmax(var(--header-min-height , var(--spacing)), auto) 1fr minmax(var(--footer-min-height, var(--spacing)), auto);
        min-height: var(--min-height, 100svh);
        max-height: 100svh;
      }
      :host section > o-body {
        transition: var(--transition, opacity ${this.transitionDuration}ms ease-out);
      }
      /* :host section:has(o-header[open]) > o-body {  did was ignored by the render cycle on iphone, workaround with mutation observer */
      :host(.header-open) section > o-body {
        opacity: 0;
        pointer-events: none;
      }
      @media only screen and (max-width: _max-width_) {
        :host {
          font-size: var(--font-size-mobile, var(--font-size, 10px));
          font-weight: var(--font-weight-mobile, var(--font-weight, normal));
          line-height: var(--line-height-mobile, var(--line-height, normal));
          word-break: var(--word-break-mobile, var(--word-break, normal));
        }
        :host section {
          grid-template-rows: minmax(var(--header-height-mobile, var(--header-height, var(--spacing))), auto) 1fr minmax(var(--footer-min-height-mobile, var(--footer-min-height, var(--spacing))), auto);
        }
      }
      @keyframes noise {
        0% {
          transform:scale(1)
        }
        25% {
          transform:scaleX(-2)
        }
        50% {
          transform:scale(-1)
        }
        75% {
          transform:scaleY(-1)
        }
      }
    `
    return Promise.resolve()
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    // Header is expected to be initially open, below <o-header open></o-header>
    this.classList.add('header-open')
    this.html = /* html */`
      <section>
        <o-header open>
          <header>
            <a href="?page=/chat" route target="_self"><span>chat 👉</span> <a-icon-chat hover-selector="a"></a-icon-chat></a>
            <a-logo namespace="logo-default-"></a-logo>
          </header>
        </o-header>
        <o-body>
          <main>
            <div class=pattern>
              <div class=content>
                <!-- https://funtranslations.com/yoda -->
                <h1>Oh, welcome!</h1>
                <h3>ああ、まいどまいど。</h3>
                <hr>
                <h2>Dear Ninja,</h2>
                <p>Very pleased that you found the way to my dojo, I am!<br>
                In these challenging times of censorship, surveillance, and big data. New skills and weaponry required there are.</p>
                <hr>
                <h4>Empower your conversations, empower your privacy</h4>
                <p> Unleash your conversations with the speed and precision of a ninja, ensuring your messages remain as agile and elusive as you are.
                Join the revolution in communication with Decentral.Ninja - the cutting-edge decentralized chat platform that puts privacy and control back in your hands, ensuring your conversations stay truly confidential.
                </p>
                <wct-grid namespace="grid-2colums2rows-" first-container-vertical="" first-column-with="50%" style="text-align:center">
                  <section>
                    <div> 
                      <a href="?page=/chat" route target="_self">
                        <wct-button namespace="button-primary-">Start Chat</wct-button>
                      </a>
                    </div>
                    <div>       
                      <wct-button namespace="button-secondary-" href="/?page=/chat&room=chat-Questions-And-Feedback">Chat With Us</wct-button>
                    </div>
                  </section>
                </wct-grid>
                <hr>
                <h4>Our chat, our first set of weapon 武器 at hand which uses:</h4>
                <ul>
                  <li>Local first CRDT (conflict-free replicated data sets)</li>
                  <li>WebRTC</li>
                  <li>Flux WebSocket (coming soon)</li>
                  <li>IPFS (coming soon)</li>
                  <li>WebTorrent (coming soon)</li>
                  <li>end to end encryption (coming soon)</li>
                </ul>
                <p>As you see, we are very busy building it all. In the meantime, use our proof of concept, please: <a href="?page=/chat" route target="_self"><a-icon-chat></a-icon-chat> chat</a> here anonymously and without any track record nor data collection. Open source to ensure your safety during your journey thorough the internet, <a href="https://github.com/decentral-ninja" target="_blank">all code is</a>.</p>
                <hr>
                <h4>To further train with new tools, there is... Web 3.0...</h4>
                <ul>
                  <li>Presearch, a decentral search engine</li>
                  <li>Crypto Currencies... anonymous ones, best are, like Monero or the pirate chain.</li>
                  <li>The Torproject</li>
                  <li>and many many more there are...</li>
                </ul>
              </div>
            </div>
          </main>
        </o-body>
        <o-footer></o-footer>
      </section>
    `
    return this.fetchModules([
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/header/Header.js?${Environment?.version || ''}`,
        name: 'o-header'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../atoms/logo/Logo.js?${Environment?.version || ''}`,
        name: 'a-logo'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/body/Body.js?${Environment?.version || ''}`,
        name: 'o-body'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../organisms/footer/Footer.js?${Environment?.version || ''}`,
        name: 'o-footer'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../atoms/iconChat/IconChat.js?${Environment?.version || ''}`,
        name: 'a-icon-chat'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/organisms/grid/Grid.js?${Environment?.version || ''}`,
        name: 'wct-grid'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/button/Button.js?${Environment?.version || ''}`,
        name: 'wct-button'
      }
    ])
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
