import { BinaryHeap } from '../../../../common/BinaryHeap';

const heap = new BinaryHeap<number>((a, b) => a - b);
heap.insert(97);
heap.insert(93);
heap.insert(101);
heap.insert(83);
heap.insert(8);
heap.insert(455);
heap.insert(644);
heap.insert(34);
heap.insert(82);
heap.insert(33);
heap.insert(26);
heap.insert(1);
heap.insert(10);
heap.display();

const heap_2 = new BinaryHeap<number>((a, b) => a - b);
heap_2.insert(1);
heap_2.insert(33);
heap_2.insert(44);
heap_2.insert(5);
heap_2.insert(23);
heap_2.insert(54);
heap_2.insert(89);
heap_2.insert(11);
heap_2.insert(14);
heap_2.display();
