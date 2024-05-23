// eslint-disable-next-line
export function compose(...fns: any[]) {
  // eslint-disable-next-line
  return function (...args: any[]) {
    return fns.reduceRight((res, fn) => [fn.call(null, ...res)], args);
  };
}
