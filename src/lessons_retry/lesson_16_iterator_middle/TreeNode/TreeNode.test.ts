import { TreeNode } from './TreeNode';

describe('Test TreeNode class', () => {
  it('simple test', () => {
    const tree = new TreeNode(10, {
      left: new TreeNode<number>(11, { right: new TreeNode<number>(12) }),
      right: new TreeNode<number>(13, { right: new TreeNode<number>(14) }),
    });
    expect([...tree]).toEqual([10, 11, 12, 13, 14]);
  });
});
