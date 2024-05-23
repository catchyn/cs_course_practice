type TrieNode<T extends ObjectLiteral> = { isEnd?: boolean } & T;

type ObjectLiteral = { [key: string]: unknown };

type TrieNodeWithCharEdges<T extends ObjectLiteral> = [TrieNode<T>, { [key in string]: number }];

export class Trie<T extends ObjectLiteral> {
  #buffer: TrieNodeWithCharEdges<T>[] = [];
  #current: TrieNodeWithCharEdges<T>;
  #anySymbol?: string;
  #endSymbol?: string;
  #isMissingChar = false;

  constructor(anySymbol?: string, endSymbol?: string) {
    this.#current = [{} as TrieNode<T>, {}];
    this.#setNode(this.#current);
    this.#anySymbol = anySymbol;
    this.#endSymbol = endSymbol;
  }

  addWord(word: string | string[]) {
    let node = this.#getRoot();
    const chars = [...word];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (node[1][char]) {
        node = this.#getNode(node[1][char]);
      } else {
        node[1] = { ...node[1], [char]: this.#buffer.length };
        const newNode: TrieNodeWithCharEdges<T> = [
          (i < chars.length - 1 ? {} : { isEnd: true }) as TrieNode<T>,
          {},
        ];
        node = newNode;
        this.#setNode(newNode);
      }
    }
  }

  go(char: string) {
    if (this.#current[1][char]) {
      this.#current = this.#getNode(this.#current[1][char]);
    } else if (this.#anySymbol && this.#current[1][this.#anySymbol]) {
      this.#current = this.#getNode(this.#current[1][this.#anySymbol]);
    } else if (this.#endSymbol && this.#current[1][this.#endSymbol]) {
      this.#current = this.#getNode(this.#current[1][this.#endSymbol]);
    } else if (!(this.#endSymbol && this.#current[0]['isEnd'])) {
      this.#current = [{} as TrieNode<T>, {}];
      this.#isMissingChar = true;
    }
    return this;
  }

  goRoot() {
    this.#isMissingChar = false;
    this.#current = this.#getRoot();
  }

  isWord() {
    return Boolean(this.#current[0].isEnd);
  }

  isMissing() {
    return this.#isMissingChar;
  }

  #getRoot() {
    return this.#buffer[0];
  }

  #getNode(i: number) {
    return this.#buffer[i];
  }

  #setNode(value: TrieNodeWithCharEdges<T>) {
    this.#buffer.push(value);
  }
}
