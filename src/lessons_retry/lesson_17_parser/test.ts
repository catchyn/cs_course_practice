import { toIterableIterator } from '../lesson_15_iterator/toIterable/toIterable';
const arr = [1, 2, 3, 4, 5, 6];
let iter = toIterableIterator(arr);
console.log([...iter]);
iter = toIterableIterator(arr);
console.log([...iter]);
