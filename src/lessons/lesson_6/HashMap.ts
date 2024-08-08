export class HashMap {
  private array: { value: any; key: any }[];

  private deleted = Symbol('deleted');

  private itemsCount = 0;

  constructor(capacity = 64) {
    this.array = new Array(capacity);
  }

  get capacity(): number {
    return this.array.length;
  }

  hash(value) {
    return this.getKeyHash(value);
  }

  private getKeyHash(key: any) {
    return this.getHash(key, this.evaluateHash.bind(this));
  }

  private getStepHash(key: any) {
    return this.getHash(key, this.evaluateStepHash.bind(this));
  }

  private getHash = (key: unknown, hashFn: (key: string) => number): number | null => {
    if (key === null || key === undefined) {
      return null;
    }
    if (typeof key === 'object') {
      key = JSON.stringify(key);
    } else {
      key = key.toString();
    }
    return hashFn(key as string);
  };

  private evaluateStepHash(key: string): number {
    return 19 - (this.simpleEvaluateHash(key) % 19);
  }

  private simpleEvaluateHash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const chr = key.charCodeAt(i);
      hash = hash + chr;
      hash |= 0; // Преобразовываем к 32-битному целому числу
    }
    return hash;
  }

  private evaluateHash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const chr = key.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Преобразовываем к 32-битному целому числу
    }
    return hash;
  }

  private getIndex(hash: number) {
    return hash % this.array.length;
  }

  private findKeyOrEmpty(key) {
    const hashKey = this.getKeyHash(key);
    const hashStep = this.getStepHash(key);
    let index = this.getIndex(hashKey);
    let i = 0;
    while (this.array[index] !== undefined && this.array[index].key !== key) {
      index = (index + hashStep * i) % this.array.length;
      i++;
    }
    return index;
  }

  private findKeyOrEmptyOrDelete(key): [number, boolean] {
    const hashKey = this.getKeyHash(key);
    const hashStep = this.getStepHash(key);
    let index = this.getIndex(hashKey);
    let firstIndex = index;
    let i = 0;
    while (this.array[firstIndex] !== undefined && this.array[firstIndex].key !== key) {
      firstIndex = (firstIndex + hashStep * i) % this.array.length;
      i++;
    }
    if (this.array[firstIndex]) {
      return [firstIndex, true];
    }

    while (this.array[index] !== undefined && this.array[index].key !== this.deleted) {
      index = (index + hashStep * i) % this.array.length;
      i++;
    }
    return [index, false];
  }

  private isPrime(n: number) {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  private createNewArrayAroundN(n: number) {
    let i = n;
    while (!this.isPrime(i)) {
      i++;
    }
    return new Array(i);
  }

  private reHashed(newArray: { value: any; key: any }[]) {
    const oldArray = this.array;
    this.array = newArray;
    this.itemsCount = 0;
    for (let i = 0; i < oldArray.length; i++) {
      if (oldArray[i]?.key) {
        this.set(oldArray[i].key, oldArray[i].value);
      }
    }
  }

  private tryExtendArray() {
    if (this.itemsCount > (this.array.length * 2) / 3) {
      const newArray = this.createNewArrayAroundN(this.array.length * 2);
      this.reHashed(newArray);
    }
  }

  set(key, value) {
    const [index, isFoundKey] = this.findKeyOrEmptyOrDelete(key);
    if (!isFoundKey) {
      this.itemsCount++;
      this.tryExtendArray();
    }
    this.array[index] = { value: value, key: key };
  }

  get(key) {
    const index = this.findKeyOrEmpty(key);
    return this.array[index]?.value;
  }

  has(key) {
    const index = this.findKeyOrEmpty(key);
    return typeof this.array[index] === 'object';
  }

  delete(key) {
    const index = this.findKeyOrEmpty(key);
    const data = this.array[index];
    let temp;
    if (data) {
      this.itemsCount--;
      data.key = this.deleted;
      temp = data.value;
      data.value = undefined;
    }
    return temp;
  }
}
