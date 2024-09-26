import { match } from '../match';

describe('match', () => {
  test('match success', () => {
    expect(match('foo.*.bar.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
      'foo.bla.bar.baz',
    ]);
  });
});
