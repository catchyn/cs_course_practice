import { TypedArray } from '../types/TypedArray';
import { TypedArrayMap } from '../types/TypedArrayMap';

export const typedArrayMap: { [key in TypedArray]: (size: number) => TypedArrayMap[key] } = {
  Int8Array: (size: number) => new Int8Array(size),
  Uint8Array: (size: number) => new Uint8Array(size),
  Uint8ClampedArray: (size: number) => new Uint8ClampedArray(size),
  Int16Array: (size: number) => new Int16Array(size),
  Uint16Array: (size: number) => new Uint16Array(size),
  Int32Array: (size: number) => new Int32Array(size),
  Uint32Array: (size: number) => new Uint32Array(size),
  Float32Array: (size: number) => new Float32Array(size),
  Float64Array: (size: number) => new Float64Array(size),
};
