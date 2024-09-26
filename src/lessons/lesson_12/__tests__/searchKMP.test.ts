import { searchKMP } from '../searchKMP';

describe('searchKMP', () => {
  test('searchKMP success', () => {
    expect(searchKMP('лилилось лилилась', 'лилила')).toBe(true);
  });
  test('searchKMP false', () => {
    expect(searchKMP('лилилось лилилась', 'лилилу')).toBe(false);
  });
  test('searchKMP error', () => {
    expect(() => searchKMP('лилилось лилилась', '')).toThrow('Пустая строка для поиска');
  });
});
