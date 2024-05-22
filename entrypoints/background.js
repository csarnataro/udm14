export default defineBackground(() => {
  browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
      console.log('******** BEGIN: background:4 ********');
      console.dir(request, { depth: null, colors: true });
      console.log('********   END: background:4 ********');
      if (request.action === 'add_udm_14') {
        let [tab] = await browser.tabs.query({ currentWindow: true, active: true })

        let inputUrl = new URL(request.url);
        console.log(`***** ${inputUrl.searchParams.size}`)
        if (inputUrl.searchParams.size > 0 && !inputUrl.searchParams.has('udm')) {
          inputUrl.searchParams.set('udm', '14');
          browser.tabs.update(tab.id, { url: inputUrl.toString() });
        }
      }
    }
  );
});
