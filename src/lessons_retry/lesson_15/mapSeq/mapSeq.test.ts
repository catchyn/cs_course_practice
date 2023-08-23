import { mapSeq } from './mapSeq';

describe('test mapSeq', () => {
  it('test', () => {
    const arr = [...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])]; // [1, 3, 5]
    expect(arr).toEqual([1, 3, 5]);
  });
});
