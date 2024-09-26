import { getPiArray } from '../searchKMP';

describe('Test get PI array', () => {
  test('Test PI array', () => {
    expect(getPiArray('лили')).toEqual([0, 0, 1, 2]);
    expect(getPiArray('лилилали')).toEqual([0, 0, 1, 2, 3, 0, 1, 2]);
    expect(getPiArray('лииллиил')).toEqual([0, 0, 0, 1, 1, 2, 3, 4]);
  });
});
