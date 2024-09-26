import { DataStructure } from './DataStructure';

export const U8: DataStructure<number> = {
  get byteLength() {
    return 1;
  },
  init(buffer, offset) {
    return {
      get() {
        const array = new Uint8Array(buffer, offset, 1);
        return array[0];
      },
      set(value) {
        const array = new Uint8Array(buffer, offset, 1);
        array[0] = value;
      },
    };
  },
};
