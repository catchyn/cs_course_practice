import { Trie } from '../../../common/Trie';

export function match(template: string, paths: string[]): string[] {
  const delimiter = '.';
  const trie = new Trie('*', '**');
  const result = [];

  trie.addWord(template.split(delimiter));

  for (const path of paths) {
    const dirs = path.split(delimiter);
    for (const dir of dirs) {
      trie.go(dir);
      if (trie.isWord() || trie.isMissing()) {
        break;
      }
    }
    if (trie.isWord()) {
      result.push(path);
    }
    trie.goRoot();
  }

  return result;
}

console.log(match('foo.*.bar.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])); // ['foo.bla.bar.baz', 'foo.bag.bar.ban.bla']
