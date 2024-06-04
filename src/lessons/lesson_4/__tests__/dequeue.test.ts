import { Dequeue } from '../Dequeue';

describe('dequeue', () => {
  test('base test', () => {
    const dequeue = new Dequeue();

    dequeue.push(10);
    expect(dequeue.head).toBe(10); // 12
    expect(dequeue.tail).toBe(10); // 12

    dequeue.unshift(11);
    expect(dequeue.head).toBe(11); // 12
    expect(dequeue.tail).toBe(10); // 12

    dequeue.push(12);
    expect(dequeue.head).toBe(11); // 12
    expect(dequeue.tail).toBe(12); // 12

    expect(dequeue.pop()).toBe(12); // 12
    expect(dequeue.shift()).toBe(11); // 11

    expect(dequeue.head).toBe(10); // 12
    expect(dequeue.tail).toBe(10); // 12

    expect(dequeue.pop()).toBe(10); // 10
    expect(() => {
      dequeue.pop();
    }).toThrow('Нет элементов'); // Exception
  });
});
