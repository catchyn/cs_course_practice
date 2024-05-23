export const mapSeq = <T>(
  obj: Iterable<T>,
  funcArray: Iterable<(el: T) => T>,
): IterableIterator<T> => {
  const innerIterator = obj[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const funcArrayIterator = funcArray[Symbol.iterator]();
      const innerResult = innerIterator.next();
      if (innerResult.done) {
        return innerResult;
      }

      let funcResult = funcArrayIterator.next();
      let value = innerResult.value;
      while (!funcResult.done) {
        value = funcResult.value(value);
        funcResult = funcArrayIterator.next();
      }

      return {
        value: value,
        done: false,
      };
    },
  };
};
