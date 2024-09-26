export type DataStructure<Value = unknown> = {
  get byteLength(): number;
  alignment?: number;
  init(
    buffer: ArrayBufferLike,
    offset: number,
  ): {
    get(): Value;
    set(value: Value): void;
  };
};
