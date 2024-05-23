type IterableType<T> = T extends Iterable<infer K>
  ? K
  : T extends AsyncIterable<infer K>
  ? K
  : never;

// number
const test1: IterableType<[1, 2, 3]> = 1;

// string
const test2: IterableType<Set<string>> = 'sss';

// {a: number}
const test3: IterableType<AsyncIterable<{ a: number }>> = { a: 1 };

console.log(test1, test2, test3);

export { IterableType };
