import { complexUnicodeIterator } from '../complexUnicodeIterator';

describe('test complexUnicodeIterator', () => {
  test('test complexUnicodeIterator success', () => {
    expect(complexUnicodeIterator('1😃à🇷🇺👩🏽‍❤️‍💋‍👨')).toEqual([
      '1',
      '😃',
      'à',
      '🇷🇺',
      '👩🏽‍❤️‍💋‍👨',
    ]);
  });
});
