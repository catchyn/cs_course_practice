export const seq = (...iterables: Iterable<unknown>[]): IterableIterator<unknown> => {
  const iterableIterator = iterables[Symbol.iterator]();
  let iterableIteratorNext = iterableIterator.next();
  let iterator = undefined;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value: iterableValue, done: iterableDone } = iterableIteratorNext;

      if (iterableDone) {
        return {
          value: undefined,
          done: iterableDone,
        };
      }

      if (!iterator) {
        iterator = iterableValue[Symbol.iterator]();
      }
      const { value, done } = iterator.next();

      if (done) {
        iterableIteratorNext = iterableIterator.next();
        iterator = undefined;
        return this.next();
      }

      return {
        value,
        done: false,
      };
    },
  };
};
