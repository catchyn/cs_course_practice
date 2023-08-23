function filter<T>(iter: Iterable<T>, cb: (value: T) => boolean): IterableIterator<T> {
  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let iterElement;

      do {
        iterElement = iter[Symbol.iterator]().next();

        if (iterElement.done) {
          return {
            value: undefined,
            done: true,
          };
        }
      } while (!cb(iterElement.value));

      return {
        value: iterElement.value,
        done: false,
      };
    },
  };
}

export { filter };
