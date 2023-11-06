// @ts-check
import Index from './Index.js'

/**
* Decentral Ninja Main/Start Page
*
* @export
* @class Chat
* @type {CustomElementConstructor}
*/
export default class Chat extends Index {
  constructor (options = {}, ...args) {
    super({
      importMetaUrl: import.meta.url,
      ...options
    }, ...args)
  }

  connectedCallback () {
    this.hidden = true
    document.documentElement.setAttribute('invert', 'true')
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
  }

  /**
  * renders the html
  *
  * @return {Promise<void>}
  */
  renderHTML () {
    return this.fetchModules([
      {
        path: `${this.importMetaUrl}../organisms/header/Header.js`,
        name: 'o-header'
      },
      {
        path: `${this.importMetaUrl}../atoms/logo/Logo.js`,
        name: 'a-logo'
      },
      {
        path: `${this.importMetaUrl}../organisms/body/Body.js`,
        name: 'o-body'
      },
      {
        path: `${this.importMetaUrl}../organisms/footer/Footer.js`,
        name: 'o-footer'
      },
      {
        path: `${this.importMetaUrl}../atoms/iconChat/IconChat.js`,
        name: 'a-icon-chat'
      }
    ]).then((children) => {
      this.html = /* html */`
        <section>
          <o-header toggle-once>
            <a href="https://weedshaker.github.io/event-driven-web-components-yjs/tests/exampleTwo.html" target="_self"><span>chat 👉</span> <a-icon-chat hover-selector="a"></a-icon-chat></a>
            <a-logo namespace="logo-invert-" invert></a-logo>
          </o-header>
          <o-body>
              <!-- https://funtranslations.com/yoda -->
              <h1>Oh, welcome!</h1>
              <h3>ああ、まいどまいど。</h3>
              <hr>
              <h2>Dear Ninja,</h2>
              <p>Very pleased that you found the way to my dojo, I am!<br>In these challenging times of censorship, surveillance and big data. New skills and weaponary required there are.</p>
              <hr>
              <h4>Our chat, our first set of weapon 武器 at hand is which uses:</h4>
              <ul>
                <li>Local first CRDT (conflict free replicated data sets)</li>
                <li>WebRTC</li>
                <li>Flux WebSocket (coming soon)</li>
                <li>IPFS (coming soon)</li>
                <li>WebTorrent (coming soon)</li>
                <li>end to end encryption (coming soon)</li>
              </ul>
              <p>As you see, very very busy building it all, we are. In the meantime, use our proof of concept, please: <a href="https://weedshaker.github.io/event-driven-web-components-yjs/tests/exampleTwo.html" target="_self"><a-icon-chat></a-icon-chat> chat</a> here anonymously and without any track record nor data collection. Open source to ensure your safety during your journey thorough the internet, <a href="https://github.com/decentral-ninja" target="_blank">all code is</a>.</p>
              <hr>
              <h4>To further train with new tools, there is... Web 3.0...</h4>
              <ul>
                <li>Presearch, a decentral search engine</li>
                <li>Crypto Currencies... anonymous ones, best are, like monero or the pirate chain.</li>
                <li>The Torproject</li>
                <li>and many many more there are...</li>
              </ul>
          </o-body>
          <o-footer></o-footer>
        </section>
      `
    })
  }
}
