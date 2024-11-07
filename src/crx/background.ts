import { match } from "./utils";
import { getZhihuHotListApi, getWbHotListApi, getDyHotListApi, getJueJinHotListApi, getBaiDuHotListApi } from "./utils/request";

chrome.runtime.onInstalled.addListener(() => {
  // 点击工具栏时展开侧边栏
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.runtime.onMessage.addListener(
  (message: { apiName: string; [key: string]: any }, _sender, sendResponse) => {
    const { apiName } = message;
    match(apiName, {
      /** 爬取知乎 */
      getZhihuHotList: async () => {
        const res = await getZhihuHotListApi();
        sendResponse(res);
      },
      getWbHotList: async () => {
        const res = await getWbHotListApi();
        sendResponse(res);
      },
      getDyHotList: async () => {
        const res = await getDyHotListApi();
        sendResponse(res);
      },
      getJueJinHotList: async () => {
        const res = await getJueJinHotListApi();
        sendResponse(res);
      },
      getBaiDuHotList: async () => {
        const res = await getBaiDuHotListApi();
        sendResponse(res);
      },
      _: () => {},
    });
    return true;
  }
);
