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
    if (this.length + values.length >= this.#capacity) {
      this.#expandBuffer();
    }
    for (const value of values) {
      this.#buffer[this.length] = value;
      this.length++;
    }
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
    if (this.length + values.length >= this.#capacity) {
      this.#expandBuffer();
    }
    this.#buffer = new this.#TypedArrayConstructor([...values, ...this.#buffer]);
    this.length += values.length;
  }

  getCapacity() {
    return this.#capacity;
  }

  #expandBuffer() {
    this.#capacity *= this.#EXPAND_FACTOR;
    const newBuffer = new this.#TypedArrayConstructor(this.#capacity);
    for (let i = 0; i < this.#capacity; i++) {
      newBuffer[i] = this.#buffer[i];
    }
    this.#buffer = newBuffer;
  }
}
