export const filter = <T = unknown>(
  collection: Iterable<T>,
  fn: (elem: T) => boolean,
): IterableIterator<T> => {
  const iterator = collection[Symbol.iterator]();
  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },
    next: () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = iterator.next();

        if (done) {
          return {
            value: value,
            done,
          };
        }

        if (fn(value)) {
          return {
            value: value,
            done: false,
          };
        }
      }
    },
  };
};
