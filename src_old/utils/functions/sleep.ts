/**
 * Количество ms до вызова Promise.
 * @param time
 */
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
