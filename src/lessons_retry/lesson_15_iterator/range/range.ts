class Range {
  private cursor: string | number;

  constructor(from: string, to: string);
  constructor(from: number, to: number);
  constructor(private from: string | number, private to: string | number) {
    this.cursor = from;
  }

  [Symbol.iterator]() {
    return this;
  }

  reverse() {
    const reverseRange = new Range(this.from as string, this.to as string);
    reverseRange.next = reverseRange.nextReverse;
    reverseRange.cursor = reverseRange.to;
    return reverseRange;
  }

  next() {
    if (this.cursor !== this.from && this.cursor > this.to) {
      this.cursor = this.from;
      return {
        done: true,
        value: undefined,
      };
    }

    const res = {
      done: false,
      value: this.cursor,
    };

    if (typeof this.cursor === 'string') {
      let currentCode = this.cursor.codePointAt(0);
      if (currentCode) {
        currentCode++;
        this.cursor = String.fromCodePoint(currentCode);
      }
    } else {
      this.cursor++;
    }

    return res;
  }

  nextReverse() {
    if (this.cursor !== this.to && this.cursor < this.from) {
      this.cursor = this.to;
      return {
        done: true,
        value: undefined,
      };
    }

    const res = {
      done: false,
      value: this.cursor,
    };

    if (typeof this.cursor === 'string') {
      let currentCode = this.cursor.codePointAt(0);
      if (currentCode) {
        currentCode--;
        this.cursor = String.fromCodePoint(currentCode);
      }
    } else {
      this.cursor--;
    }

    return res;
  }
}

export { Range };
