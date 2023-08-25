import { HashMap } from '../../../../common/HashMap';

const map = new HashMap(120);
const document = {};

map.set('foo', 1);
map.set(42, 10);
map.set(document, 100);

console.log(map.get(42)); // 10
console.log(map.get('foo')); // 1
console.log(map.has(document)); // true
console.log(map.delete(document)); // 100
console.log(map.has(document)); // false
