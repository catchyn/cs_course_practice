import { encode } from '../schema/encode';
import { decode } from '../schema/decode';

describe('decode', () => {
  test('should decode a string', () => {
    const schema = [
      [3, 'number'],
      [3, 'number'],
      [1, 'boolean'],
      [0, 'boolean'],
      [16, 'ascii'],
    ] satisfies [number, 'number' | 'boolean' | 'ascii'][];
    const arrayBuffer = encode([2, 3, true, false, 'ab'], schema);
    const data = decode(arrayBuffer, schema);
    expect(data).toEqual([2, 3, true, false, 'ab']);
  });
});
