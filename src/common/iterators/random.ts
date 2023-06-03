/**
 * Итератор случайных чисел
 * @param from
 * @param to
 */
export const random = (from: number, to: number): Iterator<number> => {
  return {
    next() {
      const randomNumber = Math.round(from + Math.random() * (to - from));
      return {
        value: randomNumber,
        done: false,
      };
    },
  };
};
