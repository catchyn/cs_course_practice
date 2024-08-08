import { biSearchLeft, biSearchRight } from '../bisearch';

describe('Binary Search', () => {
  test('binary search left', () => {
    expect(biSearchLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)).toBe(6);
  });
  test('binary search left', () => {
    expect(biSearchRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)).toBe(9);
  });
});
