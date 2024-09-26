export const randomInt = (from: number, to: number): IterableIterator<number | undefined> => {
  if (from > to) {
    throw new Error('Некорректный диапазон значений');
  }
  return {
    [Symbol.iterator](): IterableIterator<number | undefined> {
      return this;
    },
    next: () => {
      return {
        value: from + Math.round(Math.random() * (to - from)),
        done: false,
      };
    },
  };
};
