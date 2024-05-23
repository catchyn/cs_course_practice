function mapSeq<T>(arr: Iterable<T>, funcs: ((item: T) => T)[]): IterableIterator<T> {
  const iter = arr[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = iter.next();

      if (done) {
        return {
          done,
          value: undefined,
        };
      }

      let evaluateValue = value;
      funcs.forEach((fn) => {
        evaluateValue = fn(evaluateValue);
      });

      return {
        value: evaluateValue,
        done: false,
      };
    },
  };
}

export { mapSeq };
