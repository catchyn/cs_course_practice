import { Result } from '../../../common/Result';

const res = new Result(() => 42);
res.flatMap(() => Result.Error('Boom')).catch(console.error); // Boom

const res1 = new Result(() => 42);
res1.map((value) => value * 10).then(console.log); // 420

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Function.prototype.map = function <T, R, K>(
  this: (value: T) => R,
  fn: (value: K) => T,
): (value: K) => R {
  return (value) => {
    return this(fn(value));
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(((v: number) => v * 10).map(() => 42)()); // 420
