function zip(...arr: Iterable<any>[]): IterableIterator<any> {
  const iterList = arr.map((iterable) => iterable[Symbol.iterator]());
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const values = [];
      for (const iter of iterList) {
        const { value, done } = iter.next();
        if (done) {
          return {
            done,
            value: undefined,
          };
        }
        values.push(value);
      }

      return {
        value: values,
        done: false,
      };
    },
  };
}

export { zip };
