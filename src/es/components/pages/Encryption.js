// @ts-check
import Index from './Index.js'

/* global Environment */

/**
* Decentral Ninja Encryption Page
*
* @export
* @class Encryption
* @type {CustomElementConstructor}
*/
export default class Encryption extends Index {
  constructor (...args) {
    super(...args)

    this.removeAttribute('noise')
    this.transitionDuration = 0
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    // @ts-ignore
    this.html = /* html */`
      <section>
        <o-header height-auto logo-width="2em" close toggle-once style="--header-align-items: center;">
          <header>
            <a href="?page=/chat&${this.providerQuery}" route target="_self"><span>chat 👉</span> <a-icon-chat hover-selector="a"></a-icon-chat></a>
            <a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a>
          </header>
        </o-header>
        <o-body>
          <style protected>
            :host {
              --ul-list-style: decimal;
            }
            :host .sub {
              --ul-margin: 0;
              --ul-list-style: lower-alpha;
            }
          </style>
          <main>
            <div class=pattern>
              <div class=content>
                <h1>End-to-end encryption</h1>
                <p><a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a></p>
                <h3>エンドツーエンド暗号化</h3>
                <hr>
                <h3>async key pair</h3>
                <wct-picture defaultSource="${this.importMetaUrl}../../event-driven-web-components-prototypes/src/controllers/Crypto.drawio.svg" alt="browser architecture"></wct-picture>
                <hr class=plain>
                <h4>encryption flow:</h4>
                <ul>
                  <li>user foo and user bar make their synchronous key derived from their asynchronous key pairs</li>
                  <li>user foo sends a new key encrypted with their derived key to user bar</li>
                  <li>user foo and user bar now encrypt and decrypt text and files through that new key</li>
                </ul>
                <p>DCN encrypts text and files before they get saved or sent anywhere and decrypts when the browser renders texts or processes files at stream. This could be called edge-to-edge encryption... , see <a href="?page=/how" route target="_self">how to use? - select/generate a key for next message <wct-icon-mdx title="providers" icon-url="../../../../../../img/icons/key-square.svg" size="1em"></wct-icon-mdx></a> plus further infos at <a href="https://github.com/Weedshaker/event-driven-web-components-prototypes/blob/master/src/controllers/Crypto.js" target="_blank">github</a>.</p>
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
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js?${Environment?.version || ''}`,
        name: 'wct-icon-mdx'
      }
    ])
  }
}
