export class Stack<T> {
  array: T[] = [];

  constructor(array?: T[]) {
    this.array = array || [];
  }

  push(value: T) {
    this.array.push(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw Error('Стек пуст');
    }
    return this.array.pop() as T;
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw Error('Стек пуст');
    }
    return this.array[this.array.length - 1];
  }
}
