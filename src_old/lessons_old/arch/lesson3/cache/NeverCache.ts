import { AbstractCache } from './Cache';

class NeverCache<K, V> implements AbstractCache<K, V> {
  cache: Map<K, V>;

  constructor() {
    this.cache = new Map();
  }

  get(key: K): V | null {
    return this.cache.get(key) ?? null;
  }

  put(key: K, value: V): void {
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

export { NeverCache };
