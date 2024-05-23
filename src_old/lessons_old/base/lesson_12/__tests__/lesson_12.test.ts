import { Trie } from '../../../../common/Trie';
import { match } from '../task2';

it('trie base test', () => {
  const trie = new Trie();

  trie.addWord('мясо');
  trie.addWord('мясорубка');
  trie.addWord('мир');

  expect(trie.go('м').go('я').go('с').go('о').isWord()).toBe(true);
  trie.goRoot();
  expect(trie.go('м').go('и').go('р').isWord()).toBe(true);
  trie.goRoot();
  expect(trie.go('м').go('и').isWord()).toBe(false);
  trie.goRoot();
});

it('match base test', () => {
  expect(match('foo.*.bar.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
    'foo.bla.bar.baz',
    'foo.bag.bar.ban.bla',
  ]);
  expect(match('foo.bla.bar.baz', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
    'foo.bla.bar.baz',
  ]);
  expect(match('**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
    'foo',
    'foo.bla.bar.baz',
    'foo.bag.bar.ban.bla',
  ]);
  expect(match('*.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
    'foo.bla.bar.baz',
    'foo.bag.bar.ban.bla',
  ]);
  expect(match('*.bla.*.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])).toEqual([
    'foo.bla.bar.baz',
  ]);
});
