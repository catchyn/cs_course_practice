import { unicodeIterator } from './unicodeIterator';

const flagRegexp = /\ud83c[\udde6-\uddff]/;
const combiningDiacriticalMarks =
  /[\u0300\u0334\u0339\u0340\u0342\u0346\u034B\u034F\u0350\u0358\u035C\u0363]/;
const zwj = /\u200D/;
const skinTones = /\ud83c[\udffb-\udfff]/;
const keycap = /\u20e3/;
const vs16 = /\uFE0F/;
const hairColor = /\ud83e[\uddb0-\uddb3]/;

type SymbolType = SpecSymbolType | 'symbol';

type SpecSymbolType =
  | 'flag'
  | 'combiningDiacriticalMarks'
  | 'zwj'
  | 'skinTones'
  | 'keycap'
  | 'hairColor'
  | 'vs16';
type SymbolData = { type: SymbolType; regexp: RegExp | undefined; nextTypes: SymbolType[] };
const ssTypeMap: {
  [k in SymbolType]: SymbolData;
} = {
  symbol: {
    type: 'symbol',
    regexp: undefined,
    nextTypes: ['combiningDiacriticalMarks', 'vs16', 'keycap', 'skinTones', 'zwj'],
  },
  flag: {
    type: 'flag',
    regexp: flagRegexp,
    nextTypes: ['flag'],
  },
  combiningDiacriticalMarks: {
    type: 'combiningDiacriticalMarks',
    regexp: combiningDiacriticalMarks,
    nextTypes: [],
  },
  zwj: {
    type: 'zwj',
    regexp: zwj,
    nextTypes: ['symbol'],
  },
  skinTones: {
    type: 'skinTones',
    regexp: skinTones,
    nextTypes: ['zwj'],
  },
  keycap: {
    type: 'keycap',
    regexp: keycap,
    nextTypes: ['zwj', 'hairColor'],
  },
  hairColor: {
    type: 'hairColor',
    regexp: hairColor,
    nextTypes: ['zwj'],
  },
  vs16: {
    type: 'vs16',
    regexp: vs16,
    nextTypes: ['zwj', 'hairColor', 'keycap'],
  },
};

const isSimpleSymbol = (ch: string): boolean => {
  return !Object.values(ssTypeMap)
    .filter(({ regexp }) => Boolean(regexp))
    .some(({ regexp }) => regexp.test(ch));
};
const isFlag = (ch: string): boolean => {
  return ssTypeMap.flag.regexp.test(ch);
};
const getUnicodeSymbolData = (ch: string): SymbolData | undefined => {
  if (isSimpleSymbol(ch)) {
    return ssTypeMap.symbol;
  }

  return Object.values(ssTypeMap)
    .filter(({ regexp }) => Boolean(regexp))
    .find(({ regexp }) => regexp.test(ch));
};

export const complexUnicodeIterator = (str: string) => {
  const graphemes = [];
  const unicodeSymbols = [...unicodeIterator(str)];
  for (let i = 0; i < unicodeSymbols.length; i++) {
    const symbols = [unicodeSymbols[i]];
    let j = i + 1;
    if (!isSimpleSymbol(symbols[0]) && !isFlag(symbols[0])) {
      throw new Error(`Строка некорректна - символ: ${symbols[0]} номер ${i}`);
    }

    while (j < unicodeSymbols.length) {
      const nextSymbol = unicodeSymbols[j];
      const nextSymbolData = getUnicodeSymbolData(nextSymbol);
      const symbolData = getUnicodeSymbolData(symbols[symbols.length - 1]);
      if (symbolData?.nextTypes.includes(nextSymbolData?.type)) {
        symbols.push(nextSymbol);
        j++;
      } else {
        i = j - 1;
        break;
      }
    }

    graphemes.push(symbols.join(''));

    // дошли до конца строки
    if (j >= unicodeSymbols.length) {
      break;
    }
  }
  return graphemes;
};
