import { sleep } from '../../utils/functions/sleep';
import { timeout } from '../../utils/functions/timeout';
import { SyncPromise } from '../../common/SyncPromise';

//## Необходимо написать функцию sleep, которая бы принимала заданное количество миллисекунд и возвращала Promise.

console.time('task1');
sleep(100).then(() => {
  console.timeEnd('task1');
  console.log(`I'am awake!`);
});

//## Необходимо написать функцию timeout, которая бы принимала Promise и заданное количество миллисекунд и возвращала Promise.

console.time('task2');
timeout(fetch('//my-data'), 200)
  .then(console.log)
  .catch((e) => {
    console.timeEnd('task2');
    console.error(e);
  });

//## Необходимо написать функцию setImmediate/clearImmediate по аналогии с node.js.

const setImmediate = (cb: (...args: any[]) => void): NodeJS.Timer => {
  return setTimeout(cb, 0);
};
const clearImmediate = (timer: NodeJS.Timer): void => {
  clearTimeout(timer);
};

const t = setImmediate(() => {
  console.log('task3 cancel');
});
clearImmediate(t);

//## Необходимо написать функцию promisify, которая бы принимала функцию, где последний аргумент thunk-callback и возвращала бы новую функцию.

const promisify = (fn: (arg: any, cb: (err: Error | null, success: any) => void) => any) => {
  return (arg: any) =>
    new Promise((resolve, reject) => {
      fn(arg, (err, success) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
};

function readFile(file: any, cb: (arg0: null, arg1: string) => void) {
  cb(null, 'fileContent');
}
const readFilePromise = promisify(readFile);
readFilePromise('my-file.txt').then(console.log).catch(console.error);

//## Необходимо написать класс SyncPromise, аналогичный нативному, но работающий синхронно, если это возможно.

SyncPromise.resolve(111).then(console.log); // 111
console.log(222); // 222
