import { TypedArray, TypedArrayConstructor } from '../lesson_1/createBitGetter/types/TypedArray';

export type VectorOptions = {
  capacity: number;
};

/**
 * Реализация абстрактной структуры данных Vector интерфейса Dequeue
 * на базе типизированного массива
 */
export class Vector {
  private array: TypedArray;
  private _capacity: number;
  private readonly minCapacity: number;
  private capacityKey = 2;
  private endPointer = 0;
  private startPointer = -1;
  private Type: TypedArrayConstructor;

  constructor(Type: TypedArrayConstructor, opt: VectorOptions) {
    this.array = new Type(opt.capacity);
    this._capacity = this.minCapacity = opt.capacity;
    this.Type = Type;
  }

  get capacity(): number {
    return this._capacity;
  }

  get length(): number {
    if (this.isEmpty()) {
      return 0;
    }
    return this.endPointer - this.startPointer;
  }

  circleCapacity(value: number) {
    return (value + this._capacity) % this._capacity;
  }

  getOrder(): 'regular' | 'inverse' {
    if (this.startPointer <= this.endPointer) {
      return 'regular';
    }
    return 'inverse';
  }

  addCapacity() {
    this.extendArrayCapacity(this._capacity * this.capacityKey);
  }

  extendArrayCapacity(newCapacity: number): void {
    if (this.isEmpty()) {
      return;
    }
    const order = this.getOrder();
    const oldCapacity = this._capacity;
    this._capacity = newCapacity;
    const newArray = new this.Type(this._capacity);
    if (order === 'regular') {
      for (let i = 0; i < this.endPointer - this.startPointer; i++) {
        newArray[i] = this.array[this.startPointer + i];
      }
    } else if (order === 'inverse') {
      for (let i = 0; i < this.endPointer; i++) {
        newArray[i] = this.array[i];
      }
      for (let i = this.startPointer; i < this._capacity; i++) {
        newArray[this._capacity - (oldCapacity - i)] = this.array[i];
      }
    }

    this.array = newArray;
  }

  minusCapacity() {
    const nextQuadCapacity = Math.floor(this._capacity / this.capacityKey ** 2);
    const nextCapacity = Math.floor(this._capacity / this.capacityKey ** 2);
    if (nextQuadCapacity > this.endPointer - 1 && nextQuadCapacity >= this.minCapacity) {
      this.extendArrayCapacity(nextQuadCapacity);
    } else if (nextCapacity > this.endPointer - 1 && nextCapacity >= this.minCapacity) {
      this.extendArrayCapacity(nextCapacity);
    }
  }

  isFull(): boolean {
    return this.startPointer === this.endPointer;
  }

  isEmpty(): boolean {
    return this.startPointer === -1;
  }

  push(...values: number[]) {
    values.forEach((value) => {
      this.pushSingle(value);
    });
  }

  pushSingle(value: number) {
    if (this.isEmpty()) {
      this.startPointer = 0;
    } else if (this.isFull()) {
      this.addCapacity();
    }
    this.array[this.endPointer] = value;
    this.endPointer = this.circleCapacity(this.endPointer + 1);
  }

  unshift(value: number) {
    if (this.isEmpty()) {
      this.startPointer = 0;
    } else if (this.isFull()) {
      this.addCapacity();
    }
    this.startPointer = this.circleCapacity(this.startPointer - 1);
    this.array[this.startPointer] = value;
  }

  pop() {
    if (this.isEmpty()) {
      throw Error('Is empty stack TA');
    }
    this.minusCapacity();
    const value = this.array[this.circleCapacity(this.endPointer - 1)];
    this.endPointer = this.circleCapacity(this.endPointer - 1);
    if (this.isEmpty()) {
      this.startPointer = -1;
      this.endPointer = 0;
    }
    return value;
  }

  shift() {
    if (this.isEmpty()) {
      throw Error('Is empty stack TA');
    }
    this.minusCapacity();
    const value = this.array[this.startPointer];
    this.startPointer = this.circleCapacity(this.startPointer + 1);
    if (this.isEmpty()) {
      this.startPointer = -1;
      this.endPointer = 0;
    }
    return value;
  }
  *[Symbol.iterator]() {
    for (let i = this.startPointer; i < this.endPointer; i = this.circleCapacity(i + 1)) {
      yield this.array[i];
    }
  }
}
