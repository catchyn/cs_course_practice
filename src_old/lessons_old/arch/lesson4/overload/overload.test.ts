import { overload } from './overload';

describe('Test overload function', () => {
  it('should work with simple overload', () => {
    const myFunction = overload([() => 100500, (a, b) => a + b, (a, b, c) => a * b * c]);

    // 100500
    expect(myFunction()).toBe(100500);

    // 3
    expect(myFunction(1, 2)).toBe(3);

    // 24
    expect(myFunction(2, 3, 4)).toBe(24);
  });
});
