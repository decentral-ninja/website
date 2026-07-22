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
                <p>the above schematic shows the workings of asynchronous key pairs and how both parties can derive the same synchronous key. Note: DCN does only use the derived synchronous key from asynchronous key pairs for exchanging classical synchronous keys. Using synchronous keys for message encryption has many upsides versus directly using a derived key but it requires one initial key exchange, as described below at the practical usage section.</p>
                <hr>
                <h3>practical usage:</h3>
                <ul>
                  <li>at the input filed user foo clicks the key icon below the smiley. See: <a href="?page=/how" route target="_self">how to use? - select/generate a key for next message <wct-icon-mdx title="providers" icon-url="../../../../../../img/icons/key-square.svg" size="1em"></wct-icon-mdx></a></li>
                  <li>user foo generates a new synchronous key or uses an already existing synchronous key and activates/sets it</li>
                  <li>the synchronous key is active at user foo's input filed</li>
                  <li>user foo sends a new message encrypted by the synchronous key</li>
                  <li>user bar can not read the encrypted message but instead sees a button, which prompts user bar, to request the synchronous key - user bar clicks it and with that action sends a key request for the synchronous key</li>
                  <li>user foo sees the key request. By clicking the button, which prompts user foo, to send the synchronous key to user bar - user foo clicks it and with that action DCN encrypts the synchronous key with user foo's private key and user bar's public key and sends the key</li>
                  <li>user bar decrypts the encrypted synchronous key with user bar's private key and user foo's public key. He is now in possession of the synchronous key user foo created and the messages now decrypts and is readable for user bar and anyone who possesses this synchronous key</li>
                  <li>this synchronous key is automatically active at user bar's input filed, if he did not already have an active key</li>
                </ul>
                <hr>
                <p>DCN encrypts text and files before they get saved or sent anywhere and decrypts when the browser renders texts or processes files at stream. This could be called edge-to-edge encryption... , further infos at <a href="https://github.com/Weedshaker/event-driven-web-components-prototypes/blob/master/src/controllers/Crypto.js" target="_blank">github</a>.</p>
                <hr class=plain>
                <p>Video under construction...</p>
                <a href="https://github.com/decentral-ninja/website" target=_blank>open an issue, if you would like to do a tutorial video.</a>
                <h2>check back later!</h2>
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
