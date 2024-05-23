// eslint-disable-next-line
export function curry(fn: any) {
  return function curried(this: unknown, ...args: unknown[]) {
    if (args.length >= fn.length) {
      const actualArgs = args.slice(0, fn.length);
      if (actualArgs.includes(curry._)) {
        return function (this: unknown, ...argsNext: unknown[]) {
          let count = 0;
          const newArgs = actualArgs.map((arg) => (arg === curry._ ? argsNext[count++] : arg));
          return curried.apply(this, newArgs);
        };
      }
      return fn.apply(this, actualArgs);
    }
    return function (this: unknown, ...argsNext: unknown[]) {
      return curried.apply(this, args.concat(argsNext));
    };
  };
}
curry._ = Symbol('_');
