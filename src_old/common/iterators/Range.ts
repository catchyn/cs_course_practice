export class Range<T extends number | string> implements IterableIterator<T> {
  #from: T;
  #to: T;
  #type: 'string' | 'number';
  #cursor: number;
  #reverseCursor: number;

  constructor(from: T, to: T) {
    this.#from = from;
    this.#to = to;
    this.#type = typeof this.#from === 'string' ? 'string' : 'number';
    this.#cursor = this.#getStartCursor();
    this.#reverseCursor = this.#getStartCursor(true);
  }

  next(): IteratorResult<T> {
    if (this.#type === 'string') {
      return this.#stringIterator();
    } else {
      return this.#numberIterator();
    }
  }

  reverse(): IterableIterator<T> {
    return {
      [Symbol.iterator](): IterableIterator<T> {
        return this;
      },
      next: () => {
        if (this.#type === 'string') {
          return this.#stringIteratorReverse();
        } else {
          return this.#numberIteratorReverse();
        }
      },
    };
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  #getStartCursor(isReverse?: boolean): number {
    const start = isReverse ? this.#to : this.#from;
    return typeof start === 'string' ? (start.codePointAt(0) as number) : (start as number);
  }

  #stringIterator(): IteratorResult<T> {
    const done = this.#cursor > ((this.#to as string).codePointAt(0) as number);

    const res: IteratorResult<T> = {
      value: String.fromCodePoint(this.#cursor) as T,
      done: done,
    };

    if (!done) {
      this.#cursor++;
    } else {
      this.#cursor = this.#getStartCursor();
    }

    return res;
  }

  #stringIteratorReverse(): IteratorResult<T> {
    const done = this.#reverseCursor < ((this.#from as string).codePointAt(0) as number);

    const res: IteratorResult<T> = {
      value: String.fromCodePoint(this.#reverseCursor) as T,
      done: done,
    };

    if (!done) {
      this.#reverseCursor--;
    } else {
      this.#reverseCursor = this.#getStartCursor(true);
    }

    return res;
  }

  #numberIterator(): IteratorResult<T> {
    const done = this.#cursor > (this.#to as number);
    const res: IteratorResult<T> = {
      value: this.#cursor as T,
      done,
    };

    if (!done) {
      this.#cursor++;
    } else {
      this.#cursor = this.#getStartCursor();
    }

    return res;
  }

  #numberIteratorReverse(): IteratorResult<T> {
    const done = this.#reverseCursor < (this.#from as number);
    const res: IteratorResult<T> = {
      value: this.#reverseCursor as T,
      done,
    };

    if (!done) {
      this.#reverseCursor--;
    } else {
      this.#reverseCursor = this.#getStartCursor(true);
    }

    return res;
  }
}
