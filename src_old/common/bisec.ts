/**
 * Находит первый индекс элемента.
 *
 * @param array отсортированный массив
 * @param comparator функция определения целевого элемента
 */
export function bisecLeft<T>(array: T[], comparator: (el: T) => number): number {
  let start = 0,
    end = array.length;

  while (start < end) {
    const middleIndex = searchMiddleIndex(start, end);
    const compareResult = comparator(array[middleIndex]);
    if (compareResult === 0) {
      return middleIndex;
    } else if (compareResult < 0) {
      start = middleIndex + 1;
    } else {
      end = middleIndex;
    }
  }

  return -1;
}

/**
 * Находит последний индекс элемента.
 *
 * @param array отсортированный массив
 * @param comparator функция определения целевого элемента
 */
export function bisecRight<T>(array: T[], comparator: (el: T) => number): number | null {
  let start = 0,
    end = array.length;

  while (start < end) {
    const middleIndex = searchMiddleIndex(start, end);
    const compareResult = comparator(array[middleIndex]);
    if (compareResult <= 0) {
      start = middleIndex + 1;
    } else if (compareResult > 0) {
      end = middleIndex;
    }
  }

  return start === array.length ? -1 : start - 1;
}

function searchMiddleIndex(start: number, end: number) {
  return Math.floor((end - start) / 2) + start;
}
