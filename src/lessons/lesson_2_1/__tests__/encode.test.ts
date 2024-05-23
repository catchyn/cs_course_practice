import { encode } from '../schema/encode';
import { typedArrayFormat } from '../schema/typedArrayFormat';

describe('encode', () => {
  test('should encode a string', () => {
    const schema = [
      [3, 'number'],
      [3, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
      [16, 'ascii'],
    ] satisfies [number, 'number' | 'boolean' | 'ascii'][];
    const data = encode([2, 3, true, false, 'ab'], schema);
    const result = typedArrayFormat(new Uint8Array(data));
    expect(result).toBe('/0:1011010/1:1100001/2:1100010');
  });

  test('should encode a string 2', () => {
    const schema = [
      [3, 'number'],
      [3, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
      [16, 'ascii'],
      [2, 'number'],
    ] satisfies [number, 'number' | 'boolean' | 'ascii'][];
    const data = encode([2, 3, true, false, 'ab', 3], schema);
    const result = typedArrayFormat(new Uint8Array(data));
    expect(result).toBe('/0:1011010/1:1100001/2:1100010/3:11');
  });

  test('should throw error', () => {
    const schema = [
      [3, 'number'],
      [3, 'number'],
      [1, 'boolean'],
      [1, 'boolean'],
    ] satisfies [number, 'number' | 'boolean' | 'ascii'][];
    try {
      encode([2, 3, true, false, 'ab', 3], schema);
    } catch (e) {
      expect(e.message).toBe('Данные не соответствуют схеме');
    }
  });
});
