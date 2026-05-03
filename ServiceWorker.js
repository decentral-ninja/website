/* global self */
/* global location */
/* global caches */
/* global importScripts */
/* global NotificationServiceWorker */

importScripts('./src/es/event-driven-web-components-yjs/src/es/serviceWorkers/NotificationServiceWorker.js')
importScripts('./src/es/event-driven-web-components-webtorrent/src/webtorrent/lib/worker-server.js')

/**
 * This ServiceWorker always fetches and caches but races each time cache vs. fetch. Which means that it serves from cache but updates cache on each request.
 *
 * @extends NotificationServiceWorker
 */
class ServiceWorker extends NotificationServiceWorker {
  constructor () {
    super()

    this.name = 'ServiceWorker'
    this.version = 'v55'
    this.decentralNinjaOrigin = 'https://decentral.ninja'
    if (location.hostname === 'localhost' || location.origin === this.decentralNinjaOrigin) {
      this.decentralNinjaRequestsAvailable = false
    } else  {
      this.decentralNinjaRequestsAvailable = true
      setInterval(() => (this.decentralNinjaRequestsAvailable = true), 86400000) // reset once a day
    }
    // KEEP DOING: When version upgrade also update the precache. This is a manual process by clicking through all the routes and dialogs, then enter the following code snippet into the console and copy/paste the result into this.precache:
    // Code: document.body.prepend(Array.from(new Set(self.performance.getEntriesByType('resource').filter(resource => resource.name.includes(location.origin)).map(resource => {let url = resource.name;try{url = new URL(resource.name);url.searchParams.delete('version');url = url.href}catch(error){}return url.replace(location.origin, '.')}).sort((a, b) => a < b ? -1 : a > b ? 1 : 0))).reduce((textarea, curr) => {textarea.value += `'${curr}',\n`;return textarea}, document.createElement('textarea')))
    this.precache = [
      './',
      './index.html',
      './manifest.json',
      './src/css/variables.css',
      './src/es/chat/es/components/atoms/emojis/EmojiButton.js',
      './src/es/chat/es/components/atoms/emojis/EmojiPicker.js',
      './src/es/chat/es/components/atoms/glideToReveal/GlideToReveal.js',
      './src/es/chat/es/components/atoms/Input.js',
      './src/es/chat/es/components/atoms/keyName/KeyName.js',
      './src/es/chat/es/components/atoms/keyRequestButton/KeyRequestButton.js',
      './src/es/chat/es/components/atoms/keyRequestMessage/KeyRequestMessage.js',
      './src/es/chat/es/components/atoms/keyStatus/KeyStatus.js',
      './src/es/chat/es/components/atoms/nickName/NickName.js',
      './src/es/chat/es/components/atoms/p2pGraph/p2p-graph.js',
      './src/es/chat/es/components/atoms/p2pGraph/P2pGraph.js',
      './src/es/chat/es/components/atoms/providerName/ProviderName.js',
      './src/es/chat/es/components/atoms/roomName/RoomName.js',
      './src/es/chat/es/components/atoms/roomTitle/RoomTitle.js',
      './src/es/chat/es/components/controllers/Chat.js',
      './src/es/chat/es/components/molecules/Chat.js',
      './src/es/chat/es/components/molecules/ConnectedUsers.js',
      './src/es/chat/es/components/molecules/dialogs/JitsiDialog.js',
      './src/es/chat/es/components/molecules/dialogs/KeyNameDialog.js',
      './src/es/chat/es/components/molecules/dialogs/KeysDialog.js',
      './src/es/chat/es/components/molecules/dialogs/MessageDialog.js',
      './src/es/chat/es/components/molecules/dialogs/NickNameDialog.js',
      './src/es/chat/es/components/molecules/dialogs/prototypes/SetStringDialog.js',
      './src/es/chat/es/components/molecules/dialogs/RoomNameAkaDialog.js',
      './src/es/chat/es/components/molecules/dialogs/ShareDialog.js',
      './src/es/chat/es/components/molecules/Key.js',
      './src/es/chat/es/components/molecules/message/Message.js',
      './src/es/chat/es/components/molecules/Notifications.js',
      './src/es/chat/es/components/molecules/Provider.js',
      './src/es/chat/es/components/molecules/Providers.js',
      './src/es/chat/es/components/molecules/Rooms.js',
      './src/es/chat/es/components/molecules/User.js',
      './src/es/chat/es/components/molecules/Users.js',
      './src/es/components/atoms/iconChat/IconChat.js',
      './src/es/components/atoms/iconCombinations/add-key-/add-key-.css',
      './src/es/components/atoms/iconCombinations/IconCombinations.js',
      './src/es/components/atoms/iconReload/IconReload.js',
      './src/es/components/atoms/iconStates/IconStates.js',
      './src/es/components/atoms/loading/default-/default-.css',
      './src/es/components/atoms/loading/Loading.js',
      './src/es/components/atoms/logo/default-/default-.css',
      './src/es/components/atoms/logo/invert-/invert-.css',
      './src/es/components/atoms/logo/Logo.js',
      './src/es/components/atoms/scroll/Scroll.js',
      './src/es/components/organisms/body/Body.js',
      './src/es/components/organisms/footer/Footer.js',
      './src/es/components/organisms/header/Header.js',
      './src/es/components/pages/Chat.js',
      './src/es/components/pages/Index.js',
      './src/es/Environment.js',
      './src/es/event-driven-web-components-prototypes/src/controllers/Crypto.js',
      './src/es/event-driven-web-components-prototypes/src/controllers/Storage.js',
      './src/es/event-driven-web-components-prototypes/src/FetchCss.js',
      './src/es/event-driven-web-components-prototypes/src/FetchHtml.js',
      './src/es/event-driven-web-components-prototypes/src/FetchModules.js',
      './src/es/event-driven-web-components-prototypes/src/helpers/Helpers.js',
      './src/es/event-driven-web-components-prototypes/src/Hover.js',
      './src/es/event-driven-web-components-prototypes/src/Intersection.js',
      './src/es/event-driven-web-components-prototypes/src/Mutation.js',
      './src/es/event-driven-web-components-prototypes/src/Shadow.js',
      './src/es/event-driven-web-components-prototypes/src/WebWorker.js',
      './src/es/event-driven-web-components-router/src/Router.js',
      './src/es/event-driven-web-components-webtorrent/src/controllers/Webtorrent.js',
      './src/es/event-driven-web-components-webtorrent/src/event-driven-web-components-prototypes/src/Intersection.js',
      './src/es/event-driven-web-components-webtorrent/src/event-driven-web-components-prototypes/src/Shadow.js',
      './src/es/event-driven-web-components-webtorrent/src/views/Webtorrent.js',
      './src/es/event-driven-web-components-webtorrent/src/webtorrent/dist/webtorrent.min.js',
      './src/es/event-driven-web-components-yjs/src/es/controllers/Keys.js',
      './src/es/event-driven-web-components-yjs/src/es/controllers/Notifications.js',
      './src/es/event-driven-web-components-yjs/src/es/controllers/Providers.js',
      './src/es/event-driven-web-components-yjs/src/es/controllers/Rooms.js',
      './src/es/event-driven-web-components-yjs/src/es/controllers/Users.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/fp.min.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/y-indexeddb.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/y-webrtc-trystero.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/y-webrtc.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/y-websocket.js',
      './src/es/event-driven-web-components-yjs/src/es/dependencies/yjs.js',
      './src/es/event-driven-web-components-yjs/src/es/EventDrivenYjs.js',
      './src/es/event-driven-web-components-yjs/src/es/helpers/Utils.js',
      './src/es/event-driven-web-components-yjs/src/event-driven-web-components-prototypes/src/WebWorker.js',
      './src/es/Helpers.js',
      './src/es/web-components-toolbox/src/css/reset.css',
      './src/es/web-components-toolbox/src/css/style.css',
      './src/es/web-components-toolbox/src/es/components/atoms/button/Button.js',
      './src/es/web-components-toolbox/src/es/components/atoms/button/primary-/primary-.css',
      './src/es/web-components-toolbox/src/es/components/atoms/button/secondary-/secondary-.css',
      './src/es/web-components-toolbox/src/es/components/atoms/iconMdx/IconMdx.js',
      './src/es/web-components-toolbox/src/es/components/atoms/iframe/Iframe.js',
      './src/es/web-components-toolbox/src/es/components/atoms/input/Input.js',
      './src/es/web-components-toolbox/src/es/components/atoms/menuIcon/MenuIcon.js',
      './src/es/web-components-toolbox/src/es/components/atoms/qrCodeSvg/qrcode.min.js',
      './src/es/web-components-toolbox/src/es/components/atoms/qrCodeSvg/QrCodeSvg.js',
      './src/es/web-components-toolbox/src/es/components/molecules/details/default-/default-.css',
      './src/es/web-components-toolbox/src/es/components/molecules/details/Details.js',
      './src/es/web-components-toolbox/src/es/components/molecules/dialog/default-/default-.css',
      './src/es/web-components-toolbox/src/es/components/molecules/dialog/Dialog.js',
      './src/es/web-components-toolbox/src/es/components/molecules/dialog/left-slide-in-/left-slide-in-.css',
      './src/es/web-components-toolbox/src/es/components/molecules/dialog/top-slide-in-/top-slide-in-.css',
      './src/es/web-components-toolbox/src/es/components/molecules/dialogClipboard/default-/default-.css',
      './src/es/web-components-toolbox/src/es/components/molecules/dialogClipboard/DialogClipboard.js',
      './src/es/web-components-toolbox/src/es/components/molecules/loadTemplateTag/LoadTemplateTag.js',
      './src/es/web-components-toolbox/src/es/components/molecules/tabs/Tabs.js',
      './src/es/web-components-toolbox/src/es/components/organisms/grid/2colums2rows-/2colums2rows-.css',
      './src/es/web-components-toolbox/src/es/components/organisms/grid/Grid.js',
      './src/es/web-components-toolbox/src/es/components/prototypes/Anchor.js',
      './src/es/web-components-toolbox/src/es/components/prototypes/Hover.js',
      './src/es/web-components-toolbox/src/es/components/prototypes/Intersection.js',
      './src/es/web-components-toolbox/src/es/components/prototypes/Mutation.js',
      './src/es/web-components-toolbox/src/es/components/prototypes/Shadow.js',
      './src/es/web-components-toolbox/src/es/helpers/Helpers.js',
      './src/font/night-in-tokyo.regular.woff2',
      './src/img/icons/alert-triangle.svg',
      './src/img/icons/android-icon-144x144.png',
      './src/img/icons/arrow-back-up.svg',
      './src/img/icons/bell-off.svg',
      './src/img/icons/bell-plus.svg',
      './src/img/icons/bell.svg',
      './src/img/icons/chevron-left.svg',
      './src/img/icons/copy.svg',
      './src/img/icons/dots-circle-horizontal.svg',
      './src/img/icons/download.svg',
      './src/img/icons/favicon-32x32.png',
      './src/img/icons/file-upload.svg',
      './src/img/icons/fold-down.svg',
      './src/img/icons/history.svg',
      './src/img/icons/key-filled.svg',
      './src/img/icons/key-square.svg',
      './src/img/icons/lock-open-2.svg',
      './src/img/icons/lock.svg',
      './src/img/icons/message-2-share.svg',
      './src/img/icons/message-check.svg',
      './src/img/icons/message-x.svg',
      './src/img/icons/mobiledata.svg',
      './src/img/icons/network-off.svg',
      './src/img/icons/network.svg',
      './src/img/icons/pencil.svg',
      './src/img/icons/plug-connected-x.svg',
      './src/img/icons/plug-connected.svg',
      './src/img/icons/plus.svg',
      './src/img/icons/reload.svg',
      './src/img/icons/send-2.svg',
      './src/img/icons/share-3.svg',
      './src/img/icons/shield-check.svg',
      './src/img/icons/swipe-down.svg',
      './src/img/icons/trash-off.svg',
      './src/img/icons/trash.svg',
      './src/img/icons/upload.svg',
      './src/img/icons/user-off.svg',
      './src/img/icons/user-other.svg',
      './src/img/icons/user-self.svg',
      './src/img/icons/video-off.svg',
      './src/img/icons/video-plus.svg',
      './src/img/icons/video.svg',
      './src/img/logo.svg',
      './src/img/logoIcon.svg',
      './src/img/macaque-noise.webp',
      './src/img/ninjaBob.png'
    ]
    this.doNotIntercept = ['webtorrent']
    this.doIntercept = [location.origin, this.decentralNinjaOrigin]
    // !!! KEEP THIS IN SYNC WITH Environment.js !!!
    // used for hard replace of domain host
    this.replaceHosts = [{
      hostname: 'the-decentral-web.herokuapp.com',
      pattern: '/the-decentral-web\.herokuapp\.com/',
      replacement: 'heroku.peerweb.site',
      idPattern: 'p_the-decentral-web-herokuapp-com', // used at molecules/Provider.js setActive L:617
      idReplacement: 'p_heroku-peerweb-site'
    }]

    this.addInstallEventListener()
    this.addActivateEventListener()
    this.addFetchEventListener()
  }

