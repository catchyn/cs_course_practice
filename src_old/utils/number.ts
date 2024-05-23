export class NumberUtils {
  /**
   * Проверка на простоту числа.
   * @param num
   */
  static isPrime(num: number): boolean {
    for (let i = 2; i ** 2 < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
}
