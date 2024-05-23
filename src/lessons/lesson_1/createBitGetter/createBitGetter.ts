import { TypedArray } from './types/TypedArray';

export function createBitGetter(typedArr: TypedArray) {
  return {
    get: (element_num, bit_num_right) => {
      if (bit_num_right >= typedArr.BYTES_PER_ELEMENT * 8) {
        throw 'Incorrect bit num';
      }
      return (typedArr[element_num] & Math.pow(2, bit_num_right)) != 0 ? 1 : 0;
    },
  };
}
