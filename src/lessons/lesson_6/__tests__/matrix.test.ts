import { Matrix3D } from '../matrix3D';

describe('Matrix', () => {
  test('Matrix', () => {
    const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

    matrix.set({ x: 1, y: 3, z: 2 }, 10);
    expect(matrix.get({ x: 1, y: 3, z: 2 })).toBe(10);
  });
});
