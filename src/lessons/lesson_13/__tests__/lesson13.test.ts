import { myRegExp1 } from '../task1';

describe('Test task 1', () => {
  it('default case', () => {
    expect(myRegExp1.test('привет')).toBe(false);
  });
  it('success case', () => {
    expect(myRegExp1.test('$abcd__$123_$ABD_$$')).toBe(true);
  });
  it('tech symbol case', () => {
    expect(myRegExp1.test('$abcd__$123\r_$ABD_$$')).toBe(false);
  });
  it('empty string case', () => {
    expect(myRegExp1.test('')).toBe(true);
  });
});
