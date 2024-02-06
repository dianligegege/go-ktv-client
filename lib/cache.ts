const CACHEKEY = 'GOKTV_';

export const enum CacheKey {
  MESSAGE_SHOW_TYPE = 'MESSAGE_SHOW_TYPE',
}

export const getCache = (key: any) => {
  const keyWithPrefix = CACHEKEY + key;
  const data = localStorage.getItem(keyWithPrefix);
  if (data) {
    return JSON.parse(data)[keyWithPrefix];
  }
  return null;
}

export const setCache = (cacheData: object) => {
  const [key, val] = Object.entries(cacheData)[0];
  const keyWithPrefix = CACHEKEY + key;
  const data = localStorage.getItem(keyWithPrefix);
  if (data) {
    const parsedData = JSON.parse(data);
    parsedData[keyWithPrefix] = val;
    localStorage.setItem(keyWithPrefix, JSON.stringify(parsedData));
  } else {
    localStorage.setItem(keyWithPrefix, JSON.stringify({ [keyWithPrefix]: val }));
  }
}

