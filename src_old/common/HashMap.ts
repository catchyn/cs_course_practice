import { NumberUtils } from '../utils/number';

export class HashMap {
  #buffer: ([key: unknown, value: unknown] | undefined)[];
  #size = 0;
  #itemNum = 0;
  #nonItem = null;

  constructor(size: number) {
    const primeSize = this.#getPrime(size);
    this.#size = primeSize;
    this.#buffer = new Array(primeSize);
  }

  set(key: unknown, value: unknown): void {
    let hash = this.#hashCode(key);
    while (this.#buffer[hash] !== undefined && this.#buffer[hash]?.[0] !== this.#nonItem) {
      hash++;
      hash %= this.#size;
    }
    this.#buffer[hash] = [key, value];
    this.#itemNum++;
    if (this.#itemNum > this.#size >>> 1) {
      this.#overflow();
    }
  }

  get(key: unknown): unknown {
    let hash = this.#hashCode(key);
    while (this.#buffer[hash] !== undefined) {
      if (this.#getKey(this.#buffer[hash]) === key) {
        return this.#getValue(this.#buffer[hash]);
      }
      hash++;
      hash %= this.#size;
    }
    return undefined;
  }

  delete(key: unknown): unknown {
    let hash = this.#hashCode(key);
    while (this.#buffer[hash] !== undefined) {
      if (this.#getKey(this.#buffer[hash]) === key) {
        const temp = this.#getValue(this.#buffer[hash]);
        this.#buffer[hash] =
          this.#buffer[hash + 1] === undefined ? undefined : [this.#nonItem, this.#nonItem];
        this.#itemNum--;
        return temp;
      }
      hash++;
      hash %= this.#size;
    }
    return undefined;
  }

  has(key: unknown): boolean {
    let hash = this.#hashCode(key);
    while (this.#buffer[hash] !== undefined) {
      if (this.#getKey(this.#buffer[hash]) === key) {
        return true;
      }
      hash++;
      hash %= this.#size;
    }
    return false;
  }

  getBuffer() {
    return this.#buffer;
  }

  getItemNum() {
    return this.#itemNum;
  }

  getNonItem() {
    return this.#nonItem;
  }

  getSize() {
    return this.#size;
  }

  #hashCode(key: unknown): number {
    if (typeof key === 'number') {
      return this.#hashCodeNumber(key);
    } else if (typeof key === 'string') {
      return this.#hashCodeString(key);
    } else {
      return 0;
    }
  }

  #hashCodeNumber(key: number): number {
    return this.#size - (key % this.#size);
  }

  #hashCodeString(key: string): number {
    let hash = 0,
      i,
      chr;
    if (key.length === 0) return hash;
    for (i = 0; i < key.length; i++) {
      chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash % this.#size;
  }

  #getKey(item: [key: unknown, value: unknown] | null | undefined): unknown {
    return item?.[0];
  }

  #getValue(item: [key: unknown, value: unknown] | null | undefined): unknown {
    return item?.[1];
  }

  #getPrime(num: number): number {
    for (let i = num + 1; ; i++) {
      if (NumberUtils.isPrime(i)) {
        return i;
      }
    }
  }

  #overflow(): void {
    const newSize = this.#getPrime(2 * this.#size);
    const newHashMap = new HashMap(newSize);
    for (let i = 0; i < this.#buffer.length; i++) {
      const item = this.#buffer[i];
      if (item) {
        const [key, value]: [key: unknown, value: unknown] = item;
        newHashMap.set(key, value);
      }
    }
    this.#buffer = newHashMap.getBuffer();
    this.#size = newHashMap.getSize();
    this.#nonItem = newHashMap.getNonItem();
    this.#itemNum = newHashMap.getItemNum();
  }
}
