import { createBitGetter } from '../createBitGetter';

describe('Test createBitGetter', () => {
  test('Simple test', () => {
    const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));
    expect(bitGetter.get(0, 1)).toBe(1); // 1
    expect(bitGetter.get(1, 1)).toBe(0); // 0
  });
});
