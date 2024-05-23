import { Bit } from '../types/Bit';
import { BitAccessor } from '../utils/bitAccessor';
import { BitPointerBitArray } from './bitPointerBitArray';

/**
 * Класс работы с битами Uint8Array.
 */
export class BitAccessorUint8Array {
  /**
   * Базовая структура класса.
   */
  uint8Array: Uint8Array;
  /**
   * Число элементов в массиве.
   */
  maxSize: number;
  /**
   * Указатель на бит для удобства итерирования по массиву [индекс, номер бита].
   */
  bitPointer: BitPointerBitArray;

  constructor(uint8Array: Uint8Array) {
    this.uint8Array = uint8Array;
    this.maxSize = uint8Array.length;
    this.bitPointer = new BitPointerBitArray(8);
  }

  /**
   * В случае, если диапазон значений некорректный выбрасываем исключение.
   * @param index индекс элемента
   * @param bitNumber номер бита
   */
  checkCorrectRange(index: number, bitNumber: number): void {
    if (index < 0 || index >= this.maxSize) {
      throw new Error(
        `Допустимо использовать индексы в диапазоне от 0 до ${this.maxSize - 1} включительно.`,
      );
    }
    if (bitNumber < 0 || bitNumber > 7) {
      throw new Error('Uint8Array может содержать не более 8 битов.');
    }
  }

  /**
   * Получаем значение в массиве Uint8Array по индексу элемента и номеру бита справа-налево.
   * @param index индекс элемента
   * @param bitNumber номер бита
   */
  get(index: number, bitNumber: number): Bit {
    this.checkCorrectRange(index, bitNumber);
    return BitAccessor.get(this.uint8Array[index], bitNumber);
  }

  /**
   * Выставляем значение в массиве Uint8Array по индексу элемента и номеру бита справа-налево.
   * @param index индекс элемента
   * @param num_bit номер бита
   * @param value значение бита
   */
  set(index: number, num_bit: number, value: Bit) {
    this.checkCorrectRange(index, num_bit);
    this.uint8Array[index] = BitAccessor.set(this.uint8Array[index], num_bit, value);
  }

  /**
   * Запись в текущую позицию указателя значения и переход указателя на следующий бит.
   * @param bit
   */
  write(bit: Bit) {
    const [index, bitNum] = this.bitPointer.get();
    this.set(index, bitNum, bit);
    this.bitPointer.next();
  }

  /**
   * Чтение из текущей позиции указателя и переход указателя на следующий бит.
   */
  read(): Bit {
    const [index, bitNum] = this.bitPointer.get();
    const bit = this.get(index, bitNum);
    this.bitPointer.next();
    return bit;
  }
}
