import { Queue } from '../Queue';

describe('Queue', () => {
  test('base test', () => {
    const queue = new Queue();

    queue.push(10);
    queue.push(11);
    queue.push(12);
    expect(queue.head).toBe(10); // 10
    expect(queue.pop()).toBe(10); // 10
    expect(queue.head).toBe(11); // 11
    expect(queue.pop()).toBe(11); // 11
    expect(queue.pop()).toBe(12); // 12
    expect(() => {
      return queue.pop();
    }).toThrow('Нет элементов в очереди'); // Exception
  });
});
