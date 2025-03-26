/* global self */
/* global location */

const currentScriptUrl = new URL(document.currentScript.src)

// @ts-ignore
self.Environment = {
  isTestingEnv: location.hostname === 'localhost',
  language: currentScriptUrl.searchParams.get('language') || document.documentElement.getAttribute('lang') || 'en',
  roomNamePrefix: 'chat-',
  stage: currentScriptUrl.searchParams.get('stage') || document.documentElement.getAttribute('stage') || 'alpha',
  keepAlive: 86400000,
  version: currentScriptUrl.searchParams.get('version') || document.documentElement.getAttribute('version') || '4.7.2', // https://semver.org/
  timestampNamespace: 't_',
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
document.body.addEventListener('pre-route', event => {
  self.Environment.activeRoute = event.detail.component
  self.Environment.router = event.target
})
