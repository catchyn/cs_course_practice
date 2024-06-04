export class Stack<T> {
  array: T[];
  constructor(array?: T[]) {
    this.array = array ?? [];
  }

  push(value: T): void {
    this.array.push(value);
  }

  pop(): T {
    return this.array.pop();
  }

  size() {
    return this.array.length;
  }

  peek(): T {
    return this.array.at(-1);
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}
