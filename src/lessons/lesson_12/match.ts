// TODO: Переписать и въехать в алг. Ахо-Корасик.

import { Trie } from './Trie';

export const match = (pattern: string, setStrs: string[]): string[] => {
  if (pattern.length < 1) {
    throw new Error('Пустая строка');
  }
  const delimeter = '.';
  const wildcard = '*';
  const endsign = '**';

  let trie = new Trie();
  const arr = pattern.split(delimeter);
  trie.addWord(arr);
  const result = [];

  outer: for (const test_str of setStrs) {
    assertTestCharsToCorrect(test_str);
    const test_chars = test_str.split(delimeter);
    for (const test_char of test_chars) {
      try {
        trie = trie.go(test_char);
      } catch (e) {
        trie.startAgain();
        continue outer;
      }
    }
    if (trie.isWord()) {
      result.push(test_str);
    }
    trie.startAgain();
  }
  return result;
};

function assertTestCharsToCorrect(test_chars: string) {
  if (!/^((\*)|\w+)(\.(\*|\w+))*?(\.((\*\*)|\w+))?$/.test(test_chars)) {
    throw new Error('The pattern is incorrect.');
  }
}
