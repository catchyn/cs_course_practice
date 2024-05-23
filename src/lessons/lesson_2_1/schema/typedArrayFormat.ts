import { TypedArray } from '../../lesson_1/createBitGetter/types/TypedArray';

export const typedArrayFormat = (array: TypedArray) => {
  let result = '';
  array.forEach((value, i) => {
    result += '/' + i + ':' + value.toString(2);
  });
  return result;
};
