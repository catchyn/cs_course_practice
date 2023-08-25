function toIterable<T>(iter: Iterator<T>): IterableIterator<T> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iter.next();
    },
  };
}

export { toIterable };
