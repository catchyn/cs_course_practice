// https://www.youtube.com/watch?v=S2I0covkyMc
export function searchKMP(str: string, substr: string): boolean {
  if (substr.length < 1) {
    throw new Error('Пустая строка для поиска');
  }
  const pi = getPiArray(substr);
  let pointer = 0,
    substrPointer = 0;
  while (pointer < str.length) {
    if (str[pointer] === substr[substrPointer]) {
      pointer++;
      substrPointer++;
      if (substrPointer >= substr.length) {
        return true;
      }
    } else {
      if (substrPointer === 0) {
        pointer++;
      } else {
        substrPointer = pi[substrPointer - 1];
      }
    }
  }
  return false;
}

export function getPiArray(str: string): number[] {
  const pi = new Array(str.length);

  pi[0] = 0;
  if (str.length < 2) {
    return pi;
  }

  let pointer = 1,
    prefixPointer = 0;
  while (pointer < str.length) {
    if (str[pointer] === str[prefixPointer]) {
      pi[pointer] = prefixPointer + 1;
      pointer++;
      prefixPointer++;
    } else {
      if (prefixPointer === 0) {
        pi[pointer] = 0;
        pointer++;
      } else {
        prefixPointer = pi[prefixPointer - 1];
      }
    }
  }

  return pi;
}
