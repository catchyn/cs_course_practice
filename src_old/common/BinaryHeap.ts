import { Queue } from './Queue';

export class BinaryHeap<T> {
  #buffer: T[];
  #currentSize = 0;
  #maxSize = 0;
  #comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number, size?: number);
  constructor(comparator: (a: T, b: T) => number, size?: number, array?: T[]);
  constructor(comparator: (a: T, b: T) => number, size = 100, array?: T[]) {
    this.#comparator = comparator;

    if (array && size) {
      this.#buffer = array;
      this.#maxSize = size;
      this.#currentSize = array.length;
      this.#restoreHeap();
      return;
    }

    this.#buffer = new Array(size);
    this.#maxSize = size;
  }

  insert(value: T) {
    if (this.#currentSize >= this.#maxSize) {
      return false;
    }
    this.#buffer[this.#currentSize] = value;
    this.#goUp(this.#currentSize++);
    return true;
  }

  isEmpty() {
    return this.#currentSize === 0;
  }

  delete() {
    if (this.isEmpty()) {
      throw Error('Heap is empty');
    }
    const root = this.#buffer[0];
    this.#buffer[0] = this.#buffer[this.#currentSize - 1];
    this.#currentSize--;
    this.#goDown(0);
    return root;
  }

  #goUp(index: number) {
    let parentIndex = this.#getParentIndex(index);
    const bottom = this.#buffer[index];
    while (index > 0 && this.#comparator(this.#buffer[parentIndex], bottom) < 0) {
      this.#buffer[index] = this.#buffer[parentIndex];
      index = parentIndex;
      parentIndex = this.#getParentIndex(index);
    }
    this.#buffer[index] = bottom;
  }

  #goDown(index: number) {
    const top = this.#buffer[index];
    let compareResultChildIndex;
    while (index < this.#currentSize / 2) {
      const leftIndex = this.#getLeftChildIndex(index);
      const rightIndex = this.#getRightChildIndex(index);
      if (
        rightIndex < this.#currentSize &&
        this.#comparator(this.#buffer[leftIndex], this.#buffer[rightIndex]) < 0
      ) {
        compareResultChildIndex = rightIndex;
      } else {
        compareResultChildIndex = leftIndex;
      }

      if (this.#comparator(this.#buffer[compareResultChildIndex], top) < 0) {
        break;
      }

      this.#buffer[index] = this.#buffer[compareResultChildIndex];
      index = compareResultChildIndex;
    }
    this.#buffer[index] = top;
  }

  display() {
    const q = new Queue<[number, T, number]>();
    const map = new Map<number, T[]>();
    let maxLevel = 0;
    q.push([0, this.#buffer[0], 0]);
    while (!q.isEmpty()) {
      const [index, value, level] = q.pop();
      if (index < this.#currentSize / 2) {
        const leftIndex = this.#getLeftChildIndex(index);
        const rightIndex = this.#getRightChildIndex(index);
        if (leftIndex < this.#currentSize) {
          q.push([leftIndex, this.#buffer[leftIndex], level + 1]);
        }
        if (rightIndex < this.#currentSize) {
          q.push([rightIndex, this.#buffer[rightIndex], level + 1]);
        }
      }
      maxLevel = Math.max(level);
      const values = map.get(level);
      if (!values) {
        map.set(level, [value]);
      } else {
        values.push(value);
      }
    }

    let str = '';
    for (let i = 0; i <= maxLevel; i++) {
      let spaces = '  ';
      for (let j = maxLevel; j > i; j--) {
        spaces += '   ';
      }

      const arr = map.get(i);
      arr?.forEach((item) => {
        str += spaces + item;
      });
      str += '\n';
    }
    console.log(str);
  }

  #getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  #getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  #getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  #restoreHeap() {
    for (let i = Math.floor(this.#currentSize / 2) - 1; i >= 0; i--) {
      this.#goDown(i);
    }
  }
}
