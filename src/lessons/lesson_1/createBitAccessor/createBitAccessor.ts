import { TypedArray } from '../createBitGetter/types/TypedArray';

export function createBitAccessor(typedArr: TypedArray) {
  return {
    set: (element_num: number, bit_num_right: number, value: 0 | 1) => {
      if (bit_num_right >= typedArr.BYTES_PER_ELEMENT * 8) {
        throw 'Incorrect bit num';
      }
      if (value === 1) {
        typedArr[element_num] = typedArr[element_num] | Math.pow(2, bit_num_right);
      } else {
        typedArr[element_num] = typedArr[element_num] & ~Math.pow(2, bit_num_right);
      }
    },
    get: (element_num, bit_num_right) => {
      if (bit_num_right >= typedArr.BYTES_PER_ELEMENT * 8) {
        throw 'Incorrect bit num';
      }
      return (typedArr[element_num] & Math.pow(2, bit_num_right)) != 0 ? 1 : 0;
    },
  };
}
