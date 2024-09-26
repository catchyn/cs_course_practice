export const unicodeIterator = (str: string) => {
  return {
    [Symbol.iterator]() {
      const pointer = { value: 0 };
      return {
        next: function () {
          const value = unicodeSymbol(str, pointer);
          const done = pointer.value === str.length;
          pointer.value = pointer.value + 1;
          return {
            value,
            done,
          };
        },
      };
    },
  };
};

const unicodeSymbol = (str: string, pointer: { value: number }) => {
  // проверяем на младшего суррогата
  const surrogatePair = getSurrogatePairSymbol(str, pointer);
  if (surrogatePair) {
    return surrogatePair;
  }
  return str[pointer.value];
};

const getSurrogatePairSymbol = (str: string, pointer: { value: number }): string => {
  const isHighSurr = isInSequence(str[pointer.value], [
    '\uD800'.charCodeAt(0),
    '\uDBFF'.charCodeAt(0),
  ]);
  if (!isHighSurr) {
    return '';
  }
  const nextPointer = pointer.value + 1;
  const isLowSurr = isInSequence(str[nextPointer], [
    '\uDC00'.charCodeAt(0),
    '\uDFFF'.charCodeAt(0),
  ]);
  if (str[nextPointer] && isLowSurr) {
    const result = `${str[pointer.value]}${str[nextPointer]}`;
    pointer.value = pointer.value + 1;
    return result;
  }
  return '';
};

const isInSequence = (
  ch: string | undefined,
  [start, end]: [start: number, end: number],
): boolean => {
  return ch && ch.charCodeAt(0) >= start && ch.charCodeAt(0) <= end;
};
