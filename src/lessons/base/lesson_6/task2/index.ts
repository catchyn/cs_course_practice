import { Matrix3D } from '../../../../common/Matrix3d';

const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

matrix.set({ x: 1, y: 3, z: 2 }, 10);
console.log(matrix.get({ x: 1, y: 3, z: 2 }));
