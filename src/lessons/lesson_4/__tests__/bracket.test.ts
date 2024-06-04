import { bracket } from '../bracket';

describe('bracket test', () => {
  test('success test', () => {
    expect(bracket('c[d]')).toBe(true);
    expect(bracket('a{b[c]d}e')).toBe(true);
    expect(bracket('a{b(c]d}e')).toBe(false);
    expect(bracket('a[b{c}d]e}')).toBe(false);
    expect(bracket('a{b(c)')).toBe(false);
  });
});
