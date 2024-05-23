import { LinkedList } from '../../../../common/LinkedList';
import { AbstractCache } from './Cache';

class LRUCache<K, V> implements AbstractCache<K, V> {
  protected capacity: number;
  protected cache: Map<K, V>;
  protected queue: LinkedList<K>;

  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.queue = new LinkedList();
  }

  get(key: K): V | null {
    if (this.cache.has(key)) {
      this.queue.deleteKey(key);
      this.queue.addFirst(key);
      return this.cache.get(key);
    }
    return null;
  }

  put(key: K, value: V): void {
    if (this.cache.size >= this.capacity) {
      const lruKey = this.queue.removeLast().value;
      this.cache.delete(lruKey);
    }

    this.cache.set(key, value);
    this.queue.addFirst(key);
  }
}

export { LRUCache };
