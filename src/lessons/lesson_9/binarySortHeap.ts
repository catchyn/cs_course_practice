import { FnComparator } from '../lesson_8/BinaryTree';
import { BinaryHeap } from './binaryHeap';

export const binarySortHeap = <T>(arr: T[], comparator: FnComparator<T>): void => {
  const heap = new BinaryHeap(arr, comparator);
  heap.sortedArr();
};
