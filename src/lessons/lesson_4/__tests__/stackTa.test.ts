import { StackTA } from '../StackTA';

describe('test stackTa', () => {
  test('test stackTa', () => {
    const stack = new StackTA(Int32Array, 10);

    stack.push(10);
    stack.push(11);
    stack.push(12);

    expect(stack.head).toBe(12); // 12

    expect(stack.pop()).toBe(12); // 12

    expect(stack.head).toBe(11); // 11

    expect(stack.pop()).toBe(11); // 11
    expect(stack.pop()).toBe(10); // 10
    expect(() => {
      stack.pop();
    }).toThrow('Is empty stack TA'); // Exception
  });
});
