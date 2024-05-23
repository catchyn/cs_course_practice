import { TypedArray, TypedArrayType } from '../types/TypedArray';

export class Vector<T extends TypedArrayType> {
  // Емкость
  #capacity: number;
  // Длина
  length = 0;
  // Массив данных
  #buffer: TypedArray;
  // Конструктор типа массива
  #TypedArrayConstructor: T;
  // Коэффициент расширения вектора
  #EXPAND_FACTOR = 2;

  constructor(type: T, { capacity }: { capacity: number }) {
    this.#capacity = capacity;
    this.#TypedArrayConstructor = type;
    this.#buffer = new type(capacity);
  }

  push(...values: number[]): void {
    const targetCapacity = this.length + values.length;
    if (targetCapacity > this.#capacity) {
      this.#expandCapacity(targetCapacity);
      this.#buffer = this.#createBuffer([this.#buffer]);
    }
    this.#buffer.set(values, this.length);
    this.length += values.length;
  }

  pop(): number {
    const value = this.#buffer[this.length - 1];
    this.length--;
    return value;
  }

  shift(): number {
    const value = this.#buffer[0];
    for (let i = 0; i < this.length - 1; i++) {
      this.#buffer[i] = this.#buffer[i + 1];
    }
    this.length--;
    return value;
  }

  unshift(...values: number[]): void {
    const targetCapacity = this.length + values.length;
    if (targetCapacity >= this.#capacity) {
      this.#expandCapacity(targetCapacity);
    }
    this.#buffer = this.#createBuffer([values, this.#buffer.slice(0, -values.length)]);
    this.length += values.length;
  }

  getCapacity() {
    return this.#capacity;
  }

  getBuffer() {
    return this.#buffer;
  }

  #expandCapacity(targetCapacity: number): void {
    while (this.#capacity < targetCapacity) {
      this.#capacity *= this.#EXPAND_FACTOR;
    }
  }

  #createBuffer(arrays: ArrayLike<number>[]): TypedArray {
    const newBuffer = new this.#TypedArrayConstructor(this.#capacity);
    let offset = 0;
    for (const array of arrays) {
      newBuffer.set(array, offset);
      offset += array.length;
    }
    return newBuffer;
  }
}
