export class Stack<T> {
  array: T[] = [];

  constructor(array?: T[]) {
    this.array = array || [];
  }

  push(value: T) {
    this.array.push(value);
  }

  pop(): T {
    return this.array.pop();
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return;
    }
    return this.array[this.array.length - 1];
  }
}
