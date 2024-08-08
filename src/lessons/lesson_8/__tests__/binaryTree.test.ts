import { BinaryTree, BinaryTreeNode } from '../BinaryTree';

function createTree() {
  const tree = new BinaryTree(new BinaryTreeNode(50));

  tree.add(30);
  tree.add(70);
  tree.add(20);
  tree.add(80);
  tree.add(40);
  tree.add(60);

  return tree;
}

describe('test binary tree', () => {
  test('test binary tree', () => {
    const tree = createTree();
    tree.display();

    tree.delete(20);
    tree.display();
    //
    // tree.delete(30);
    // tree.display();
    //
    // tree.delete(50);
    // tree.display();
  });

  test('test binary tree bfs', () => {
    const tree = createTree();
    tree.display();
    expect(tree.bfs()).toEqual([50, 30, 70, 20, 40, 60, 80]);
  });

  test('test binary tree dfs in-order iterative', () => {
    const tree = createTree();
    tree.display();
    expect(tree.inOrderDepthFirstTraversalIterative()).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('test binary tree dfs in-order recursion', () => {
    const tree = createTree();
    tree.display();
    expect(tree.inOrderDepthFirstTraversalRecursion()).toEqual([20, 30, 40, 50, 60, 70, 80]);
  });

  test('test binary tree dfs pre-order iterative', () => {
    const tree = createTree();
    tree.display();
    expect(tree.preOrderDepthFirstTraversalIterative()).toEqual([50, 30, 20, 40, 70, 60, 80]);
  });

  test('test binary tree dfs pre-order recursion', () => {
    const tree = createTree();
    tree.display();
    expect(tree.preOrderDepthFirstTraversalRecursion()).toEqual([50, 30, 20, 40, 70, 60, 80]);
  });

  test('test binary tree dfs post-order recursion', () => {
    const tree = createTree();
    tree.display();
    expect(tree.postOrderDepthFirstTraversalRecursion()).toEqual([20, 40, 30, 60, 80, 70, 50]);
  });

  test('test binary tree dfs post-order iterative', () => {
    const tree = createTree();
    tree.display();
    expect(tree.postOrderDepthFirstTraversalIterative()).toEqual([20, 40, 30, 60, 80, 70, 50]);
  });

  test('test binary tree find "left"', () => {
    const tree = BinaryTree.createTreeFromArr(
      [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9].map((value, index) => ({ index, value })),
      (a, b) => a.value - b.value,
    );
    tree.display();
    const [node] = tree.find({ index: 0, value: 7 });
    expect(node.value.index).toEqual(6);
  });
});
