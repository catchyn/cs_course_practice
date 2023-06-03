export const zip = (...args: Iterable<unknown>[]): IterableIterator<unknown> => {
  const iterators: Iterator<unknown>[] = [];
  for (const arg of args) {
    iterators.push(arg[Symbol.iterator]());
  }

  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: () => {
      if (iterators.length < 1) {
        return {
          value: undefined,
          done: true,
        };
      }

      const result = [];
      for (const iterator of iterators) {
        const item = iterator.next();
        if (item.done) {
          return {
            value: undefined,
            done: true,
          };
        }
        result.push(item.value);
      }

      return {
        value: result,
        done: false,
      };
    },
  };
};
