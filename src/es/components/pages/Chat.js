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
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js`,
        name: 'c-event-driven-yjs'
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Providers.js`,
        name: 'c-providers'
      },
      {
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js`,
        name: 'c-users'
      },
      {
        // TODO: Example artifact, properly garbage
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleOne/IndexeddbSynced.js`,
        name: 'yjs-indexeddb-synced'
      },
      {
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleOne/AwarenessChange.js`,
        name: 'yjs-awareness-change'
      },
      {
        // TODO: Example artifact, properly redo and move to chat sub-repo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/controllers/YjsChat.js`,
        name: 'c-yjs-chat'
      },
      {
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/DetailsAwarenessChange.js`,
        name: 'yjs-details-awareness-change'
      },
      {
        // TODO: Example artifact, properly redo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/Room.js`,
        name: 'yjs-room'
      },
      {
        // TODO: Example artifact, properly redo and move to chat sub-repo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/YjsChatUpdate.js`,
        name: 'yjs-chat-update'
      },
      {
        // TODO: Example artifact, properly redo
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/ShareApi.js`,
        name: 'yjs-share-api'
      },
      {
        // TODO NEXT: Example artifact, properly redo (replace input with textarea)
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/Input.js`,
        name: 'yjs-input'
      }
    ]).then((children) => {
      this.html = /* html */`
        <section>
          <o-header toggle-once>
            <a href="?page=/" route target="_self"><a-logo namespace="logo-invert-" invert></a-logo></a>
          </o-header>
          <o-body></o-body>
          <o-footer></o-footer>
        </section>
      `
      this.root.querySelector('o-body').setContent(/* html */`
        <c-event-driven-yjs websocket-url="wss://the-decentral-web.herokuapp.com?keep-alive=86400000" indexeddb no-blur>
          <c-providers>
            <c-users>
              <c-yjs-chat>
                <div class="flex">
                  <header>
                    <yjs-share-api>share this room:</yjs-share-api>
                    <hr>
                  </header>
                  <yjs-chat-update></yjs-chat-update>
                  <footer>
                    <yjs-input></yjs-input>
                    <details open>
                      <summary><code>v.0.0.0</code></summary>
                      <details>
                        <summary>IndexedDB Sync Status</summary>
                        <yjs-indexeddb-synced></yjs-indexeddb-synced>
                      </details>
                      <yjs-details-awareness-change></yjs-details-awareness-change>
                      <yjs-room></yjs-room>
                    </details>
                  </footer>
                </div>
              </c-yjs-chat>
            </c-users>
          </c-providers>
        </c-event-driven-yjs>
        <style>
          body {
            margin: 0;
          }
          .flex {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            max-height: min(100vh, 100dvh);
            max-width: 100vw;
            min-height: min(100vh, 100dvh);
            overflow: hidden;
            padding: 0.25em;
          }
          .flex > header {
            text-align: center;
          }
          .flex > footer > details {
            font-size: 0.7em;
            overflow-y: scroll;
            max-height: 50dvh;
          }
          .flex > yjs-chat-update {
            overflow-y: scroll;
          }
          .flex > footer {
            padding-top: 0.25em;
          }
        </style>
      `)
    })
  }
}
