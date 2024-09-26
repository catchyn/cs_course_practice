export const zip = (...iterablesData: Iterable<unknown>[]): IterableIterator<unknown> => {
  const iterables: Iterator<unknown>[] = [];
  for (const iterable of iterablesData) {
    iterables.push(iterable[Symbol.iterator]());
  }
  const empty = null;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const values = [];
      const doneList = [];
      for (const iterable of iterables) {
        const { value, done } = iterable.next();
        doneList.push(done);
        values.push(done ? empty : value);
      }
      if (doneList.every((done) => done)) {
        return {
          value: undefined,
          done: true,
        };
      }

      return {
        value: values,
        done: false,
      };
    },
  };
};
