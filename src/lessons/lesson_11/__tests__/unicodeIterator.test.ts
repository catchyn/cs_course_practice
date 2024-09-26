import { unicodeIterator } from '../unicodeIterator';

describe('unicodeIterator test', () => {
  test('test case', () => {
    expect([...unicodeIterator('123')]).toEqual(['1', '2', '3']);
  });
  test('test case emoji', () => {
    expect([...unicodeIterator('😀')]).toEqual(['😀']);
  });
  test('test case emoji', () => {
    expect([...unicodeIterator('1😃à🇷🇺👩🏽‍❤️‍💋‍👨')]).toEqual([
      '1',
      '😃',
      'à',
      '🇷🇺',
      '👩🏽‍❤️‍💋‍👨',
    ]);
  });
});
