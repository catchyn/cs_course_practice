type Reverse<T> = T extends [infer A, ...infer B]
  ? B['length'] extends 0
    ? [A, ...B]
    : [...Reverse<B>, A]
  : [];

const test1: Reverse<[1, 2, 3]> = [3, 2, 1];
const test2: Reverse<[1]> = [1];
const test3: Reverse<[]> = [];

console.log(test1, test2, test3);

export { Reverse };
