export const isDigit = (str: string) => {
  if (!str) return false;
  for (const numeralFunc of [isArabianDigit, isRomanDigit]) {
    if (numeralFunc(str)) {
      return true;
    }
  }
  return false;
};

const isArabianDigit = (str: string): boolean => {
  const codePointStart = '\x30'.charCodeAt(0);
  const codePointEnd = '\x39'.charCodeAt(0);
  return checkUninterruptedSequence(str, [[codePointStart, codePointEnd]]);
};

const isRomanDigit = (str: string): boolean => {
  const codePointStart = '\u2160'.charCodeAt(0);
  const codePointEnd = '\u2188'.charCodeAt(0);
  return checkUninterruptedSequence(str, [[codePointStart, codePointEnd]]);
};

export const checkUninterruptedSequence = (
  str: string,
  intervals: [start: number, end: number][],
) => {
  for (const ch of str) {
    let isIn = false;
    for (const [start, end] of intervals) {
      if (ch.codePointAt(0) >= start && ch.codePointAt(0) <= end) {
        isIn = true;
        break;
      }
    }
    if (!isIn) {
      return false;
    }
  }
  return true;
};
