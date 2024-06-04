import { LinkedList } from '../lesson_3/linkedList';

export class Queue<T> {
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

  pop(): T | null | void {
    if (this.list.isEmpty()) {
      throw Error('Нет элементов в очереди');
    }
    return this.list.removeHead()?.value;
  }
}
