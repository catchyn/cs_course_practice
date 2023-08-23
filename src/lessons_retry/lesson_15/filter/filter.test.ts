import { filter } from './filter';
import { toIterable } from '../toIterable/toIterable';
import { random } from '../random/random';
import { take } from '../take/take';

describe('test filter', () => {
  it('have 15 values less 100 and greater 30', () => {
    const randomInt = toIterable(random(0, 100));
    const arr = [
      ...take(
        filter(randomInt, (el) => el > 30),
        15,
      ),
    ];
    expect(arr.length).toBe(15);
    for (const value of arr) {
      expect(value).toBeLessThanOrEqual(100);
      expect(value).toBeGreaterThanOrEqual(30);
    }
  });
});
