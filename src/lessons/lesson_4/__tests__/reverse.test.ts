import { reverse } from '../reverse';

describe('reverse functionality', () => {
  test('reverse functionality success', () => {
    expect(reverse('abcdefghijklmnopqrst')).toBe('tsrqponmlkjihgfedcba');
  });
});
