type Last<T> = T extends [infer H, ...infer TAIL]
  ? TAIL['length'] extends 0
    ? H
    : Last<TAIL>
  : never;

const test1: Last<[1, 2, 3]> = 3;
const test2: Last<[1]> = 1;

// never
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const test3: Last<[]> = 1;

console.log(test1, test2, test3);

export { Last };
