import { createBitAccessor } from '../createBitAccessor';

describe('Test createBitAccessor', () => {
  test('Simple test', () => {
    const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));
    expect(bitAccessor.get(0, 1)).toBe(1); // 1
    bitAccessor.set(0, 1, 0);
    expect(bitAccessor.get(0, 1)).toBe(0); // 0
  });
});
