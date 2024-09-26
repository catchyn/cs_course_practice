import { randomInt } from '../randomInt';
import { take } from '../take';
import { filter } from '../filter';
import { enumerate } from '../enumerate';
import { Range } from '../Range';
import { seq } from '../seq';
import { zip } from '../zip';
import { mapSeq } from '../mapSeq';

describe('Random Int', () => {
  test('RandomInt', () => {
    const randomIterator = randomInt(0, 4);

    expect(randomIterator.next().value).toBe(0);
    expect(randomIterator.next().value).toBe(1);
    expect(randomIterator.next().value).toBe(2);
    expect(randomIterator.next().value).toBe(3);
    expect(randomIterator.next().value).toBe(4);
    expect(randomIterator.next().value).toBe(undefined);
    expect(randomIterator.next().value).toBe(undefined);
  });

  test('Take', () => {
    const randomIterator = randomInt(0, 100);
    const numbers = [...take(randomIterator, 15)];
    expect(numbers).toHaveLength(15);
  });

  test('Take with shorter collection', () => {
    const randomIterator = take(randomInt(0, 100), 4);
    const numbers = [...take(randomIterator, 15)];
    expect(numbers).toHaveLength(4);
  });

  test('Filter', () => {
    const randomIterator = randomInt(0, 100);
    const numbers = [
      ...take(
        filter(randomIterator, (el) => el > 30),
        15,
      ),
    ];
    expect(numbers).toHaveLength(15);
    for (const number of numbers) {
      expect(number).toBeGreaterThan(30);
      expect(number).toBeLessThanOrEqual(100);
    }
  });

  test('Enumerate', () => {
    const randomIterator = randomInt(0, 100);
    const pairs = [...take(enumerate(randomIterator), 3)];
    expect(pairs).toHaveLength(3);
    let count = 0;
    for (const pair of pairs) {
      expect(pair[0]).toBe(count);
      expect(pair[1]).toBeLessThanOrEqual(100);
      count++;
    }
  });

  test('Range', () => {
    const symbolRange = new Range('a', 'f');
    expect(Array.from(symbolRange)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);

    const numberRange = new Range(-5, 1);
    expect(Array.from(numberRange.reverse())).toEqual([1, 0, -1, -2, -3, -4, -5]);
  });

  test('Sequence', () => {
    expect([...seq([1, 2], new Set([3, 4]), 'bla')]).toEqual([1, 2, 3, 4, 'b', 'l', 'a']);
  });

  test('Sequence empty', () => {
    expect([...seq([])]).toEqual([]);
  });

  test('Zip', () => {
    expect([...zip([1, 2], new Set([3, 4]), 'bl')]).toEqual([
      [1, 3, 'b'],
      [2, 4, 'l'],
    ]);
  });

  test('MapSeq', () => {
    expect([...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])]).toEqual([1, 3, 5]);
  });
});
