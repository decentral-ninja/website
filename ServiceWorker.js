/* global self */
/* global importScripts */
/* global NotificationServiceWorker */

importScripts('./src/es/event-driven-web-components-yjs/src/es/serviceWorkers/NotificationServiceWorker.js')

class ServiceWorker extends NotificationServiceWorker {
  constructor () {
    super()

    // TODO: APP caching, so that it can run offline
    this.addInstallEventListener()
    this.addActivateEventListener()
  }

  addInstallEventListener () {
    self.addEventListener('install', event => self.skipWaiting())
  }

  addActivateEventListener () {
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
  }
}
new ServiceWorker() // eslint-disable-line
