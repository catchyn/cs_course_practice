function take<T>(iter: Iterable<T>, limit: number): IterableIterator<T> {
  const takeIter = iter[Symbol.iterator]();
  let cursor = 1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { done, value } = takeIter.next();

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
