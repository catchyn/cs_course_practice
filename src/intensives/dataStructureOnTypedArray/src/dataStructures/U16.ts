import { DataStructure } from './DataStructure';

export const U16: DataStructure<number> = {
  get byteLength() {
    return 2;
  },
  alignment: 2,
  init(buffer: ArrayBufferLike, offset) {
    const array = new Uint16Array(buffer, offset, 1);
    return {
      set: (value) => {
        array[0] = value;
      },
      get: () => {
        return array[0];
      },
    };
  },
};
