function toIterable<T>(iter: Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return iter.next();
        },
      };
    },
  };
}

function toIterableIterator<T>(iterable: Iterable<T> | IterableIterator<T>): IterableIterator<T> {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}

function toIterableIteratorBuffer<T>(iterable: Iterable<T>, buffer: any[]): IterableIterator<T> {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const next = iterator.next();
      if (!next.done) {
        buffer.push(next.value);
      }
      return next;
    },
  };
}

export { toIterable, toIterableIterator, toIterableIteratorBuffer };
