import { Coordinates3D } from '../types/Coordinates3D';

export class Matrix3D {
  #buffer: (number | null)[];
  #row: number;
  #col: number;
  #layer: number;

  constructor({ x, y, z }: Coordinates3D) {
    this.#col = x;
    this.#row = y;
    this.#layer = z;
    this.#buffer = new Array(this.#col * this.#row * this.#layer).fill(null);
  }

  get(coords: Coordinates3D): number | null {
    const validCoords = this.#assertCoordinates(coords);
    return this.#buffer[this.#getIndex(validCoords)];
  }

  set(coords: Coordinates3D, value: number | null): void {
    const validCoords = this.#assertCoordinates(coords);
    this.#buffer[this.#getIndex(validCoords)] = value;
  }

  #getIndex({ x, y, z }: Coordinates3D): number {
    return this.#col * this.#row * z + this.#col * y + x;
  }

  #assertCoordinates({ x, y, z }: Coordinates3D): Coordinates3D {
    if (x < 0 || x >= this.#col) {
      throw Error('Error. Out of bounds. Coordinate X is wrong.');
    } else if (y < 0 || y >= this.#row) {
      throw Error('Error. Out of bounds. Coordinate Y is wrong.');
    } else if (z < 0 || z >= this.#layer) {
      throw Error('Error. Out of bounds. Coordinate Z is wrong.');
    }

    return { x, y, z };
  }
}
