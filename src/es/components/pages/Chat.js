// @ts-check
import Index from './Index.js'

/* global Environment */
/* global self */

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

    this.removeAttribute('noise')
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
        <c-event-driven-yjs indexeddb no-blur>
          <c-keys>
            <c-notifications sw-url="./ServiceWorker.js">
              <c-providers>
                <c-users>
                  <c-rooms>
                    <c-chat>
                      <section>
                        <o-header height-auto logo-width="2em" close toggle-once style="--header-align-items: center;">
                          <header>
                            <chat-a-room-name></chat-a-room-name>
                            <div>
                              <chat-m-notifications></chat-m-notifications>
                              <wct-icon-mdx title=reload onclick="(function(){location.reload()})()" icon-url="../../../../../../img/icons/reload.svg" size="2em"></wct-icon-mdx>
                              <chat-m-providers></chat-m-providers>
                              <div>
                                <chat-m-users></chat-m-users>
                                <chat-m-rooms></chat-m-rooms>
                                <chat-m-jitsi-dialog
                                  namespace="dialog-top-slide-in-"
                                  show-event-name="jitsi-dialog-show-event"
                                ></chat-m-jitsi-dialog>
                                <chat-m-keys-dialog
                                  namespace="dialog-top-slide-in-"
                                  show-event-name="keys-dialog-show-event"
                                ></chat-m-keys-dialog>
                              </div>
                              <a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-invert-" invert favicon no-animation></a-logo></a>
                            </div>
                          </header>
                        </o-header>
                        <o-body scroll-icon scroll-icon-only-show-on-event>
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
                          </footer>
                        </o-footer>
                      </section>
                    </c-chat>
                  </c-rooms>
                </c-users>
              </c-providers>
            </c-notifications>
          </c-keys>
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
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js?${Environment?.version || ''}`,
        name: 'c-event-driven-yjs'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Keys.js?${Environment?.version || ''}`,
        name: 'c-keys'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Notifications.js?${Environment?.version || ''}`,
        name: 'c-notifications'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Providers.js?${Environment?.version || ''}`,
        name: 'c-providers'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Rooms.js?${Environment?.version || ''}`,
        name: 'c-rooms'
      },
      {
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
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/dialogs/JitsiDialog.js?${Environment?.version || ''}`,
        name: 'chat-m-jitsi-dialog'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/molecules/dialogs/KeysDialog.js?${Environment?.version || ''}`,
        name: 'chat-m-keys-dialog'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../event-driven-web-components-yjs/src/es/controllers/Users.js?${Environment?.version || ''}`,
        name: 'c-users'
      },
      {
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
        // @ts-ignore
        path: `${this.importMetaUrl}../../chat/es/components/controllers/Chat.js?${Environment?.version || ''}`,
        name: 'c-chat'
      },
      {
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
        path: `${this.importMetaUrl}../../chat/es/components/atoms/roomName/RoomName.js?${Environment?.version || ''}`,
        name: 'chat-a-room-name'
      },
      {
        // @ts-ignore
        path: `${this.importMetaUrl}../../web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js?${Environment?.version || ''}`,
        name: 'wct-icon-mdx'
      }
    ])
  }
}
