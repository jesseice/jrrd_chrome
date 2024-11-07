import { TopMsgType } from "./this";

export const platformHex: { [key: string]: TopMsgType } = {
  WB: {
    name: "微博",
    bgColor: "#FFC320",
    bgImg: "https://simg.s.weibo.com/20210521_hot_banner_h5.png",
    titleColor: "#FF4978",
    apiName: "getWbHotList",
  },
  ZHIHU: {
    name: "知乎",
    bgColor: "#1772F6",
    titleColor: "#191B43",
    apiName: "getZhihuHotList",
    hasPopover: true,
  },
  DY: {
    name: "抖音",
    bgColor: "#190E1B",
    titleColor: "#190E1B",
    apiName: "getDyHotList",
  },
  JUEJIN: {
    name: "掘金",
    bgColor: "#1E80FF",
    titleColor: "#1E8FFF",
    apiName: "getJueJinHotList",
    hasPopover: true,
  },
  BAIDU: {
    name: "百度",
    bgColor: "#1E80FF",
    titleColor: "#1E8FFF",
    apiName: "getBaiDuHotList",
    hasPopover: true,
  },
};
