import { take } from '../take/take';
import { enumerate } from './enumerate';
import { toIterable } from '../toIterable/toIterable';
import { random } from '../random/random';

describe('enumerate function test', () => {
  it('function test', () => {
    const randomInt = toIterable(random(0, 100));
    const arr = [...take(enumerate(randomInt), 3)]; // [[0, ...], [1, ...], [2, ...]]
    expect(arr.length).toBe(3);
  });
});
