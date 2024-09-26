import { DataStructure } from './DataStructure';

export const fixedAsciiString = (maxLength: number): DataStructure<string> => ({
  get byteLength() {
    return maxLength;
  },
  init(buffer: ArrayBufferLike, offset) {
    const array = new Uint8Array(buffer, offset, maxLength);
    return {
      get() {
        let str = '';
        for (let i = 0; i < maxLength; i++) {
          if (array[i] === 0) {
            break;
          }
          str += String.fromCharCode(array[i]);
        }
        return str;
      },
      set(value) {
        const iterValue = [...value];
        for (let i = 0; i < maxLength; i++) {
          if (i >= iterValue.length) {
            array[i] = 0;
          } else {
            array[i] = iterValue[i].charCodeAt(0);
          }
        }
      },
    };
  },
});
