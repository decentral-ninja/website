// @ts-check
import Index from './Index.js'

/* global Environment */

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
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js?${Environment?.version || ''}`,
        name: 'c-event-driven-yjs'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Providers.js?${Environment?.version || ''}`,
        name: 'c-providers'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js?${Environment?.version || ''}`,
        name: 'c-users'
      },
      {
        // TODO: yjs-awareness-change is inside yjs-details-awareness-change, this has nickname and room name functionality, which has to be split to one: user class and two: room class
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleOne/AwarenessChange.js?${Environment?.version || ''}`,
        name: 'yjs-awareness-change'
      },
      {
        // TODO: Example artifact, properly redo with https://github.com/feross/p2p-graph event-driven-web-components-yjs/readme.md
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/DetailsAwarenessChange.js?${Environment?.version || ''}`,
        name: 'yjs-details-awareness-change'
      },
      {
        // TODO: chat and chat update are typically view and model/controller in the chat repo, properly split to mvc
        // TODO: Example artifact, properly redo and move to chat sub-repo
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/controllers/YjsChat.js?${Environment?.version || ''}`,
        name: 'c-yjs-chat'
      },
      {
        // TODO: Example artifact, properly redo and move to chat sub-repo
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/YjsChatUpdate.js?${Environment?.version || ''}`,
        name: 'yjs-chat-update'
      },
      {
        // TODO: Example artifact, properly redo
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/Room.js?${Environment?.version || ''}`,
        name: 'yjs-room'
      },
      {
        // TODO: Example artifact, properly redo
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/tests/exampleTwo/ShareApi.js?${Environment?.version || ''}`,
        name: 'yjs-share-api'
      },
      {
        // TODO NEXT: Example artifact, properly redo
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/atoms/Input.js?${Environment?.version || ''}`,
        name: 'chat-input'
      }
    ]).then((children) => {
      this.html = /* html */`
        <c-event-driven-yjs websocket-url="wss://the-decentral-web.herokuapp.com/?keep-alive=86400000" indexeddb no-blur sw-url="${this.importMetaUrl}../../../../MasterServiceWorker.js">
          <c-providers>
            <c-users>
              <c-yjs-chat>
                <section>
                  <o-header toggle-once>
                    <yjs-share-api style="height: fit-content;">share this room:</yjs-share-api>
                    <a href="?page=/" route target="_self"><a-logo namespace="logo-invert-" invert favicon="true"></a-logo></a>
                  </o-header>
                  <o-body>
                    <yjs-chat-update></yjs-chat-update>
                  </o-body>
                  <o-footer>
                    <chat-input style="order: -1; width: 100%;"></chat-input>
                    <details open>
                      <summary><code>connection data</code></summary>
                      <yjs-details-awareness-change></yjs-details-awareness-change>
                      <yjs-room></yjs-room>
                    </details>
                  </o-footer>
                </section>
              </c-yjs-chat>
            </c-users>
          </c-providers>
        </c-event-driven-yjs>
      `
    })
  }
}