  // onInstall init cache
  addInstallEventListener () {
    self.addEventListener('install', event => {
      self.skipWaiting()
      event.waitUntil(caches.open(this.version).then(cache => cache.addAll(this.precache)))
    })
  }

  // onActivate clear old caches to avoid conflict
  addActivateEventListener () {
    self.addEventListener('activate', event => {
      event.waitUntil(caches.keys().then(keyList => Promise.all(keyList.map(key => key !== this.version ? caches.delete(key) : undefined))))
      event.waitUntil(self.clients.claim())
    })
  }

  // intercepts fetches, asks cache for fast response and still fetches and caches afterwards
  addFetchEventListener () {
    self.addEventListener('fetch', event => {
      let request = event.request
      let matchedReplaceHost
      // overwrite host
      if (this.replaceHosts.some(replaceHost => request.url.match((matchedReplaceHost = replaceHost).pattern))) request = ServiceWorker.replaceHost(request, matchedReplaceHost)
      // intercept for caching logic
      if (this.doNotIntercept.every(url => !request.url.includes(url)) && this.doIntercept.some(url => request.url.includes(url))) return new Promise((resolve, reject) => {
        let counter = 0
        let didResolve = false
        const doResolve = response => {
          counter++
          if (!didResolve) {
            if (response) {
              didResolve = true
              resolve(response)
            } else if (counter >= 2) { // two which race, when none resulted in any useful response, reject
              reject(response)
            }
          }
          return response || new Error(`No response for ${request.url}`)
        }
        /** @type {Request} */
        const cacheKey = ServiceWorker.getCacheKey(request, location.origin)
        // race fetch vs. cache to resolve
        this.getFetch(request, cacheKey).then(response => doResolve(response)).catch(error => { // start fetching and caching
          console.info(`Can't fetch ${request.url}`, error)
        })
        this.getCache(cacheKey).then(response => doResolve(response)).catch(error => { // grab cache
          console.info(`Can't get cache ${cacheKey}`, error)
        })
      })
      // check webtorrent
      const webtorrentResponse = listener(event)
      if (webtorrentResponse) return event.respondWith(webtorrentResponse)
      return event.respondWith(fetch(request))
    })
  }

