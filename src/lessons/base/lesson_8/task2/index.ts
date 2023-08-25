/**
 * ## Класс бинарного дерева поиска с поддержкой вставки и удаления, а также АПИ для организации обходов
 *
 * Необходимо расширить класс из лекции и добавить поддержку добавления и удаления элементов.
 * Реализовать АПИ для обхода дерева в глубину (почитать про прямой, обратный и симметричные обходы) и ширину.
 */

import { BinarySearchTree } from '../../../../common/BinarySearchTree';

console.log('\n-- create binary search Tree');
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(15);
tree.insert(25);
tree.insert(35);
tree.insert(5);
console.log(tree.root);

console.log('\n-- inOrder traverse');
const arr = [];
for (const value of tree.inOrder()) {
  arr.push(value);
}
console.log(arr);

console.log('\n-- delete node');
tree.delete(20);
console.log(tree.root);

console.log('\n-- bfs with node level');
const obj = new Map();
for (const [nodeValue, level] of tree.bfs()) {
  if (!obj.get(level)) {
    obj.set(level, [nodeValue]);
  } else {
    obj.get(level).push(nodeValue);
  }
}
console.log(obj);
