type matchKey = string | number;
interface MatchCallbacks<T> {
  [key: matchKey]: () => T;
  _: () => T;
}

/**
 * 模式匹配 类似 switch case
 * @param key 匹配值
 * @param callbacks 回调函数
 * @returns
 */
export const match = <T>(key: matchKey, callbacks: MatchCallbacks<T>) => {
  const keyList = Object.keys(callbacks).map((keys) => keys);
  if (!keyList.includes("_")) {
    // eslint-disable-next-line no-throw-literal
    throw "patterns: '_' not covered";
  }
  return (callbacks[key] || callbacks._)();
};

/** 转 */
export const formatToW = (numStr: any) => {
  try {
    const num = parseInt(String(numStr).replace(/[^\d]/g, ""));

    if (!numStr) return "";
    if (isNaN(num)) {
      return numStr; // 如果提取不到数字，直接返回原始输入
    }
    if (num < 10000) {
      return num.toString(); // 如果小于 10000，直接返回原始数字
    }
    return (num / 10000).toFixed(1) + "w"; // 除以 10000 并保留一位小数
  } catch (error) {
    return "";
  }
};
