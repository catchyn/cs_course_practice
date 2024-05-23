import { zip } from './zip';

describe('test zip function', () => {
  it('happy path', () => {
    const arr = [...zip([1, 2], new Set([3, 4]), 'bl')]; // [[1, 3, b], [2, 4, 'l']]
    expect(arr).toEqual([
      [1, 3, 'b'],
      [2, 4, 'l'],
    ]);
  });
  it('test iterable other length', () => {
    const arr = [...zip([1, 2], new Set([3, 4]), 'b')]; // [[1, 3, b]]
    expect(arr).toEqual([[1, 3, 'b']]);
  });
});
