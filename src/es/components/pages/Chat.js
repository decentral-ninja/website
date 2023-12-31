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
        // TODO: see todos at molecules/Providers.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Providers.js?${Environment?.version || ''}`,
        name: 'm-providers'
      },
      {
        // TODO: see todos at controllers/Rooms.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Rooms.js?${Environment?.version || ''}`,
        name: 'c-rooms'
      },
      {
        // TODO: see todos at molecules/Rooms.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Rooms.js?${Environment?.version || ''}`,
        name: 'm-rooms'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js?${Environment?.version || ''}`,
        name: 'c-users'
      },
      {
        // TODO: see todos at molecules/Users.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Users.js?${Environment?.version || ''}`,
        name: 'm-users'
      },
      {
        // TODO: see todos at molecules/Notifications.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Notifications.js?${Environment?.version || ''}`,
        name: 'm-notifications'
      },
      {
        // TODO: see todos at controllers/Chat.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/controllers/Chat.js?${Environment?.version || ''}`,
        name: 'c-chat'
      },
      {
        // TODO: see todos at molecules/Chat.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Chat.js?${Environment?.version || ''}`,
        name: 'm-chat'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/atoms/Input.js?${Environment?.version || ''}`,
        name: 'a-input'
      },
      {
        // TODO: see todos at molecules/Chat.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/organisms/Header.js?${Environment?.version || ''}`,
        name: 'chat-o-header'
      }
    ]).then((children) => {
      this.html = /* html */`
        <c-event-driven-yjs websocket-url="wss://the-decentral-web.herokuapp.com?keep-alive=86400000" indexeddb no-blur sw-url="${this.importMetaUrl}../../../../MasterServiceWorker.js">
          <c-providers>
            <c-rooms>
              <c-users>
                <c-chat>
                  <section>
                    <o-header toggle-once>
                      <chat-o-header style="height: fit-content;">share this room:</chat-o-header>
                      <a href="?page=/" route target="_self"><a-logo namespace="logo-invert-" invert favicon="true"></a-logo></a>
                    </o-header>
                    <o-body>
                      <m-chat></m-chat>
                    </o-body>
                    <o-footer>
                      <a-input style="order: -1; width: 100%;"></a-input>
                      <div>
                        <m-providers></m-providers>
                        <m-rooms></m-rooms>
                        <m-users></m-users>
                        <m-notifications></m-notifications>
                      </div>
                    </o-footer>
                  </section>
                </c-chat>
              </c-users>
            </c-rooms>
          </c-providers>
        </c-event-driven-yjs>
      `
    })
  }
}
