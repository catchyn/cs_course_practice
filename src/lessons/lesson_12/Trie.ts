export class TrieNode {
  current: string;
  isEnd?: boolean;
  children: Map<string, number> = new Map();

  constructor(current: string, isEnd?: boolean) {
    this.current = current;
    this.isEnd = isEnd;
  }
}

export class Trie {
  private readonly buffer: TrieNode[];
  private rootPointer;

  constructor(buffer?: TrieNode[], rootPointer?: number) {
    this.buffer = buffer ?? [new TrieNode('')];
    this.rootPointer = rootPointer ?? 0;
  }

  addWord(str: Iterable<string>) {
    let current = this.buffer[this.rootPointer];
    for (const char of str) {
      const childIndex = current.children.get(char);
      if (!childIndex) {
        const node = new TrieNode(char);
        const index = this.buffer.push(node) - 1;
        current.children.set(char, index);
        current = node;
      } else {
        current = this.buffer[childIndex];
      }
    }
    current.isEnd = true;
  }

  go(char: string) {
    const childIndex = this.buffer[this.rootPointer].children.get(char);

    if (!childIndex) {
      const wildcardIndex = this.buffer[this.rootPointer].children.get('*');
      const endIndex = this.buffer[this.rootPointer].children.get('**');
      if (wildcardIndex) {
        return new Trie(this.buffer, wildcardIndex);
      }
      if (endIndex) {
        return new Trie(this.buffer, endIndex);
      }
      throw new Error('Symbol not found');
    } else {
      return new Trie(this.buffer, childIndex);
    }
  }

  startAgain() {
    this.rootPointer = 0;
  }

  isWord(): boolean {
    return Boolean(this.buffer[this.rootPointer].isEnd);
  }
}
