/* global self */
/* global location */

const currentScriptUrl = new URL(document.currentScript.src)

// @ts-ignore
self.Environment = {
  isTestingEnv: location.hostname === 'localhost',
  language: currentScriptUrl.searchParams.get('language') || document.documentElement.getAttribute('lang') || 'en',
  stage: currentScriptUrl.searchParams.get('stage') || document.documentElement.getAttribute('stage') || 'alpha',
  version: `version=${currentScriptUrl.searchParams.get('version') || document.documentElement.getAttribute('version') || '6.1.39'}`, // https://semver.org/
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
    createHTML: string => string.replace(/<[a-z]+[^>]*[\s|\/]on[a-z]{4,10}=[^>]*>/gi, '').replace(/<[a-z]+[\s|\/][^>]*javascript:[^>]*>/gi, ''),
    createScriptURL: string => string, // unsafe but including webworker's, service workers, etc. is okay
    createScript: string => string // unsafe but eval at css templates is okay
  })
}
