export const enumerate = <T>(iter: Iterator<T, T>): IterableIterator<[number, T]> => {
  let index = 0;

  return {
    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this;
    },
    next(): IteratorResult<[number, T]> {
      const current = iter.next();

      const res = {
        value: [index, current.value] as [number, T],
        done: current.done,
      };

      index++;

      return res;
    },
  };
};
