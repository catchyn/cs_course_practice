// type HasTail<T extends any[]> = T['length'] extends 1 | 0 ? false : true;
type HasTail<T> = T extends [any, any, ...any] ? true : false;

const test1: HasTail<[1, 2, 3]> = true;
const test2: HasTail<[1]> = false;
const test3: HasTail<[]> = false;
console.log(test1, test2, test3);

export { HasTail };
