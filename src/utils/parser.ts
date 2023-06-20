export const createIterableIterator = <T>(iter: Iterator<T> | Iterable<T>): IterableIterator<T> => {
  if (typeof (iter as Iterable<T>)[Symbol.iterator] === 'function') {
    const newIter = (iter as Iterable<T>)[Symbol.iterator]();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        return newIter.next();
      },
    };
  }

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return (iter as Iterator<T>).next();
    },
  };
};
