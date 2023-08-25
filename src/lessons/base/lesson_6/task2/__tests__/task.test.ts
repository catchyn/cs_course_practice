import { Matrix3D } from '../../../../../common/Matrix3d';

describe('Test lesson 6, task 2', () => {
  let matrix: Matrix3D;

  beforeEach(() => {
    matrix = new Matrix3D({ x: 10, y: 10, z: 10 });
  });

  it('Default test case', () => {
    matrix.set({ x: 1, y: 3, z: 2 }, 10);
    expect(matrix.get({ x: 1, y: 3, z: 2 })).toBe(10);
  });

  it('Reassign value in lower element', () => {
    matrix.set({ x: 0, y: 0, z: 0 }, -1);
    matrix.set({ x: 0, y: 0, z: 0 }, 5);
    expect(matrix.get({ x: 0, y: 0, z: 0 })).toBe(5);
  });

  it('Method get. Check throw error out of bounds X.', () => {
    expect(() => matrix.get({ x: 12, y: 0, z: 0 })).toThrow(
      'Error. Out of bounds. Coordinate X is wrong.',
    );
  });

  it('Method get. Check throw error out of bounds Y.', () => {
    expect(() => matrix.get({ x: 5, y: -2, z: 0 })).toThrow(
      'Error. Out of bounds. Coordinate Y is wrong.',
    );
  });

  it('Method get. Check throw error out of bounds Z.', () => {
    expect(() => matrix.get({ x: 5, y: 3, z: 2 ** 22 })).toThrow(
      'Error. Out of bounds. Coordinate Z is wrong.',
    );
  });

  it('Method set. Check throw error out of bounds X.', () => {
    expect(() => matrix.get({ x: 10, y: 0, z: 0 })).toThrow(
      'Error. Out of bounds. Coordinate X is wrong.',
    );
  });

  it('Method set. Check throw error out of bounds Y.', () => {
    expect(() => matrix.get({ x: 5, y: 10, z: 0 })).toThrow(
      'Error. Out of bounds. Coordinate Y is wrong.',
    );
  });

  it('Method set. Check throw error out of bounds Z.', () => {
    expect(() => matrix.get({ x: 5, y: 3, z: 10 })).toThrow(
      'Error. Out of bounds. Coordinate Z is wrong.',
    );
  });
});
