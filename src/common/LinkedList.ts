export class LinkNode<T> {
  value: T;
  next: LinkNode<T> | null = null;
  prev: LinkNode<T> | null = null;

  constructor(data: T) {
    this.value = data;
  }
}

export class LinkedList<T> {
  first: LinkNode<T> | null = null;
  last: LinkNode<T> | null = null;

  isEmpty() {
    return this.first === null;
  }

  addLast(value: T): void {
    const node = new LinkNode(value);
    if (this.isEmpty()) {
      this.first = node;
    } else if (this.last) {
      this.last.next = node;
      node.prev = this.last;
    }
    this.last = node;
  }

  /**
   * Добавление элемента в начало.
   * @param value
   */
  addFirst(value: T): void {
    const node = new LinkNode(value);
    if (this.isEmpty()) {
      this.last = node;
    } else if (this.first) {
      node.next = this.first;
      this.first.prev = node;
    }
    this.first = node;
  }

  removeFirst(): LinkNode<T> {
    const elem = this.first;

    if (this.isEmpty()) {
      throw new Error('Attempt to remove item from an empty array');
    }

    if (this.first?.next === null) {
      this.first = null;
      this.last = null;
    } else if (this.first) {
      this.first.next.prev = null;
      this.first = this.first.next;
    }
    return elem as LinkNode<T>;
  }

  removeLast(): LinkNode<T> {
    const elem = this.last;

    if (this.isEmpty()) {
      throw new Error('Attempt to remove item from an empty array');
    }

    if (this.last?.prev === null) {
      this.first = null;
      this.last = null;
    } else if (this.last) {
      this.last.prev.next = null;
      this.last = this.last.prev;
    }
    return elem as LinkNode<T>;
  }

  insertAfter(keyValue: T, value: T): boolean {
    let current = this.first;
    while (current?.value !== keyValue) {
      if (!current) {
        return false;
      }
      current = current.next;
    }
    if (!current.next) {
      this.addLast(value);
    } else {
      const node = new LinkNode(value);
      node.next = current.next;
      current.next.prev = node;
      node.prev = current;
      current.next = node;
    }
    return true;
  }

  deleteKey(keyValue: T): LinkNode<T> | null {
    let current = this.first;
    while (current?.value !== keyValue) {
      if (!current) {
        return null;
      }
      current = current.next;
    }
    if (current === this.last) {
      this.removeLast();
    } else if (current === this.first) {
      this.removeFirst();
    } else {
      current.next && (current.next.prev = current.prev);
      current.prev && (current.prev.next = current.next);
    }
    return current;
  }

  display() {
    let current = this.first,
      str = '';
    while (current != null) {
      str = str + current.value + ', ';
      current = current.next;
    }
    console.log(str);
  }

  [Symbol.iterator]() {
    let current = this.first;
    return {
      next() {
        if (!current) {
          return {
            done: true,
          };
        } else {
          const value = current;
          current = current.next;
          return {
            done: false,
            value: value,
          };
        }
      },
    };
  }
}
