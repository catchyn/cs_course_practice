type TrieNode = {
  children: TrieNode[];
  isWordEnd?: boolean;
};

// Поддерживает кириллицу в нижнем регистре
export class TrieCirillyc {
  private root: TrieNode;

  constructor(root?: TrieNode) {
    this.root = root ?? this.getEmptyNode();
  }

  public addWord(str: string) {
    let node: TrieNode = this.root;
    for (const char of str) {
      const index = this.getIndex(char);
      if (!node.children[index]) {
        node.children[index] = this.getEmptyNode();
      }
      node = node.children[index];
    }
    node.isWordEnd = true;
  }

  public go(ch: string): TrieCirillyc {
    const index = this.getIndex(ch);
    if (!this.root.children[index]) {
      throw new Error('no symbol');
    }
    return new TrieCirillyc(this.root.children[index]);
  }

  public isWord(): boolean {
    return Boolean(this.root.isWordEnd);
  }

  private getIndex(ch: string) {
    return ch.charCodeAt(0) - 'а'.charCodeAt(0);
  }

  private getEmptyNode(): TrieNode {
    return { children: new Array(34).fill(null) };
  }
}
