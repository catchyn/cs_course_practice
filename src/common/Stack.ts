import { TypedArray } from '../types/TypedArray';
import { typedArrayMap } from '../utils/typedArray';
import { TypedArrayMap } from '../types/TypedArrayMap';

export class Stack {
  #array: TypedArrayMap[keyof TypedArrayMap];
  #curSize = 0;

  get head(): number {
    return this.#array[this.#curSize - 1];
  }

  constructor(type: TypedArray, size: number) {
    this.#array = typedArrayMap[type](size);
  }

  isEmpty() {
    return this.#curSize === 0;
  }

  isFull() {
    return this.#curSize === this.#array.length;
  }

  push(value: number) {
    if (this.isFull()) {
      throw new Error("Stack is fulled. Can't push value");
    }
    this.#array[this.#curSize] = value;
    this.#curSize++;
  }

  pop(): number {
    if (this.isEmpty()) {
      throw new Error("Stack is fulled. Can't push value");
    }
    const elem = this.#array[this.#curSize - 1];
    this.#array[this.#curSize - 1] = 0;
    this.#curSize--;
    return elem;
  }
}
