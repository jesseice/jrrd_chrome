import { TopMsgType } from "./this";

export const platformHex: { [key: string]: TopMsgType } = {
  ZHIHU: {
    name: "知乎",
    bgColor: "#1772F6",
    titleColor: "#191B43",
    apiName: "getZhihuHotList",
  },
  WB: {
    name: "微博",
    bgColor: "#FFC320",
    bgImg: 'https://simg.s.weibo.com/20210521_hot_banner_h5.png',
    titleColor: "#FF4978",
    apiName: "getWbHotList",
  },
  DY: {
    name: "抖音",
    bgColor: "#190E1B",
    titleColor: "#190E1B",
    apiName: "getDyHotList",
  },
};
