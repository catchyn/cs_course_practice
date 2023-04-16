/**
 * Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента.
 */
import {BitAccessorUint8Array} from "../common/bitAccessorUint8Array";

const createBitGetter = (uint8Array: Uint8Array) => {
  return new BitAccessorUint8Array(uint8Array);
};

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

////////////// TASK 2 ///////////////

const createBitAccessor = (uint8Array: Uint8Array) => {
  return new BitAccessorUint8Array(uint8Array);
};

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
bitAccessor.set(0, 1, 0); //
console.log(bitAccessor.get(0, 1)); // 0

console.log(bitAccessor.get(0, 7)); // 0
bitAccessor.set(0, 7, 1); //
console.log(bitAccessor.get(0, 7)); // 1
