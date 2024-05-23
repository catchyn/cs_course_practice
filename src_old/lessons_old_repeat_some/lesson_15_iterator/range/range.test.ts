import { Range } from './range';

describe('test Range', () => {
  it('test string range', () => {
    const symbolRange = new Range('a', 'f');
    const arr = Array.from(symbolRange);
    expect(arr).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });
  it('test number range', () => {
    const numberRange = new Range(-5, 1);
    const arr = Array.from(numberRange.reverse()); // [1, 0, -1, -2, -3, -4, -5]
    expect(arr).toEqual([1, 0, -1, -2, -3, -4, -5]);
  });
});