  async getCache (request) {
    return caches.match(request)
  }

  async getFetch (request, cacheKey) {
    const cachePut = response => caches.open(this.version).then(
      cache => {
        try {
          // always set the cache by the original request
          if (response.ok) cache.put(cacheKey, response.clone())
        } catch (error) {}
        return response
      }
    )
    // first fetch from decentral.ninja
    const newRequestObj = this.decentralNinjaRequestsAvailable ? ServiceWorker.getRequestWithNewOrigin(request, this.decentralNinjaOrigin) : {request}
    return fetch(newRequestObj.newRequest || newRequestObj.request, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new TypeError(response.statusText)
        if (newRequestObj.newRequest) this.decentralNinjaRequestsAvailable = true
        return cachePut(response)
      })
      .catch(error => {
        if (newRequestObj.newRequest) {
          this.decentralNinjaRequestsAvailable = false
          return fetch(request, { cache: 'no-store' }).then(response => {
            if (!response.ok) throw new TypeError(response.statusText)
            return cachePut(response)
          }).catch(error => {
            if (newRequestObj.newRequest) this.decentralNinjaRequestsAvailable = true
            throw error
          })
        }
        throw error
      })
  }

  /**
   * replaces a request with a new request with a different host
   *
   * @static
   * @param {Request} request
   * @param {{pattern: RegExp, replacement: string}} matchedReplaceHost
   * @returns {Request}
   */
  static replaceHost (request, matchedReplaceHost) {
    try {
      const url = new URL(request.url)
      url.host = matchedReplaceHost.replacement
      return new Request(url.href) // !important: don't use old request as second argument, this would cause issues with mismatches
    } catch (error) {
      return request
    }
  }

  /**
   * modifies a request url to loose it's version param and for index.html all its search params and does getRequestWithNewOrigin
   * this keeps the cache clean and avoids caching the same file multiple times
   * -> consider to use cache.match ignoreSearch instead of filtering the  search params manually: https://developer.mozilla.org/en-US/docs/Web/API/Cache/match
   *
   * @static
   * @param {Request} request
   * @returns {Request}
   */
  static getCacheKey (request, newOrigin) {
    try {
      const url = new URL(request.url)
      url.searchParams.delete('version')
      // since we use a router at index.html, this is always index.html as response, no matter the search params
      if (url.pathname === '/') url.search = ''
      const newRequestObj = ServiceWorker.getRequestWithNewOrigin(new Request(url.href), newOrigin) // !important: don't use old request as second argument for new Request, this would cause issues with mismatches
      return newRequestObj.newRequest || newRequestObj.request
    } catch (error) {
      return request
    }
  }

  /**
   * replace request origin with newOrigin to fetch newest version of website assets/sources
   *
   * @static
   * @param {Request} request
   * @returns {{request: Request, newRequest: Request|null}}
   */
  static getRequestWithNewOrigin (request, newOrigin) {
    if (request.url.includes(newOrigin)) return {request}
    try {
      const url = new URL(request.url)
      return {request, newRequest: new Request(`${newOrigin}${url.pathname}${url.search}${url.hash}`)} // !important: don't use old request as second argument, this would cause issues with mismatches
    } catch (error) {
      return {request}
    }
  }
}
new ServiceWorker() // eslint-disable-line
