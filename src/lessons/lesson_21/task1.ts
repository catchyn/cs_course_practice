import { curry } from '../../utils/functions/curry';
import { compose } from '../../utils/functions/compose';

const diff = curry((a: number, b: number) => a - b);
console.log(diff(10)(5)); // 5
console.log(diff(curry._, 5)(10)); // 5

Object.hasOwn({ a: 1 }, 'a');
const res = [{ a: 1 }, { a: 2, b: 2 }, {}].filter(
  curry(Object.hasOwn)(curry._, curry._, curry._)(curry._, 'a'),
);
console.log(res); // [{ a: 1 }, { a: 2, b: 2 }]

const f = compose(
  (a: number) => a ** 2,
  (a: number) => a * 10,
  (a: number) => Math.sqrt(a), // Первая
);

console.log(f(16)); // 1600
