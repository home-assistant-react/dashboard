import fs from "node:fs";
import path from "path";
import { CACHE_PATH } from "../const";

export interface CacheData<T> {
  data: T;
  expireAt: string;
}

export function getJsonCache<T>(cacheKey: string, cachePath = "") {
  const cacheFilePath = path.join(cachePath || CACHE_PATH, `${cacheKey}.json`);

  if (fs.existsSync(cacheFilePath)) {
    const cacheFile = fs.readFileSync(cacheFilePath, "utf8");
    const cache = JSON.parse(cacheFile) as CacheData<T>;

    if (new Date(cache.expireAt) < new Date()) {
      fs.unlinkSync(cacheFilePath);
      return null;
    }

    return cache.data;
  }

  return null;
}

export const saveJsonCache = (
  cacheKey: string,
  data: any,
  cachePath = "",
  expireInMinutes = 0,
) => {
  const cacheFilePath = path.join(cachePath || CACHE_PATH, `${cacheKey}.json`);

  //create dir if not exists
  if (!fs.existsSync(cachePath || CACHE_PATH)) {
    fs.mkdirSync(cachePath || CACHE_PATH);
  }

  fs.writeFileSync(
    cacheFilePath,
    JSON.stringify({
      data,
      expireAt: new Date(Date.now() + expireInMinutes * 60000).toISOString(),
    } satisfies CacheData<unknown>),
  );
};
