export const seq = (...args: Iterable<unknown>[]): IterableIterator<unknown> => {
  const argsIterator = args[Symbol.iterator]();
  let arg = argsIterator.next(),
    argIterator: Iterator<unknown>;
  if (arg.value) {
    argIterator = arg.value[Symbol.iterator]();
  }

  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: () => {
      if (arg.done) {
        return {
          value: undefined,
          done: true,
        };
      }

      let item = argIterator.next();

      if (item?.done) {
        arg = argsIterator.next();
        if (arg.done) {
          return {
            value: undefined,
            done: true,
          };
        }
        argIterator = arg.value[Symbol.iterator]();
        item = argIterator.next();
      }

      return {
        value: item?.value,
        done: false,
      };
    },
  };
};
