import { match } from "./utils";
import { getZhihuHotListApi } from "./utils/request";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[onInstalled] ---> ", "onInstalled");
  console.log("[location] ---> ", location);
  // 点击工具栏时展开侧边栏
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.runtime.onMessage.addListener(
  (message: { apiName: string; [key: string]: any }, _sender, sendResponse) => {
    const { apiName, params } = message;
    match(apiName, {
      /** 爬取知乎 */
      getZhihuHotList: async () => {
        const res = await getZhihuHotListApi();
        sendResponse(res);
      },
      _: () => {},
    });
    return true;
  }
);
