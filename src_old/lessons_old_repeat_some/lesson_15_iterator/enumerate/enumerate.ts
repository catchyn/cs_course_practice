function enumerate<T>(iter: Iterable<T>): IterableIterator<readonly [number, T]> {
  let count = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = iter[Symbol.iterator]().next();

      if (done) {
        return {
          value: undefined,
          done: true,
        };
      }

      const res = {
        value: [count, value] as const,
        done: false,
      };
      count++;
      return res;
    },
  };
}

export { enumerate };
