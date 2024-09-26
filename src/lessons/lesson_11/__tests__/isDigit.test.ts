import { isDigit } from '../isDigit';

describe('isDigit', () => {
  test('isDigit arabian', () => {
    expect(isDigit('123')).toBe(true);
  });
  test('isDigit roman', () => {
    expect(isDigit('Ⅻ')).toBe(true);
  });
  test('isDigit roman bad', () => {
    expect(isDigit('Ⅻa')).toBe(false);
  });
});
