import { DataStructure } from './DataStructure';

export class TypedArray<T> {
  readonly #byteLength: number;
  readonly #schema: DataStructure<unknown>;
  readonly #length: number;

  get byteLength() {
    return this.#byteLength;
  }

  get length() {
    return this.#length;
  }

  constructor(schema: DataStructure<unknown>, length: number) {
    this.#schema = schema;
    this.#byteLength = schema.byteLength * length;
    this.#length = length;
  }

  init(buffer: ArrayBufferLike, offset: number) {
    let view = this.from(buffer, offset);
    return {
      get: () => view,
      set: (data) => {
        view = this.create(data, buffer, offset);
      },
    };
  }
  create(
    data: T[],
    buffer: ArrayBufferLike = new ArrayBuffer(this.byteLength),
    offset = 0,
  ): TypedArrayView<T> {
    const view = new TypedArrayView<T>(this.#schema, buffer, this.byteLength, offset);
    for (let i = 0; i < data.length && i < this.length; i++) {
      view.set(i, data[i]);
    }
    return view;
  }
  from(buffer: ArrayBufferLike, offset = 0) {
    return new TypedArrayView(this.#schema, buffer, this.byteLength, offset);
  }
}

class TypedArrayView<T> {
  #buffer: ArrayBufferLike;
  #byteLength: number;
  #byteOffset: number;
  #schema: DataStructure<unknown>;

  get byteLength() {
    return this.#byteLength;
  }

  get byteOffset() {
    return this.#byteOffset;
  }

  get buffer() {
    return this.#buffer;
  }

  constructor(
    schema: DataStructure<unknown>,
    buffer: ArrayBufferLike,
    byteLength: number,
    offset: number,
  ) {
    this.#buffer = buffer;
    this.#byteLength = byteLength;
    this.#byteOffset = offset;
    this.#schema = schema;
  }

  get(index: number) {
    return this.init(index).get();
  }
  set(index: number, value: T) {
    this.init(index).set(value);
  }
  private init(index: number) {
    return this.#schema.init(this.#buffer, this.byteOffset + index * this.#schema.byteLength);
  }
}
