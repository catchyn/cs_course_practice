import { TypedArray, TypedArrayType } from '../types/TypedArray';

export class Stack {
  #array: TypedArray;
  #curSize = 0;

  get head(): number {
    return this.#array[this.#curSize - 1];
  }

  constructor(typedArray: TypedArrayType, size: number) {
    this.#array = new typedArray(size);
  }

  isEmpty() {
    return this.#curSize === 0;
  }

  isFull() {
    return this.#curSize === this.#array.length - 1;
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
      throw new Error("Stack is empty. Can't pop value");
    }
    const elem = this.#array[this.#curSize - 1];
    this.#array[this.#curSize - 1] = 0;
    this.#curSize--;
    return elem;
  }
}
