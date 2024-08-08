export type Coords = { x: number; y: number };
export type Size = { x: number; y: number };

export class Matrix2D<T> {
  protected array: T[];
  protected size: Size;

  constructor({ x, y }: { x: number; y: number }) {
    this.array = new Array(x * y);
    this.size = { x, y };
  }

  set(point: Coords, value: T) {
    this.checkPoint(point);
    this.array[this.fromCoordsToIndex(point)] = value;
  }

  get(point: Coords): T {
    this.checkPoint(point);
    return this.array[this.fromCoordsToIndex(point)];
  }

  private fromCoordsToIndex({ x, y }: Coords): number {
    return y * this.size.y + x;
  }

  private checkPoint({ x, y }: Coords) {
    if (x >= this.size.x) {
      throw Error(`Координата X значение:${x} выходит за пределы диапазона ${this.size.x}`);
    }
    if (y >= this.size.y) {
      throw Error(`Координата X значение:${y} выходит за пределы диапазона ${this.size.y}`);
    }
  }
}
