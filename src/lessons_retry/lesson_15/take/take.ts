function take<T>(iter: Iterable<T>, limit: number): IterableIterator<T> {
  let cursor = 1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { done, value } = iter[Symbol.iterator]().next();

      if (done) {
        return {
          value: undefined,
          done,
        };
      }

      const res = {
        value,
        done: cursor > limit,
      };
      cursor++;
      return res;
    },
  };
}

export { take };
