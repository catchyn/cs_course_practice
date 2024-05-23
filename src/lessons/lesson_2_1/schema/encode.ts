import { createBitAccessor } from '../../lesson_1/createBitAccessor/createBitAccessor';

export type ASCII = string;

export const BITS_PER_ELEMENT = Uint8Array.BYTES_PER_ELEMENT * 8;

export const encode = (
  data: (ASCII | number | boolean)[],
  scheme: [number, 'ascii' | 'number' | 'boolean'][],
) => {
  const array: Uint8Array = getTypedArray(scheme);
  encodeData(data, scheme, array);
  return array.buffer;
};

const getTypedArray = (scheme: [number, 'ascii' | 'number' | 'boolean'][]) => {
  const bits = scheme.reduce((acc, item) => acc + item[0], 0);
  return new Uint8Array(Math.floor(bits / BITS_PER_ELEMENT) + (bits % BITS_PER_ELEMENT ? 1 : 0));
};

const encodeData = (
  data: (ASCII | number | boolean)[],
  scheme: [number, 'ascii' | 'number' | 'boolean'][],
  array: Uint8Array,
) => {
  if (data.length !== scheme.length) {
    fireError();
  }
  let count = 0,
    pointer = 0;
  const bitAccessor = createBitAccessor(array);
  for (const [bitNums, dataType] of scheme) {
    if (dataType === 'ascii') {
      const value = data[count];
      if (!isAscii(value)) {
        fireError(count);
        return;
      }
      pointer = encodeAscii(bitAccessor, pointer, bitNums, value);
    } else if (dataType === 'number') {
      const value = data[count];
      if (!isNumber(value)) {
        fireError(count);
        return;
      }
      pointer = encodeNumber(bitAccessor, pointer, bitNums, value);
    } else if (dataType === 'boolean') {
      const value = data[count];
      if (!isBoolean(value)) {
        fireError(count);
        return;
      }
      pointer = encodeBoolean(bitAccessor, pointer, value);
    } else {
      fireError();
      return;
    }
    count++;
  }
};

export const isBoolean = (value: any): value is boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isAscii = (value: any): value is ASCII => {
  if (typeof value !== 'string') {
    return false;
  }
  for (const ch of value) {
    if (ch.charCodeAt(0) > 127) {
      return false;
    }
  }

  return true;
};

const encodeAscii = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  bitNums: number,
  str: ASCII,
): number => {
  let row,
    col,
    code = str.charCodeAt(0),
    chIdx = 0;
  for (let i = 0; i < bitNums; i++) {
    if (i % BITS_PER_ELEMENT === 0 && i > 0) {
      chIdx++;
      code = str.charCodeAt(chIdx);
    }
    row = Math.floor(pointer / BITS_PER_ELEMENT);
    col = pointer % BITS_PER_ELEMENT;
    bitAccessor.set(row, col, getBit(code, i % BITS_PER_ELEMENT));
    pointer++;
  }
  return pointer;
};

const encodeNumber = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  bitNums: number,
  num: number,
): number => {
  let row, col;
  for (let i = 0; i < bitNums; i++) {
    row = Math.floor(pointer / BITS_PER_ELEMENT);
    col = pointer % BITS_PER_ELEMENT;
    bitAccessor.set(row, col, getBit(num, i));
    pointer++;
  }
  return pointer;
};

const encodeBoolean = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  value: boolean,
): number => {
  const row = Math.floor(pointer / BITS_PER_ELEMENT);
  const col = pointer % BITS_PER_ELEMENT;
  bitAccessor.set(row, col, value ? 1 : 0);
  pointer++;
  return pointer;
};

export const getBit = (data, bit_num_right) => {
  return (data & Math.pow(2, bit_num_right)) != 0 ? 1 : 0;
};

export const fireError = (count?: number) => {
  if (count !== undefined) {
    throw new Error(`Данные не соответствуют схеме, элемент ${count}`);
  }
  throw new Error('Данные не соответствуют схеме');
};
