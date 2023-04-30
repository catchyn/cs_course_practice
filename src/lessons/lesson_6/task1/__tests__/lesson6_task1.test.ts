import { Vector } from '../../../../common/Vector';

describe('Test lesson 6, task 1', () => {
  let uint8Vector: Vector<typeof Uint8Array>;

  beforeEach(() => {
    uint8Vector = new Vector(Uint8Array, { capacity: 10 });
  });

  it('Default test case', () => {
    uint8Vector.push(100);
    uint8Vector.push(20, 10);

    expect(uint8Vector.pop()).toBe(10);
    expect(uint8Vector.shift()).toBe(100);

    uint8Vector.unshift(1);
    expect(uint8Vector.length).toBe(2);
  });

  it('Overflow push test case', () => {
    for (let i = 0; i < 12; i++) {
      uint8Vector.push(i * 2);
    }

    expect(uint8Vector.pop()).toBe(22);
    expect(uint8Vector.shift()).toBe(0);
  });

  it('Overflow unshift test case', () => {
    for (let i = 0; i < 12; i++) {
      uint8Vector.unshift(i * 2);
    }

    expect(uint8Vector.pop()).toBe(0);
    expect(uint8Vector.shift()).toBe(22);
  });

  it('Mass push, expand test', () => {
    let i = 0;
    while (i < 2 ** 10) {
      uint8Vector.push(Math.round(Math.random() * 100));
      i++;
    }
    expect(uint8Vector.length).toBe(2 ** 10);

    while (i > 0) {
      uint8Vector.shift();
      i--;
    }
    expect(uint8Vector.length).toBe(0);
  });
});
