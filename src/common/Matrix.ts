import { Coordinates } from '../types/Coordinates';

export class Matrix<T> {
  #buffer: T[];
  #row: number;
  #col: number;

  constructor({ x, y, defaultValue }: { x: number; y: number; defaultValue: T }) {
    this.#col = y;
    this.#row = x;
    this.#buffer = new Array(this.#col * this.#row).fill(defaultValue);
  }

  get(coords: Coordinates): T {
    const validCoords = this.#assertCoordinates(coords);
    return this.#buffer[this.#getIndex(validCoords)];
  }

  set(coords: Coordinates, value: T): void {
    const validCoords = this.#assertCoordinates(coords);
    this.#buffer[this.#getIndex(validCoords)] = value;
  }

  #getIndex({ x, y }: Coordinates): number {
    return this.#col * x + y;
  }

  #assertCoordinates({ x, y }: Coordinates): Coordinates {
    if (x < 0 || x >= this.#row) {
      throw Error('Error. Out of bounds. Coordinate X is wrong.');
    } else if (y < 0 || y >= this.#col) {
      throw Error('Error. Out of bounds. Coordinate Y is wrong.');
    }

    return { x, y };
  }
}
