export type ContentType = {
  id: string;
  title: string;
  hot: string;
  desc: string;
  link: string;
  img: string;
};

export type TopMsgType = {
  name: string;
  apiName: string;
  titleColor: string;
  bgColor?: string;
  bgImg?: string;
  hasPopover?:boolean
};
