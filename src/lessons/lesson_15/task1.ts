import { random } from '../../common/iterators/random';
import { take } from '../../common/iterators/take';
import { filter } from '../../common/iterators/filter';
import { enumerate } from '../../common/iterators/enumerate';
import { Range } from '../../common/iterators/Range';
import { seq } from '../../common/iterators/seq';
import { zip } from '../../common/iterators/zip';
import { mapSeq } from '../../common/iterators/mapSeq';

const randomInt = random(0, 100);
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());

///////////////////////////////////////////////////////////////////////////////////////////////

const randomInt2 = random(0, 100);
console.log([...take(randomInt2, 15)]);

///////////////////////////////////////////////////////////////////////////////////////////////

const randomInt3 = random(0, 100);
console.log([
  ...take(
    filter(randomInt3, (el) => el > 30),
    15,
  ),
]);

///////////////////////////////////////////////////////////////////////////////////////////////

const randomInt4 = random(0, 100);
console.log([...take(enumerate(randomInt4), 3)]); // [[0, ...], [1, ...], [2, ...]]

///////////////////////////////////////////////////////////////////////////////////////////////

const symbolRange = new Range('a', 'f');
console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
const numberRange = new Range(-5, 1);
console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]

///////////////////////////////////////////////////////////////////////////////////////////////

console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'

///////////////////////////////////////////////////////////////////////////////////////////////

console.log(...zip([])); // [[1, 3, b], [2, 4, 'l']]

///////////////////////////////////////////////////////////////////////////////////////////////

console.log(...mapSeq([1, 2, 3, 4, 5, 6], [(el) => el * 2, (el) => el])); // [1, 3, 5]
