/**
 * Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента.
 */

/**
 * Класс обработки Uint8Array.
 */
class ProcessUint8Array {
  uint8Array: Uint8Array;
  maxSize: number;

  constructor(uint8Array: Uint8Array) {
    this.uint8Array = uint8Array;
    this.maxSize = uint8Array.length;
  }

  /**
   * В случае, если диапазон значений некорректный выбрасываем исключение.
   * @param index индекс элемента
   * @param num_bit номер бита
   */
  checkCorrectRange(index: number, num_bit: number): void {
    if (index < 0 || index >= this.maxSize) {
      throw new Error(
        `Допустимо использовать индексы в диапазоне от 0 до ${this.maxSize - 1} включительно.`,
      );
    }
    if (num_bit < 0 || num_bit > 7) {
      throw new Error('Uint8Array может содержать не более 8 битов.');
    }
  }

  /**
   * Получаем значение в массиве Uint8Array по индексу элемента и номеру бита справа-налево.
   * @param index индекс элемента
   * @param num_bit номер бита
   */
  get(index: number, num_bit: number): 1 | 0 {
    this.checkCorrectRange(index, num_bit);
    return (this.uint8Array[index] & (1 << num_bit)) != 0 ? 1 : 0;
  }

  /**
   * Выставляем значение в массиве Uint8Array по индексу элемента и номеру бита справа-налево.
   * @param index индекс элемента
   * @param num_bit номер бита
   * @param value значение бита
   */
  set(index: number, num_bit: number, value: 1 | 0) {
    this.checkCorrectRange(index, num_bit);
    this.uint8Array[index] = this.uint8Array[index] + Math.pow(2, num_bit) * (value === 0 ? -1 : 1);
  }
}

const createBitGetter = (uint8Array: Uint8Array) => {
  return new ProcessUint8Array(uint8Array);
};

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

////////////// TASK 2 ///////////////

const createBitAccessor = (uint8Array: Uint8Array) => {
  return new ProcessUint8Array(uint8Array);
};

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
bitAccessor.set(0, 1, 0); //
console.log(bitAccessor.get(0, 1)); // 0

console.log(bitAccessor.get(0, 7)); // 0
bitAccessor.set(0, 7, 1); //
console.log(bitAccessor.get(0, 7)); // 1
