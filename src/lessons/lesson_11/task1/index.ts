const isDigit = (str: string): boolean => {
  if (!str) {
    return false;
  }

  if (isArabicDigit(str[0])) {
    return isArabicDigit(str);
  }

  if (isRomainDigit(str[0])) {
    return isRomainDigit(str);
  }

  return false;
};

/**
 * Проверяет {@param str} на соответствие арабскому числу.
 * Если каждый символ является цифрой т.е. лежит в диапазоне от 30 до 39. Отрицательные числа и с плавающей точкой не рассматриваем.
 * @param str
 */
const isArabicDigit = (str: string): boolean => {
  for (let i = 0; i < str.length; i++) {
    const codePoint = str.codePointAt(i) as number;
    if (codePoint < 0x0030 || codePoint > 0x0039) {
      return false;
    }
  }
  return true;
};

/**
 * Проверяет {@param str} на соответствие римскому числу.
 * Не учитываем малый регистр и устаревшие символы. Не валидируем число по правилам записи римских чисел.
 * @param str
 */
const isRomainDigit = (str: string): boolean => {
  for (let i = 0; i < str.length; i++) {
    const codePoint = str.codePointAt(i) as number;
    if (!isSpecialRomainCodePoint(codePoint) && !isSimpleRomainCodePoint(codePoint)) {
      return false;
    }
  }
  return true;
};

const isSpecialRomainCodePoint = (codePoint: number) => {
  return codePoint >= 0x2160 && codePoint <= 0x216f;
};

const isSimpleRomainCodePoint = (codePoint: number) => {
  return simpleRomainCodePoints.includes(codePoint);
};
const simpleRomainCodePoints = ['V', 'I', 'X', 'L', 'C', 'D', 'M'].map(
  (ch) => ch.codePointAt(0) as number,
);

const iter = (str: string) => {
  return {
    *[Symbol.iterator]() {
      for (let i = 0; i < str.length; i++) {
        const targetCharCode = (str[i] as string).charCodeAt(0) as number;

        if (isNaN(targetCharCode)) {
          yield '';
          continue;
        }

        if (!isSurrogate(targetCharCode)) {
          const [grapheme, num] = addDiacriticalElements(str, i);
          i = num;
          yield grapheme;
          continue;
        }

        if (isHighSurrogate(targetCharCode)) {
          if (str.length <= i + 1) {
            throw Error('Отсутствует пара для старшего суррогата');
          } else if (isLowSurrogate((str[i + 1] as string).charCodeAt(0) as number)) {
            yield str[i] + str[i + 1];
            i++;
          } else {
            throw Error('Отсутствует младший суррогат для старшего суррогата');
          }
        }

        if (isLowSurrogate(targetCharCode)) {
          if (str.length <= i + 1) {
            throw Error('Отсутствует пара для старшего суррогата');
          } else if (isHighSurrogate((str[i + 1] as string).charCodeAt(0) as number)) {
            yield str[i] + str[i + 1];
            i++;
          } else {
            throw Error('Отсутствует младший суррогат для старшего суррогата');
          }
        }
      }
    },
  };
};

const addDiacriticalElements = (str: string, i: number): [string, number] => {
  const targetCharCode = str[i].charCodeAt(0);

  if (isNaN(targetCharCode)) {
    throw Error('Символ отсутствует');
  }

  let resultStr = str[i],
    j = i + 1;
  for (; j < str.length; j++) {
    if (!isDiacriticalSymbol(str.charCodeAt(j))) {
      break;
    }
    resultStr += str.charAt(j);
  }

  return [resultStr, j - 1];
};

const isSurrogate = (utf16code: number) => utf16code >= 0xd800 && utf16code <= 0xdfff;
const isHighSurrogate = (utf16code: number) => utf16code >= 0xd800 && utf16code <= 0xdbff;
const isLowSurrogate = (utf16code: number) => utf16code >= 0xdc00 && utf16code <= 0xdfff;
const isDiacriticalSymbol = (utf16code: number) => utf16code >= 0x0300 && utf16code <= 0x036f;

console.log([...iter('😀\u2661\u0300')]);
console.log([...iter('1😃à🇷🇺')]); // ['1', '😃', 'à'']);
// console.log([...iter('1😃à🇷🇺👩🏽‍❤️‍💋‍👨')]) // ['1', '😃', 'à', '🇷🇺', '👩🏽‍❤️‍💋‍👨']);

console.log(isDigit('123')); // true
console.log(isDigit('\u216F\u2165')); // true
console.log(isDigit('MMMDCCCXLIV')); // true
console.log(isDigit('12345F')); // false
console.log(isDigit('\u216F\u2165\u1111')); // false
console.log(isDigit('MMMDCCCXLIVU')); // false
