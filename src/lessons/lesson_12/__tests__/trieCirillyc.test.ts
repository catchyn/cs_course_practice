import { TrieCirillyc } from '../TrieCirillyc';

describe('TrieCirillyc test', () => {
  test('TrieCirillyc test', () => {
    const trie = new TrieCirillyc();

    trie.addWord('мясо');
    trie.addWord('мясорубка');
    trie.addWord('мир');

    expect(trie.go('м').go('я').go('с').go('о').isWord()).toBe(true);
    expect(trie.go('м').go('я').go('с').isWord()).toBe(false);
  });
});
