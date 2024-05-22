export default defineContentScript({
  matches: ['*://*/*'],
  include_globs: [
    "*://*.google.*/search",
  ],
  main() {
    console.log(`Processing URL [${document.URL}]`);
  },
});
