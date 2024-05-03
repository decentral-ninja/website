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
    this.html = /* html */`
        <c-event-driven-yjs websocket-url="wss://the-decentral-web.herokuapp.com?keep-alive=${self.
          // @ts-ignore
          Environment.keepAlive || 86400000
          }" indexeddb no-blur sw-url="${this.importMetaUrl}../../../../ServiceWorker.js">
          <c-notifications sw-url="./ServiceWorker.js">
            <c-providers>
              <c-users>
                <c-chat>
                  <section>
                    <o-header height-auto logo-width="2em" close toggle-once style="--header-align-items: center;">
                      <header>
                        <chat-a-room-name></chat-a-room-name>
                        <div>
                          <chat-m-notifications></chat-m-notifications>
                          <a-icon-mdx onclick="(function(){location.reload()})()" icon-url="../../../../../../img/icons/reload.svg" size="2em"></a-icon-mdx>
                          <div>
                            <chat-m-navigation></chat-m-navigation>
                            <chat-m-providers></chat-m-providers>
                            <chat-m-rooms></chat-m-rooms>
                          </div>
                          <a href="?page=/" route target="_self"><a-logo namespace="logo-invert-" invert favicon no-animation></a-logo></a>
                        </div>
                      </header>
                    </o-header>
                    <o-body>
                      <main>
                        <div class=pattern>
                          <div class=content>
                            <m-chat></m-chat>
                          </div>
                        </div>
                      </main>
                    </o-body>
                    <o-footer>
                      <footer>
                        <chat-a-input style="order: -1;"></chat-a-input>
                        <chat-m-users></chat-m-users>
                      </footer>
                    </o-footer>
                  </section>
                </c-chat>
              </c-users>
            </c-providers>
          </c-notifications>
        </c-event-driven-yjs>
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
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js?${Environment?.version || ''}`,
        name: 'c-event-driven-yjs'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Notifications.js?${Environment?.version || ''}`,
        name: 'c-notifications'
      },
      {
        // TODO: see todos at controllers/Providers.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Providers.js?${Environment?.version || ''}`,
        name: 'c-providers'
      },
      {
        // TODO: see todos at molecules/Providers.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Providers.js?${Environment?.version || ''}`,
        name: 'chat-m-providers'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Rooms.js?${Environment?.version || ''}`,
        name: 'chat-m-rooms'
      },
      {
        // TODO: see todos at controllers/Users.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js?${Environment?.version || ''}`,
        name: 'c-users'
      },
      {
        // TODO: see todos at molecules/Users.js Class
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Users.js?${Environment?.version || ''}`,
        name: 'chat-m-users'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Notifications.js?${Environment?.version || ''}`,
        name: 'chat-m-notifications'
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
        name: 'chat-a-input'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/Navigation.js?${Environment?.version || ''}`,
        name: 'chat-m-navigation'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/atoms/roomName/RoomName.js?${Environment?.version || ''}`,
        name: 'chat-a-room-name'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/organisms/grid/Grid.js?${Environment?.version || ''}`,
        name: 'wct-grid'
      },
      {
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js`,
        name: 'a-icon-mdx'
      }
    ])
  }
}
