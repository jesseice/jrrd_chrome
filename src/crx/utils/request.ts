/** 爬知乎热榜 */
export const getZhihuHotListApi = async () => {
  const res = await fetch("https://www.zhihu.com/hot");
  const htmlContent = await res.text();
  const regex = /<script id="js-initialData"[^>]*>([\s\S]*?)<\/script>/; // Match script content
  const match = htmlContent.match(regex);

  if (match) {
    const jsonData = match[1];
    const parsedData = JSON.parse(jsonData);
    return parsedData.initialState.topstory.hotList.map((item: any) => {
      return {
        id: item.id,
        title: item.target.titleArea.text,
        desc: item.target.excerptArea.text,
        link: item.target.link.url,
        img: item.target.imageArea.url,
        hot: item.target.metricsArea.text
      };
    });
  }
  return [];
};
