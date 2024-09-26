import { Trie } from '../Trie';

describe('Trie test', () => {
  test('Trie test', () => {
    const trie = new Trie();

    trie.addWord('мясо');
    trie.addWord('мясорубка');
    trie.addWord('мир');

    expect(trie.go('м').go('я').go('с').go('о').isWord()).toBe(true);
    expect(trie.go('м').go('я').go('с').isWord()).toBe(false);
  });
});
