import { AbstractCache } from './Cache';
import { LRUCache } from './LRUCache';
import { NeverCache } from './NeverCache';
import { MRUCache } from './MRUCache';

const saveToCache = <K = unknown, V = unknown>(
  cache: AbstractCache<K, V>,
  key: K,
  value: V,
): void => {
  cache.put(key, value);
};

const lruCache = new LRUCache(10);
const mruCache = new MRUCache(10);
const neverCache = new NeverCache();

saveToCache(lruCache, 1, '1');
saveToCache(mruCache, 2, '2');
saveToCache(neverCache, 3, '3');
