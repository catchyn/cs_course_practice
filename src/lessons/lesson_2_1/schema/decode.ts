import { createBitAccessor } from '../../lesson_1/createBitAccessor/createBitAccessor';
import { BITS_PER_ELEMENT, fireError } from './encode';

export const decode = (
  buffer: ArrayBufferLike,
  scheme: [number, 'ascii' | 'number' | 'boolean'][],
): any[] => {
  const array = new Uint8Array(buffer);
  return decodeData(array, scheme);
};

const decodeData = (array: Uint8Array, scheme: [number, 'ascii' | 'number' | 'boolean'][]) => {
  let pointer = 0,
    result = [];
  const bitAccessor = createBitAccessor(array);
  for (const [bitNums, dataType] of scheme) {
    if (dataType === 'ascii') {
      [pointer, result] = decodeAscii(bitAccessor, pointer, bitNums, result);
    } else if (dataType === 'number') {
      [pointer, result] = decodeNumber(bitAccessor, pointer, bitNums, result);
    } else if (dataType === 'boolean') {
      [pointer, result] = decodeBoolean(bitAccessor, pointer, result);
    } else {
      fireError();
      return;
    }
  }
  return result;
};

const decodeBoolean = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  result: any[],
): [number, any[]] => {
  const row = Math.floor(pointer / BITS_PER_ELEMENT);
  const col = pointer % BITS_PER_ELEMENT;
  const bitValue = bitAccessor.get(row, col);
  result.push(bitValue === 1);
  pointer++;
  return [pointer, result];
};

const decodeNumber = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  bitNums: number,
  result: any[],
): [number, any[]] => {
  let row,
    col,
    num = 0;
  for (let i = 0; i < bitNums; i++) {
    row = Math.floor(pointer / BITS_PER_ELEMENT);
    col = pointer % BITS_PER_ELEMENT;
    const bitValue = bitAccessor.get(row, col);
    num = setBit(num, i, bitValue);
    pointer++;
  }
  result.push(num);
  return [pointer, result];
};

const decodeAscii = (
  bitAccessor: ReturnType<typeof createBitAccessor>,
  pointer: number,
  bitNums: number,
  result: any[],
): [number, any[]] => {
  let row,
    col,
    ch = '',
    chCode = 0;
  for (let i = 0; i < bitNums; i++) {
    row = Math.floor(pointer / BITS_PER_ELEMENT);
    col = pointer % BITS_PER_ELEMENT;
    const bitValue = bitAccessor.get(row, col);
    chCode = setBit(chCode, i % 8, bitValue);
    if ((i + 1) % 8 === 0) {
      ch += String.fromCharCode(chCode);
      chCode = 0;
    }
    pointer++;
  }
  result.push(ch);
  return [pointer, result];
};

const setBit = (element: number, bit_num_right: number, value: 0 | 1) => {
  if (value === 1) {
    return element | Math.pow(2, bit_num_right);
  } else {
    return element & ~Math.pow(2, bit_num_right);
  }
};
