import { Trie } from '../../../common/Trie';

const trie = new Trie();

trie.addWord('мясо');
trie.addWord('мясорубка');
trie.addWord('мир');

console.log(trie.go('м').go('я').go('с').go('о').isWord()); // true
console.log(trie.go('м').go('3').go('с').go('о').isWord()); // false
