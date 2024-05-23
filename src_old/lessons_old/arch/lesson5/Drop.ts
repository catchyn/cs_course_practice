type Drop<N extends number, T> = T extends [infer A, ...infer B]
  ? N extends 0
    ? [A]
    : [A, ...Drop<N extends number ? N - 1 : never, B>]
  : [];

const test1: Drop<2, [1, 2, 3]> = [1, 2];
const test2: Drop<1, [1, 2, 3]> = [1];
const test3: Drop<3, []> = [];

export { Drop };
