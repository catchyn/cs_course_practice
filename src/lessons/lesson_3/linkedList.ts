export class LinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  addTail(item: T) {
    const newNode = new Node(item, this.tail, this.head);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.head.prev = this.tail;
  }
  addHead(item: T) {
    const newNode = new Node(item, this.tail, this.head);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.head.prev = newNode;
    this.head = newNode;
    this.tail.next = newNode;
  }
  add(item: T) {
    this.addTail(item);
  }
  removeHead(): Node<T> | null {
    const head = this.head;
    if (this.head !== this.tail) {
      this.tail.next = this.head.next;
      this.head = this.head.next;
      this.head.prev = this.tail;
    } else if (this.head) {
      this.head = null;
      this.tail = null;
    }
    return head;
  }
  removeTail() {
    const tail = this.tail;
    if (this.tail !== this.head) {
      this.head.prev = this.tail.prev;
      this.tail = this.tail.prev;
      this.tail.next = this.head;
    } else if (this.tail) {
      this.tail = null;
      this.head = null;
    }
    return tail;
  }
  isEmpty() {
    return this.head === null;
  }
  get first(): Node<T> | null {
    return this.head;
  }
  get last(): Node<T> | null {
    return this.tail;
  }
  [Symbol.iterator]() {
    let current = this.head;
    let isLast = false;
    return {
      next: () => {
        if (!current || isLast) {
          return { done: true };
        }
        if (current === this.tail) {
          isLast = true;
        }
        const value = current.value;
        current = current.next;
        return { value, done: false };
      },
    };
  }
}

class Node<T> {
  value: T | null;
  prev: Node<T | null>;
  next: Node<T | null>;

  constructor(value: T, prev: Node<T> | null, next: Node<T> | null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
