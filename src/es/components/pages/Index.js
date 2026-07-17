// @ts-check
import { Mutation } from '../../event-driven-web-components-prototypes/src/Mutation.js'

/* global Environment */
/* global self */

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
      tabindex: 'no-tabindex-style',
      mutationObserverInit: { attributes: true, attributeFilter: ['open'] },
      ...options
    }, ...args)

    // @ts-ignore
    this.providerQuery = self.Environment.providerQuery || `websocket-url=wss%3A%2F%2Fheroku.peerweb.site%2F%3Fkeep-alive%3D${self.Environment?.keepAlive || 86400000}%2Cwss%3A%2F%2Fwebsocket.peerweb.site%2F%3Fkeep-alive%3D${self.Environment?.keepAlive || 86400000}%2Cwss%3A%2F%2Fwebsocket-two.peerweb.site%2F%3Fkeep-alive%3D${self.Environment?.keepAlive || 86400000}&webrtc-url=wss%3A%2F%2Fwebrtc-two.peerweb.site${(location.pathname.includes('/ipfs/') || location.pathname.includes('.ipfs.')) ? '%2Cwss%3A%2F%2Fwebrtc-trystero.ninja' : ''}` // TODO: webrtc-trystero.ninja is still kinda experimental (evtl. buggy or outdated) but makes sense to be used within origin ipfs
    this.setAttribute('font-family-tokyo', '')
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
      this.removeAttribute('noise')
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
      :host([font-family-tokyo]) {
        --font-family-secondary: var(--font-family-tertiary);
        --h-font-family: var(--font-family-tertiary);
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
            <a href="?page=/chat&${this.providerQuery}" route target="_self"><span>chat 👉</span> <a-icon-chat hover-selector="a"></a-icon-chat></a>
            <a-logo namespace="logo-default-"></a-logo>
          </header>
        </o-header>
        <o-body>
          <style protected>
            :host .deleted {
              --a-text-decoration: line-through;
            }
            :host .sub {
              --ul-margin: 0;
            }
            :host .buyMeACoffee {
              display: flex;
              flex-direction: column;
              gap: 0.25em;
            }
            :host .buyMeACoffeeImg {
              border: 1px solid white;
              border-radius: 10px;
              position: sticky;
              bottom: 0;
            }
            :host .buyMeACoffeePic {
              --border-radius: 10px;
              --border-radius-mobile: 10px;
              --img-max-width: min(25dvw, 235px);
              --img-max-width-mobile: 75dvw;
            }
          </style>
          <main>
            <div class=pattern>
              <div class=content>
                <!-- https://funtranslations.com/yoda -->
                <h1>Oh, welcome!</h1>
                <h3>ああ、まいどまいど。</h3>
                <hr class=plain>
                <h2>Dear Ninja,</h2>
                <p>Very pleased that you found the way to my dojo, I am!<br>
                In these challenging times of censorship, surveillance, and big data. New skills and weaponry required there are.</p>
                <wct-grid namespace="grid-2colums2rows-" first-container-vertical="" first-column-with="50%" style="text-align:center">
                  <section>
                    <div> 
                      <a href="?page=/chat&${this.providerQuery}" route target="_self">
                        <wct-button namespace="button-primary-">Start Chat</wct-button>
                      </a>
                    </div>
                    <div>
                      <wct-button namespace="button-secondary-" href="/?page=/chat&room=chat-Questions-And-Feedback&${this.providerQuery}&magnet=magnet%253A%253Fxt%253Durn%253Abtih%253A7aa2fb8ddcf8b9c511b2a02da0c57dcfed709b2f%2526dn%253Dchat-Questions-And-Feedback.yjs%2526tr%253Dwss%25253A%25252F%25252Ftracker.peerweb.site%2526tr%253Dwss%25253A%25252F%25252Ftracker.openwebtorrent.com%25253A443%25252Fannounce%2526tr%253Dwss%25253A%25252F%25252Ftracker.webtorrent.dev&cid=QmNPpC58Lib36F6r7AdfQcs1CuB31X3cQxpy79evhVXGDS">Chat With Us</wct-button>
                    </div>
                  </section>
                </wct-grid>
                <hr class=plain>
                <p><a href="http://dcn-web.hostlocal.app/ipfs/QmXTh5mSuQgbs11myTvuP2EZrS2FwCvLfZDUxW1Y1deUiJ" target=_blank>DCN hosted at alternative ipfs origin</a></p>
                <h4>Empower your conversations, empower your privacy.</h4>
                <hr>
                <h2>SUPPORT DEVELOPMENT</h2>
                <p>Handcrafted, free and open source software. Help the development of future features as well as supporting the hosting of some decentralized providers.</p>
                <a class=buyMeACoffee href="https://www.buymeacoffee.com/weedshaker" target=_blank>
                  <wct-picture class=buyMeACoffeePic defaultSource="${this.importMetaUrl}../../../../src/img/buy-me-a-coffee-qr-code.png" alt="How to use DCN"></wct-picture>
                  <img class=buyMeACoffeeImg src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=weedshaker&button_colour=5F7FFF&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" alt="buy me a coffee" />
                </a>
                <hr>
                <h2>INFORMATION</h2>
                <p>DCN is a WEB3.0 Chat to communicate anonymously through decentralized networks. Using CRDTs (offline-first PWA), Websocket, WebRTC, WebTorrent, IPFS and all fully end-to-end encrypted.</p>
                <ul>
                  <li><a href="?page=/how" route target="_self">how to use?</a></li>
                  <li><a href="?page=/decentralization" route target="_self">decentralization</a></li>
                  <li><a href="?page=/encryption" route target="_self">end-to-end encryption</a></li>
                  <li><a href="?page=/privacy" route target="_self">privacy</a></li>
                  <li><a href="https://github.com/decentral-ninja/website" target=_blank>developers</a></li>
                </ul>
                <hr class=plain>
                <p>Use DCN <a href="?page=/chat&${this.providerQuery}" route target="_self"><a-icon-chat></a-icon-chat> to chat</a> anonymously, end-to-end encrypted and without any tracking nor data collection. Open source to ensure your safety during your journey thorough the internet, <a href="https://github.com/decentral-ninja" target="_blank">all code is</a>.</p>
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
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/picture/Picture.js?${Environment?.version || ''}`,
        name: 'wct-picture'
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
