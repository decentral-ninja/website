/* global self */
/* global location */

const currentScriptUrl = new URL(document.currentScript.src)

// @ts-ignore
self.Environment = {
  isTestingEnv: location.hostname === 'localhost',
  language: currentScriptUrl.searchParams.get('language') || document.documentElement.getAttribute('lang') || 'en',
  stage: currentScriptUrl.searchParams.get('stage') || document.documentElement.getAttribute('stage') || 'beta',
  version: `version=${currentScriptUrl.searchParams.get('version') || document.documentElement.getAttribute('version') || '2.1.12'}`, // https://semver.org/
  roomNamePrefix: 'chat-',
  updateNotificationsAfter: 5000,
  updateProviderPerformanceAfter: 120000,
  keepAlive: 86400000,
  providers: [{
    name: 'websocket',
    url: 'wss://heroku.peerweb.site'
  },
  {
    name: 'websocket',
    url: 'wss://websocket.peerweb.site'
  },
  {
    name: 'websocket',
    url: 'wss://websocket-two.peerweb.site'
  },
  {
    name: 'webrtc',
    url: 'wss://webrtc.peerweb.site'
  },
  {
    name: 'webrtc',
    url: 'wss://webrtc-two.peerweb.site'
  },
  {
    name: 'webrtc',
    url: 'wss://webrtc-trystero.ninja'
  }],
  // !!! KEEP THIS IN SYNC WITH ServiceWorker.js !!!
  // used for hard replace of domain host
  replaceHosts: [{
    hostname: 'the-decentral-web.herokuapp.com',
    pattern: '/the-decentral-web\.herokuapp\.com/',
    replacement: 'heroku.peerweb.site',
    idPattern: 'p_the-decentral-web-herokuapp-com', // used at molecules/Provider.js setActive L:617
    idReplacement: 'p_heroku-peerweb-site'
  }],
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
document.addEventListener('pre-route', event => {
  self.Environment.activeRoute = event.detail.component
  self.Environment.router = event.target
})

/**
 * XSS Content Security Policy
 * NOTE: this function is copied from src/es/components/web-components-toolbox/src/es/helpers/Environment.js and can not be imported, since the createPolicy function must execute synchronous, otherwise the browser throws the policy error
 *
 * https://content-security-policy.com/examples/meta/
 * is enforced by: <meta http-equiv="Content-Security-Policy" content="require-trusted-types-for 'script'">
 *
 * Sink uses trusted type only: https://web.dev/articles/trusted-type
 * Avoid XSS attacks by sanitizing the html according to: https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS
 * and the target list: https://github.com/cure53/DOMPurify/blob/27e8496bcd689a16acc7d0bf7c88b933efad569a/demos/hooks-mentaljs-demo.html#L20
 * plus: https://stackoverflow.com/questions/6976053/xss-which-html-tags-and-attributes-can-trigger-javascript-events
 * stackoverflow citation and conclusion: "I didn't knew about those new attributes. I checked, and it seems that the only attributes that start with on are all Javascript event triggers. I will probably just remove all that match that pattern."
 * NOTE: script tags are already automatically escaped by modern browsers, so we only target <image, <img starting tags and "javascript:"
 *
 * @static
 * @param {string} html
 * @return {string}
 */
if (typeof self.trustedTypes?.createPolicy === 'function' && !self.trustedTypes.defaultPolicy && document.querySelector('meta[http-equiv=Content-Security-Policy][content*=require-trusted-types-for]')) {
  self.trustedTypes.createPolicy('default', {
    // first sanitize tags eg.: <img src="xyz" onload=alert('XSS')>, <img src="xyz" onmouseover=alert('XSS')>, <image/src/onerror=alert('XSS')>, etc.
    // second sanitize tags eg.: <a href="javascript:alert(document.location);">XSS</a>, <form action="javascript:alert(document.location);"><input type="submit" /></form>, etc.
    createHTML: string => string.replace(/<[a-z]+[^>]*[\s|\/]on[a-z]{4,10}=[^>]*>/gi, '').replace(/<[a-z]+[\s|\/][^>]*javascript:[^>]*>/gi, ''), // eslint-disable-line
    createScriptURL: string => string, // unsafe but including webworker's, service workers, etc. is okay
    createScript: string => string // unsafe but eval at css templates is okay
  })
}
