import { storage } from "wxt/storage";

export default defineBackground(() => {

  console.log('in background');

  browser.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
      if (request.action === 'store_locally') {
        await storage.setItem('local:enabled', request.value)
      }
    }
  );


});
