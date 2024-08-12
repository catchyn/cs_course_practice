export class BinaryHeap<T> {
  private buffer: (T | null)[] = [];
  private lastIndex = -1;
  private readonly comparator: (a: T, b: T) => number;

  constructor(rawArray: T[] = [], comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
    this.fillBuffer(rawArray);
  }

  head(): T | null {
    return this.buffer[0] ?? null;
  }

  pop(): T | null {
    if (this.lastIndex < 0) {
      return null;
    }
    const result = this.head();
    this.buffer[0] = this.buffer[this.lastIndex];
    this.lastIndex--;
    this.goDown();
    return result;
  }

  push(value: T): void {
    this.lastIndex++;
    this.buffer[this.lastIndex] = value;
    this.goUp();
  }

  sortedArr(): void {
    const length = this.lastIndex;
    for (let i = 0; i <= length; i++) {
      this.buffer[length - i] = this.pop();
    }
  }

  private fillBuffer(array: T[]) {
    if (array.length < 1) {
      return;
    }
    this.buffer = array;
    // нужно привести к свойствам бинарной кучи
    this.lastIndex = -1;
    for (const value of array) {
      this.push(value);
    }
  }

  private goDown() {
    if (this.lastIndex < 1) {
      return;
    }

    let currentIndex = 0;
    const value = this.buffer[currentIndex];
    const lastParentIndex = this.getParentIndex(this.lastIndex);
    while (currentIndex <= lastParentIndex) {
      const leftIndex = this.getLeftChildIndex(currentIndex);
      const rightIndex = this.getRightChildIndex(currentIndex);

      let childIndex = leftIndex;

      if (
        rightIndex <= this.lastIndex &&
        this.comparator(this.buffer[leftIndex], this.buffer[rightIndex]) < 0
      ) {
        childIndex = rightIndex;
      }

      if (this.comparator(value, this.buffer[childIndex]) < 0) {
        this.buffer[currentIndex] = this.buffer[childIndex];
        currentIndex = childIndex;
      } else {
        break;
      }
    }
    this.buffer[currentIndex] = value;
  }

  private goUp() {
    if (this.lastIndex < 1) {
      return;
    }
    let currentIndex = this.lastIndex;
    const value = this.buffer[currentIndex];
    while (currentIndex >= 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (parentIndex >= 0 && this.comparator(this.buffer[parentIndex], value) < 0) {
        this.buffer[currentIndex] = this.buffer[parentIndex];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
    this.buffer[currentIndex] = value;
  }

  private getParentIndex(nodeIndex: number): number {
    return Math.floor((nodeIndex - 1) / 2);
  }

  private getLeftChildIndex(nodeIndex: number): number {
    return nodeIndex * 2 + 1;
  }

  private getRightChildIndex(nodeIndex: number): number {
    return nodeIndex * 2 + 2;
  }
}
