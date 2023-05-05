/**
 * ## Класс бинарного дерева поиска с поддержкой вставки и удаления, а также АПИ для организации обходов
 *
 * Необходимо расширить класс из лекции и добавить поддержку добавления и удаления элементов.
 * Реализовать АПИ для обхода дерева в глубину (почитать про прямой, обратный и симметричные обходы) и ширину.
 */

import { BinarySearchTree } from '../../../common/BinarySearchTree';

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
