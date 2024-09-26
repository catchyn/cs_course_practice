export class Range<T extends string | number> {
  private readonly type: 'string' | 'number';
  private readonly from: T;
  private readonly to: T;

  constructor(from: T, to: T) {
    const typeFrom = typeof from;
    const typeTo = typeof to;
    if (typeFrom !== typeTo || (typeFrom !== 'string' && typeFrom !== 'number')) {
      throw new Error('Поддерживаются только строки и числа');
    }
    this.type = typeFrom;
    this.to = to;
    this.from = from;
  }

  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => {
        const outOfRange = this.checkOutOfRange(current);
        const res = {
          value: current,
          done: outOfRange,
        };
        current = this.nextSymbol(current);
        return res;
      },
    };
  }

  reverse() {
    let current = this.to;

    return {
      next: () => {
        const outOfRange = this.checkOutOfRange(current);
        const res = {
          value: current,
          done: outOfRange,
        };
        current = this.prevSymbol(current);
        return res;
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  private checkOutOfRange(value: T): boolean {
    if (this.type === 'number') {
      return value > this.to || value < this.from;
    } else if (this.type === 'string') {
      return (
        (value as string).codePointAt(0) > (this.to as string).codePointAt(0) ||
        (value as string).codePointAt(0) < (this.from as string).codePointAt(0)
      );
    }
    throw Error('Unknown type');
  }

  private nextSymbol(value: T): T {
    if (this.type === 'number') {
      return this.nextNumber(value as number) as T;
    } else if (this.type === 'string') {
      return this.nextChar(value as string) as T;
    }
    throw Error('Unknown type');
  }

  private nextChar(value: string): string {
    return String.fromCodePoint(value.codePointAt(0) + 1);
  }

  private nextNumber(value: number): number {
    return value + 1;
  }

  private prevSymbol(value: T): T {
    if (this.type === 'number') {
      return this.prevNumber(value as number) as T;
    } else if (this.type === 'string') {
      return this.prevChar(value as string) as T;
    }
    throw Error('Unknown type');
  }

  private prevChar(value: string): string {
    return String.fromCodePoint(value.codePointAt(0) - 1);
  }

  private prevNumber(value: number): number {
    return value - 1;
  }
}
