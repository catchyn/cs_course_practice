import { filter } from '../lesson_15_iterator/filter/filter';
import { take } from '../lesson_15_iterator/take/take';

const arr = Array.from({ length: 1e7 }, (_, i) => i);

class Iter<T> implements Iterable<T> {
  constructor(protected i: Iterable<T>) {}
  [Symbol.iterator]() {
    return this.i[Symbol.iterator]();
  }
  take(limit: number): Iter<T> {
    return new Iter(take<T>(this.i, limit));
  }
  filter(cb: (value: T) => boolean): Iter<T> {
    return new Iter(filter<T>(this.i, cb));
  }
  // ...
}

console.time('start 1');
console.log([
  ...take(
    filter(arr, (el) => el > 1e6),
    2,
  ),
]);
console.timeEnd('start 1');

console.time('start 2');
const i = new Iter(arr);
console.log([...i.filter((el) => el > 1e6).take(2)]);
console.timeEnd('start 2');
