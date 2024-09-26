export const take = <T = unknown>(collection: Iterable<T>, limit: number): IterableIterator<T> => {
  const iterator = collection[Symbol.iterator]();
  let counter = 0;
  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },
    next: () => {
      const { value, done } = iterator.next();

      const res = {
        value: counter < limit ? value : undefined,
        done: done || counter >= limit,
      };

      if (counter < limit) {
        counter++;
      }

      return res;
    },
  };
};
