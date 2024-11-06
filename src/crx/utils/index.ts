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
