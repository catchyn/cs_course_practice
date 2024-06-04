import { LinkedList } from '../lesson_3/linkedList';

export class Dequeue<T> {
  protected list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList();
  }

  push(value: T): void {
    this.list.addTail(value);
  }

  get head(): T | null {
    return this.list.head?.value ?? null;
  }

  get tail(): T | null {
    return this.list.tail?.value ?? null;
  }

  pop(): T | null | void {
    if (this.list.isEmpty()) {
      throw Error('Нет элементов в очереди');
    }
    return this.list.removeTail()?.value ?? null;
  }

  unshift(value: T): void {
    this.list.addHead(value);
  }

  shift(): T | null | void {
    if (this.list.isEmpty()) {
      throw Error('Нет элементов в очереди');
    }
    return this.list.removeHead()?.value ?? null;
  }
}
