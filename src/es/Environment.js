/* global self */
/* global location */

const currentScriptUrl = new URL(document.currentScript.src)

// @ts-ignore
self.Environment = {
  isTestingEnv: location.hostname === 'localhost',
  language: currentScriptUrl.searchParams.get('language') || document.documentElement.getAttribute('lang') || 'en',
  stage: currentScriptUrl.searchParams.get('stage') || document.documentElement.getAttribute('stage') || 'alpha',
  version: currentScriptUrl.searchParams.get('version') || document.documentElement.getAttribute('version') || '5.0.28', // https://semver.org/
  roomNamePrefix: 'chat-',
  updateNotificationsAfter: 5000,
  keepAlive: 86400000,
  providers: [{
    name: 'websocket',
    url: 'wss://the-decentral-web.herokuapp.com'
  },
  {
    name: 'websocket',
    url: 'https://the-decentral-web.loca.lt' // TODO: test and then remove this line cause the loca.lt subdomain could be hijacked
  },
  {
    name: 'websocket',
    url: 'https://decentral-ninja.loca.lt' // TODO: test and then remove this line cause the loca.lt subdomain could be hijacked
  }],
  permanentFallbacks: new Map([['wss://the-decentral-web.herokuapp.com', 'https://the-decentral-web.loca.lt']]), // TODO: permanentFallbacks test and then remove this line as long as heroku works
  alternativeWebsiteHosts: ['https://decentralninja.app.runonflux.io/', 'https://decentralninja_8080.app.runonflux.io'],
  timestampNamespace: 't_',
  providerNamespace: 'p_',
  awarenessEventListenerDelay: 1000, // the delay to react on events like 'yjs-users' or 'yjs-providers'
  /**
   * Get custom mobile breakpoint
   * @param {{constructor?: string, tagName?: string, namespace?: string}} organism
   * @return {string}
   */
  mobileBreakpoint: ({ constructor, tagName, namespace } = {}) => {
    switch (true) {
      default:
        return '767px'
    }
  }
}
// react to the router and expose the active route for components globalEventTarget
document.body.addEventListener('pre-route', event => {
  self.Environment.activeRoute = event.detail.component
  self.Environment.router = event.target
})
