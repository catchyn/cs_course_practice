import { Vector } from '../../../../common/Vector';

describe('Test lesson 6, task 1', () => {
  let uint8Vector: Vector<typeof Uint8Array>;

  beforeEach(() => {
    uint8Vector = new Vector(Uint8Array, { capacity: 10 });
  });

  it('Default test case', () => {
    uint8Vector.push(100);
    uint8Vector.push(20, 10);

    uint8Vector.pop();
    uint8Vector.shift();

    uint8Vector.unshift(1);
    expect(uint8Vector.length).toBe(2);
  });

  it('Mass push, expand test', () => {
    let i = 0;
    while (i < 2 ** 20) {
      uint8Vector.push(Math.round(Math.random() * 100));
      i++;
    }
    expect(uint8Vector.length).toBe(2 ** 20);

    while (i > 0) {
      uint8Vector.shift();
      i--;
    }
    expect(uint8Vector.length).toBe(0);
  });
});
