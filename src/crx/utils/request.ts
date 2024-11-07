import { formatToW } from "./index";

/** 爬知乎热榜 */
export const getZhihuHotListApi = async () => {
  const res = await fetch("https://www.zhihu.com/hot");
  const htmlContent = await res.text();
  const regex = /<script id="js-initialData"[^>]*>([\s\S]*?)<\/script>/; // Match script content
  const match = htmlContent.match(regex);

  if (match) {
    const jsonData = match[1];
    const parsedData = JSON.parse(jsonData);
    console.log("[parsedData] ---> ", parsedData);
    return parsedData.initialState.topstory.hotList.map((item: any) => {
      return {
        id: item.id,
        title: item.target.titleArea.text,
        desc: item.target.excerptArea.text,
        link: item.target.link.url,
        img: item.target.imageArea.url,
        hot: item.target.metricsArea.text,
      };
    });
  }
  return [];
};
/** 爬微博热榜 */
export const getWbHotListApi = async () => {
  const res = await fetch(
    "https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot"
  );
  const response = await res.json();
  console.log("[response] ---> ", response);
  if (response.ok === 1) {
    const hotFind = response.data.cards.find(
      (val: any) => val.itemid === "hotword"
    );
    if (hotFind) {
      const { card_group } = hotFind;
      return card_group.map((val: any) => {
        return {
          id: val.itemId,
          title: val.desc,
          desc: val.desc,
          link: val.scheme,
          img: "",
          hot: formatToW(val.desc_extr),
        };
      });
    }
  }
  return [];
};
/** 爬抖音热榜 */
export const getDyHotListApi = async () => {
  const res = await fetch(
    "https://www.douyin.com/aweme/v1/web/hot/search/list/"
  );
  const response = await res.json();
  console.log("[response] ---> ", response);
  if (response.data) {
    return response.data.word_list.map((val: any) => {
      return {
        id: val.sentence_id,
        title: val.word,
        desc: "",
        link: `https://www.douyin.com/hot/${
          val.sentence_id
        }/${encodeURIComponent(val.word)}`,
        img: "",
        hot: formatToW(val.hot_value),
      };
    });
  }
  return [];
};
/** 爬掘金综合文章热榜 */
export const getJueJinHotListApi = async () => {
  const res = await fetch(
    "https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot"
  );
  const response = await res.json();
  console.log("[response] ---> ", response);
  if (response.err_msg === "success") {
    return response.data.map((val: any) => {
      return {
        id: val.content.content_id,
        title: val.content.title,
        desc: `用户：${val.author.name} · ${val.content_counter.view}浏览 · ${val.content_counter.interact_count}互动 · ${val.content_counter.collect}收藏`,
        link: `https://juejin.cn/post/${val.content.content_id}`,
        img: val.author.avatar,
        hot: formatToW(val.content_counter.hot_rank),
      };
    });
  }
  return [];
};
/** 爬百度热榜 */
export const getBaiDuHotListApi = async () => {
  try {
    const res = await fetch("https://top.baidu.com/board?tab=realtime");
    const text = await res.text();
    const match = text.match(/<!--s-data:\s*(.*?)\s*-->/);
    if (match) {
      const matchText = match[1];
      const response = JSON.parse(matchText);
      console.log("[getBaiDuHotListApi response] ---> ", response);
      return response.data.cards[0].content.map((val: any) => {
        return {
          id: val.query,
          title: val.word,
          desc: val.desc,
          link: val.url,
          img: val.img,
          hot: formatToW(val.hotScore),
        };
      });
    }
    return [];
  } catch (error) {
    console.log("[error] ---> ", error);
    return [];
  }
};
