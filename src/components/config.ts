import { TopMsgType } from "./this";
import WBLogo from "../assets/weibo.png";
import ZHLogo from "../assets/zhihu.png";
import DYLogo from "../assets/douyin.png";
import JJLogo from "../assets/juejin.png";
import BDLogo from "../assets/baidu.png";

export const platformHex: { [key: string]: TopMsgType } = {
  WB: {
    name: "微博",
    bgColor: "#FFC320",
    bgImg: "https://simg.s.weibo.com/20210521_hot_banner_h5.png",
    titleColor: "#FF4978",
    apiName: "getWbHotList",
    logo: WBLogo,
  },
  ZHIHU: {
    name: "知乎",
    bgColor: "#1772F6",
    titleColor: "#191B43",
    apiName: "getZhihuHotList",
    hasPopover: true,
    logo: ZHLogo,
  },
  DY: {
    name: "抖音",
    bgColor: "#190E1B",
    titleColor: "#190E1B",
    apiName: "getDyHotList",
    logo: DYLogo,
  },
  JUEJIN: {
    name: "掘金",
    bgColor: "#1E80FF",
    titleColor: "#1E8FFF",
    apiName: "getJueJinHotList",
    hasPopover: true,
    logo: JJLogo,
  },
  BAIDU: {
    name: "百度",
    bgColor: "#2932E1",
    titleColor: "#190E1B",
    apiName: "getBaiDuHotList",
    hasPopover: true,
    logo: BDLogo,
  },
};
