import { BinaryHeap } from '../binaryHeap';
import { binarySortHeap } from '../binarySortHeap';

describe('test BinaryHeap', () => {
  test('test BinaryHeap push successfully', () => {
    const heap = new BinaryHeap([], (a, b) => a - b);
    heap.push(5);
    heap.push(-2);
    heap.push(11);
    heap.push(-1);
    heap.push(10);
    heap.push(-4);
    heap.push(-2);

    expect(heap.head()).toBe(11);
  });
  test('test BinaryHeap pop successfully', () => {
    const heap = new BinaryHeap([], (a, b) => a - b);
    heap.push(5);
    heap.push(-2);
    heap.push(11);
    heap.push(-1);
    heap.push(10);
    heap.push(-4);
    heap.push(-2);

    expect(heap.pop()).toBe(11);
    expect(heap.pop()).toBe(10);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBe(-1);
    expect(heap.pop()).toBe(-2);
    expect(heap.pop()).toBe(-2);
    expect(heap.pop()).toBe(-4);
    expect(heap.pop()).toBe(null);
  });
  test('test BinaryHeap sort successfully', () => {
    const arr = [5, -2, 11, -1, 10, -4, -2];
    binarySortHeap(arr, (a, b) => b - a);
    expect(arr).toEqual([11, 10, 5, -1, -2, -2, -4]);
  });
});
