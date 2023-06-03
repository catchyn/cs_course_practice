/**
 *
 * @param iter
 * @param callback
 */
export const filter = <T>(
  iter: Iterator<T>,
  callback: (item: T) => boolean,
): IterableIterator<T> => {
  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      let { value: current, done } = iter.next();

      while (!callback(current) && !done) {
        const next = iter.next();
        current = next.value;
        done = next.done;
      }

      return {
        value: current,
        done: done,
      };
    },
  };
};
