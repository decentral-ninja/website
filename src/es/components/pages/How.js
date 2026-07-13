// @ts-check
import Index from './Index.js'

/* global Environment */

/**
* Decentral Ninja How Page
*
* @export
* @class How
* @type {CustomElementConstructor}
*/
export default class How extends Index {
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
            :host .avatar {
              height: 1.25em;
              width: 1.25em;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              box-shadow: 0px 0px 0.25em var(--color-white);
              margin-right: 0.25em;
              transform: translateY(0.1em);
              flex-shrink: 0;
            }
          </style>
          <main>
            <div class=pattern>
              <div class=content>
                <h1>How to use DCN</h1>
                <p><a href="?page=/" route target="_self"><a-logo title="return to home" namespace="logo-default-" favicon no-animation></a-logo></a></p>
                <h3>ディーシーエヌの使い方</h3>
                <hr>
                <h3>anonymous user session vs. identified user session</h3>
                <p>decentral ninja (DCN) does not use identified user sessions as other messaging apps do. DCN has no central single point of truth and for that can not verify anything but let's users show trust through sharing keys with each other. For each room, DCN let's your browser generate an anonymous user with an unique ID and an unique asynchronous key pair linked to your browser session and stored locally. This means, that you can freely choose a username per room and send, receive end-to-end encrypted synchronous keys. The keys, which can be used through multiple rooms, become your own-trust identification.</p>
                <hr>
                <h3>manual - controls</h3>
                <wct-picture defaultSource="${this.importMetaUrl}../../../../docs/how.png" alt="How to use DCN"></wct-picture>
                <hr class=plain>
                <ul>
                  <li>room list</li>
                  <ul class="sub">
                    <li>generate a new room <wct-icon-mdx title="generate" icon-url="../../../../../../img/icons/fold-down.svg" size="1em"></wct-icon-mdx></li>
                    <li>enter an existing room</li>
                    <li>turn notifications on/off <wct-icon-mdx title="notifications" icon-url="../../../../../../img/icons/bell.svg" size="1em"></wct-icon-mdx></li>
                    <li>share room <wct-icon-mdx title="share" icon-url="../../../../../../img/icons/share-3.svg" size="1em"></wct-icon-mdx></li>
                    <li>give the room your own secrete name <wct-icon-mdx title="edit" icon-url="../../../../../../img/icons/pencil.svg" size="1em"></wct-icon-mdx></li>
                    <li>delete room <wct-icon-mdx title="delete" icon-url="../../../../../../img/icons/trash.svg" size="1em"></wct-icon-mdx></li>
                  </ul>
                  <li>provider list <wct-icon-mdx title="providers" icon-url="../../../../../../img/icons/network.svg" size="1em"></wct-icon-mdx></li>
                  <ul class="sub">
                    <li>provider graph</li>
                    <li>manual provider settings</li>
                    <li>provider with multiple settings, depending type <wct-icon-mdx title="shield" icon-url="../../../../../../img/icons/shield-check.svg" size="1em"></wct-icon-mdx></li>
                  </ul>
                  <li>user list <wct-icon-mdx title="user" icon-url="../../../../../../img/icons/user-other.svg" size="1em"></wct-icon-mdx></li>
                  <ul class="sub">
                    <li>active and historically connected user graph</li>
                    <li>user with multiple information <wct-icon-mdx title="user" icon-url="../../../../../../img/icons/user-self.svg" size="1em"></wct-icon-mdx></li>
                  </ul>
                  <li>message - username</li>
                  <ul class="sub">
                    <li>click <span class="avatar" style="background-color: #622274"></span> to view user@user list and if it is your user, edit your username <wct-icon-mdx title="edit" icon-url="../../../../../../img/icons/pencil.svg" size="1em"></wct-icon-mdx></li>
                  </ul>
                  <li>message details <wct-icon-mdx title="details" icon-url="../../../../../../img/icons/dots-circle-horizontal.svg" size="1em"></wct-icon-mdx></li>
                  <ul class="sub">
                    <li>reply <wct-icon-mdx title="reply" icon-url="../../../../../../img/icons/arrow-back-up.svg" size="1em"></wct-icon-mdx></li>
                    <li>delete (if it is your message) <wct-icon-mdx title="delete" icon-url="../../../../../../img/icons/trash.svg" size="1em"></wct-icon-mdx></li>
                    <li>copy <wct-icon-mdx title="copy" icon-url="../../../../../../img/icons/copy.svg" size="1em"></wct-icon-mdx></li>
                    <li>share link to room and message <wct-icon-mdx title="share" icon-url="../../../../../../img/icons/share-3.svg" size="1em"></wct-icon-mdx></li>
                  </ul>
                  <li>encrypted message - click to request the key <wct-icon-mdx title="Request key" icon-url="../../../../../../img/icons/key-square.svg" size="1em"></wct-icon-mdx></li>
                  <li>select/generate a key for next message <wct-icon-mdx title="select/generate a key" icon-url="../../../../../../img/icons/lock-open-2.svg" size="1em"></wct-icon-mdx></li>
                  <li>send message <wct-icon-mdx title="send" icon-url="../../../../../../img/icons/send-2.svg" size="1em"></wct-icon-mdx></li>
                  <li>upload files <wct-icon-mdx title="upload files" icon-url="../../../../../../img/icons/file-upload.svg" size="1em"></wct-icon-mdx></li>
                  <li>start jitsi peer-to-peer video call <wct-icon-mdx title="video call" icon-url="../../../../../../img/icons/video.svg" size="1em"></wct-icon-mdx></li>
                </ul>
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
