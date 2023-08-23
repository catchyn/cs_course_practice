import { take } from './take';
import { random } from '../random/random';
import { toIterable } from '../toIterable/toIterable';

describe('test take', () => {
  it('simple test', () => {
    const randomInt = toIterable(random(0, 100));
    const arr = [...take(randomInt, 15)];
    expect(arr.length).toBe(15);
    for (let i = 0; i < 15; i++) {
      expect(arr[i]).toBeLessThanOrEqual(100);
      expect(arr[i]).toBeGreaterThanOrEqual(0);
    }
  });
});
