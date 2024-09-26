export const mapSeq = <T = unknown>(
  collection: Iterable<T>,
  mappers: ((elem: T) => T)[],
): IterableIterator<T> => {
  const iterator = collection[Symbol.iterator]();
  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },
    next: () => {
      const { value, done } = iterator.next();

      if (done) {
        return {
          value: value,
          done,
        };
      }

      let resValue = value;
      for (const mapFn of mappers) {
        resValue = mapFn(resValue);
      }

      return {
        value: resValue,
        done: false,
      };
    },
  };
};
