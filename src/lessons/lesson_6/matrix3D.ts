export type Coords = { x: number; y: number; z: number };
export type Size = { x: number; y: number; z: number };

export class Matrix3D<T> {
  private readonly array: T[];
  private size: Size;

  constructor({ x, y, z }: { x: number; y: number; z: number }) {
    this.array = new Array(x * y * z).fill(undefined);
    this.size = { x, y, z };
  }

  set(point: Coords, value: T) {
    this.checkPoint(point);
    this.array[this.fromCoordsToIndex(point)] = value;
  }

  get(point: Coords): T {
    return this.array[this.fromCoordsToIndex(point)];
  }

  private fromCoordsToIndex({ x, y, z }: Coords): number {
    return z * this.size.y * this.size.x + y * this.size.x + x;
  }

  private checkPoint({ x, y, z }: Coords) {
    if (x >= this.size.x) {
      throw Error(`Координата X значение:${x} выходит за пределы диапазона ${this.size.x}`);
    }
    if (y >= this.size.y) {
      throw Error(`Координата X значение:${y} выходит за пределы диапазона ${this.size.y}`);
    }
    if (z >= this.size.z) {
      throw Error(`Координата X значение:${z} выходит за пределы диапазона ${this.size.z}`);
    }
  }
}
