import { isValid } from '../isValid';

describe('isValid test', () => {
  test('success test', () => {
    expect(isValid('(hello{world} and [me])')).toBe(true);
    expect(isValid('(hello{world)} and [me])')).toBe(false);
    expect(isValid(')')).toBe(false);
  });
});
