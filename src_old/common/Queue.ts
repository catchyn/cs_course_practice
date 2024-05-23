import { LinkedList, LinkNode } from './LinkedList';

export class Queue<T> {
  #list = new LinkedList<T>();
  #head: LinkNode<T> | null = null;

  get head(): T | null {
    return this.#head?.value || null;
  }

  push(value: T) {
    this.#list.addLast(value);
    this.#head = this.#list.first;
  }

  pop() {
    const node = this.#list.removeFirst();
    this.#head = this.#list.first;
    return node.value;
  }

  isEmpty(): boolean {
    return this.#head === null;
  }
}
