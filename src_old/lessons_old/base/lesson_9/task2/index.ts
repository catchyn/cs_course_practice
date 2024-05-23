import { BinaryHeap } from '../../../../common/BinaryHeap';

const sortedByBinaryTree = <T>(arr: T[], comparator: (a: T, b: T) => number) => {
  const heap = new BinaryHeap<T>(comparator, arr.length, arr);
  heap.display();
  for (let i = 0; i < arr.length; i++) {
    arr[arr.length - 1 - i] = heap.delete();
  }
};

const arr = [1, 33, 44, 5, 23, 54, 89, 11, 14];
sortedByBinaryTree(arr, (a, b) => a - b);
console.log(arr);
