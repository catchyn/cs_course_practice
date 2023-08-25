// Работа функции не должна вызывать фризов. Функция должна возвращать Promise.

const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

export async function forEach<T>(iter: Iterable<T>, cb: (value: T, i: number) => void) {
  let start = Date.now();

  let i = 0;

  for (const el of iter) {
    cb(el, i++);

    if (Date.now() - start > 64) {
      await sleep(300);
      start = Date.now();
    }
  }
}

let total = 0;

(async function () {
  await forEach(new Array(50e4), () => total++);
})();

console.log(total); // 10_000
