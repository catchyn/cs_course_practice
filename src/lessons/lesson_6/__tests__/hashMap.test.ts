import { HashMap } from '../HashMap';

describe('hashMap()', () => {
  test('hashMap()', () => {
    const map = new HashMap(120);
    const document = {};
    map.set('foo', 1);
    map.set(42, 10);
    map.set(document, 100);

    expect(map.get(42)).toBe(10); // 10
    expect(map.has(document)).toBe(true); // true
    expect(map.delete(document)).toBe(100); // 100
    expect(map.has(document)).toBe(false); // false
  });
  test('hashMap increase capacity', () => {
    const map = new HashMap(119);
    for (let i = 0; i < 100; i++) {
      map.set(i, i ** 2);
    }
    expect(map.capacity).toBe(239);
  });
});
