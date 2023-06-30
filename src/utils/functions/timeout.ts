import { sleep } from './sleep';

export function timeout<T>(promise: Promise<T>, time: number): Promise<T> {
  return new Promise((resolve, reject) => {
    promise
      .then((value) => {
        sleep(time).then(() => {
          resolve(value);
        });
      })
      .catch((e) => {
        sleep(time).then(() => {
          reject(e);
        });
      });
  });
}
