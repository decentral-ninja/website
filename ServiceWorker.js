/* global self */
/* global clients */

importScripts('./src/es/event-driven-web-components-yjs/MasterServiceWorker.js')

class ServiceWorker extends MasterServiceWorker {
  constructor () {
    super()
    // TODO: APP caching, so that it can run offline
  }
}
new ServiceWorker() // eslint-disable-line
