import { LinkedList } from './LinkedList';

export class Dequeue<T> {
  #list = new LinkedList<T>();

  push(value: T) {
    this.#list.addLast(value);
  }

  pop(): T | null {
    const node = this.#list.removeLast();
    return node.value;
  }

  shift(): T | null {
    const node = this.#list.removeFirst();
    return node.value;
  }

  unshift(value: T) {
    this.#list.addFirst(value);
  }
}
