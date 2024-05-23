const { quickSort } = require('../quickSort');
const { quickSortNew } = require('../quickSortNew');
const { quickSortExtraNew } = require('../quickSortExtraNew');

describe('Test quicksort', () => {
  test('base', () => {
    const arr = [2, 4, 3, 1, 5];
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty array', () => {
    const arr = [];
    quickSort(arr);
    expect(arr).toEqual([]);
  });
  test('base 2', () => {
    const arr = [2, 9, 6, 7, 8];
    quickSortNew(arr);
    expect(arr).toEqual([2,6,7,8,9]);
  });
  test('base 3', () => {
    const arr = [2, 4, 3, 1, 5];
    quickSortExtraNew(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty array 3', () => {
    const arr = [];
    quickSortExtraNew(arr);
    expect(arr).toEqual([]);
  });
  test('base 3', () => {
    const arr = [2, 9, 6, 7, 8];
    quickSortExtraNew(arr);
    expect(arr).toEqual([2,6,7,8,9]);
  });
});
