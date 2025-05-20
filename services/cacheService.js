import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 30 }); // TTL padrão de 30 segundos

export const getCache = (key) => cache.get(key);
export const setCache = (key, data) => cache.set(key, data);
export const deleteCache = (key) => cache.del(key);