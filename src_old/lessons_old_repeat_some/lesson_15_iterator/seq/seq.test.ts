import { seq } from './seq';

describe('test seq function', () => {
  it('test some seq', () => {
    const arr = [...seq([1, 2], new Set([3, 4]), 'bla')]; // 1, 2, 3, 4, 'b', 'l', 'a'
    expect(arr).toEqual([1, 2, 3, 4, 'b', 'l', 'a']);
  });
  it('test empty iterable', () => {
    const arr = [...seq([], new Set(), '')]; //
    expect(arr).toEqual([]);
  });
});
