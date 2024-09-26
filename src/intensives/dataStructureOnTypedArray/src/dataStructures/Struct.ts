import { DataStructure } from './DataStructure';

export class Struct<K extends string | number | symbol> {
  schemeMap: Map<K, DataStructure>;
  private totalLength = 0;

  get byteLength() {
    return this.totalLength;
  }

  constructor(scheme: { [key in K]: DataStructure }) {
    const res = [];
    this.schemeMap = new Map(
      Object.entries<DataStructure>(scheme).flatMap(([key, dataStructure]) => {
        const byteToAlign = this.totalLength % (dataStructure.alignment ?? 1);
        if (byteToAlign !== 0) {
          res.push([
            Symbol('alignment'),
            {
              byteLength: byteToAlign,
              init: {
                set: () => null,
                get: () => null,
              },
            },
          ]);
          this.totalLength += byteToAlign;
        }

        res.push([
          key,
          {
            byteLength: dataStructure.byteLength,
            init: dataStructure.init.bind(dataStructure),
          },
        ]);

        this.totalLength += dataStructure.byteLength;

        return res;
      }),
    );
  }
  init(buffer: ArrayBufferLike, offset: number) {
    let view = this.from(buffer, offset);
    return {
      get: () => view,
      set: (data: { [key in K]: unknown }) => {
        view = this.create(data, buffer, offset);
      },
    };
  }
  create(data: { [key in K]: unknown }, buffer = new ArrayBuffer(this.byteLength), offset = 0) {
    const view = new StructView(buffer, this.byteLength, offset);
    this.schemeMap.forEach((type, key) => {
      if (typeof key !== 'symbol') {
        const { get, set } = type.init(buffer, offset);
        set(data[key]);
        Object.defineProperty(view, key, {
          enumerable: true,
          configurable: true,
          get() {
            return get();
          },
          set(value) {
            set(value);
          },
        });
      }
      offset += type.byteLength;
    });
    return view;
  }

  from(buffer: ArrayBufferLike, offset = 0) {
    const view = new StructView(buffer, this.byteLength, offset);
    this.schemeMap.forEach((type, key) => {
      const currentOffset = offset;
      let initializedType: ReturnType<typeof type.init>;
      if (typeof key !== 'symbol') {
        Object.defineProperty(view, key, {
          enumerable: true,
          configurable: true,
          get() {
            return init().get();
          },
          set(value) {
            init().set(value);
          },
        });
      }
      function init() {
        if (initializedType) {
          return initializedType;
        }
        return type.init(buffer, currentOffset);
      }
      offset += type.byteLength;
    });
    return view;
  }
}

class StructView {
  #buffer: ArrayBufferLike;
  #offset: number;
  #byteLength: number;

  get buffer() {
    return this.#buffer;
  }
  get byteOffset() {
    return this.#offset;
  }
  get byteLength() {
    return this.#byteLength;
  }

  constructor(buffer: ArrayBufferLike, byteLength: number, offset = 0) {
    this.#byteLength = byteLength;
    this.#offset = offset;
    this.#buffer = buffer;
  }
}
