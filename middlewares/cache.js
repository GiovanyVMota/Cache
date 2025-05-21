import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 30 }); // 30 segundos

export function cacheMiddleware(keyPrefix) {
  return (req, res, next) => {
    const key = `${keyPrefix}`;
    const cachedData = cache.get(key);
    if (cachedData) {
      return res.json(cachedData);
    }
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  };
}

export function invalidateCache(keys) {
  keys.forEach((key) => cache.del(key));
}
