export const enumerate = <T = unknown>(collection: Iterable<T>): IterableIterator<[number, T]> => {
  const iterator = collection[Symbol.iterator]();
  let counter = 0;
  return {
    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this;
    },
    next: () => {
      const { value, done } = iterator.next();

      const res = {
        value: [counter, value] as [number, T],
        done: done,
      };

      counter++;

      return res;
    },
  };
};
