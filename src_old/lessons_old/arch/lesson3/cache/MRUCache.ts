class MRUCache<K, V> {
  cache: Map<K, V>;
  capacity: number;

  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | null {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  put(key: K, value: V) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

export { MRUCache };
