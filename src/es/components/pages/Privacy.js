// @ts-check
import Index from './Index.js'

/* global Environment */

/**
* Decentral Ninja Privacy Page
*
* @export
* @class Privacy
* @type {CustomElementConstructor}
*/
export default class Privacy extends Index {
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
          <main>
            <div class=pattern>
              <div class=content>
                <h1>Privacy</h1>
                <p><a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a></p>
                <h3>プライバシー</h3>
                <hr>
                <h3>DCN is 100% committed to protect your privacy and for that is 100% <a href="https://en.wikipedia.org/wiki/Free_and_open-source_software" target=_blank>FOSS</a></h3>
                <hr>
                <h4>Here some thoughts regarding privacy...</h4>
                <iframe title="Think Privacy Is Dead? You're Wrong." width="560" height="315" style="aspect-ratio: 560 / 315; width: auto; height: auto; border-radius: var(--border-radius);" src="https://neat.tube/videos/embed/sSx1yyXESXhvZh1E3VTwtG" style="border: 0px;" allow="fullscreen" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
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
}
