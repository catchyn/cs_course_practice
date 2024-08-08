import { Vector } from '../vector';

describe('Test vector', () => {
  test('Test vector success', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 100 });

    uint8Vector.push(100); // 1
    uint8Vector.push(20, 10); // 3
    for (let i = 0; i < 20000; i++) {
      uint8Vector.push(i); // 1
    }
    expect(uint8Vector.capacity).toBe(25600);
    expect(uint8Vector.pop()).toBe(31);
    expect(uint8Vector.pop()).toBe(30);
    for (let i = 0; i < 19999; i++) {
      uint8Vector.pop(); // 1
    }
    expect(uint8Vector.capacity).toBe(100);
  });

  test('Test vector DEQUE API', () => {
    const uint8Vector = new Vector(Uint8Array, { capacity: 100 });

    uint8Vector.push(100); // 1
    console.log('1', [...uint8Vector]);

    uint8Vector.push(20, 10); // 3
    console.log('2', [...uint8Vector]);

    expect(uint8Vector.pop()).toBe(10); // 10
    console.log('3', [...uint8Vector]);

    expect(uint8Vector.shift()).toBe(100); // 100
    console.log('4', [...uint8Vector]);

    uint8Vector.unshift(1); // 2
    console.log('5', [...uint8Vector]);

    expect(uint8Vector.length).toBe(2);
    console.log('6', [...uint8Vector]);
  });
});
