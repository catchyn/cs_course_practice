import { Vector } from '../../../common/Vector';

const uint8Vector = new Vector(Uint8Array, { capacity: 100 });

uint8Vector.push(100); // 1
uint8Vector.push(20, 10); // 3

uint8Vector.pop(); // 10
uint8Vector.shift(); // 100

uint8Vector.unshift(1); // 2
console.log(uint8Vector.length); // 2
