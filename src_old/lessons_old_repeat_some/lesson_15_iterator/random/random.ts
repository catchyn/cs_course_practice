function random(start: number, end: number): IterableIterator<number> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = Math.round(start + Math.random() * (end - start));
      return {
        value,
        done: false,
      };
    },
  };
}

export { random };
