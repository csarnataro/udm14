export default defineContentScript({
  matches: ['*://*/*'],
  include_globs: [
    "*://*.google.*/*",
  ],
  main() {
    browser.runtime.sendMessage({ action: 'add_udm_14', url: document.URL });
  },
});
