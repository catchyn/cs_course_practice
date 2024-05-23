/**
 * Взять {@param n} элементов итератора
 * @param iter
 * @param n
 */
export const take = <T>(iter: Iterator<T>, n: number): IterableIterator<T> => {
  let count = 0;

  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      const res = {
        value: iter.next().value,
        done: n === count,
      };

      count++;

      return res;
    },
  };
};
