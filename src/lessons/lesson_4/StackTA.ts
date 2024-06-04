import { TypedArray, TypedArrayConstructor } from '../lesson_1/createBitGetter/types/TypedArray';

export class StackTA<T extends TypedArrayConstructor> {
  protected array: TypedArray;
  protected headPointer: number | null = null;
  constructor(typedArrayConstructor: T, size: number) {
    this.array = new typedArrayConstructor(size);
  }
  isFull() {
    return this.headPointer !== null && this.array.length === this.headPointer + 1;
  }
  isEmpty() {
    return this.headPointer === null;
  }
  push(num: number): void {
    if (this.isFull()) {
      throw Error('Is full stack TA');
    }
    this.headPointer = this.headPointer !== null ? ++this.headPointer : 0;
    this.array[this.headPointer] = num;
  }
  pop(): number {
    if (this.isEmpty()) {
      throw Error('Is empty stack TA');
    }
    const result = this.array.at(this.headPointer);
    this.headPointer = this.headPointer !== 0 ? --this.headPointer : null;
    return result;
  }
  get head(): number | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.array.at(this.headPointer);
  }
}
