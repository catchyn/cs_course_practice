function seq(...arr: Iterable<any>[]): IterableIterator<any> {
  let i = 0;
  let iter: Iterator<any> | undefined = arr.length ? arr[i][Symbol.iterator]() : undefined;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (!iter) {
        return {
          done: true,
          value: undefined,
        };
      }
      const { done, value } = iter.next();
      if (done) {
        if (i + 1 >= arr.length) {
          return {
            done: true,
            value: undefined,
          };
        } else {
          i++;
          iter = arr[i][Symbol.iterator]();
          return this.next();
        }
      }

      return {
        done: false,
        value: value,
      };
    },
  };
}

export { seq };
