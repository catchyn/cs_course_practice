type FnComparator<T> = (a: T, b: T) => number;

export class BinaryTreeNode<T> {
  constructor(
    public value: T,
    public parent: BinaryTreeNode<T> | null = null,
    public left: BinaryTreeNode<T> | null = null,
    public right: BinaryTreeNode<T> | null = null,
  ) {}
}

export class BinaryTree<T> {
  constructor(
    protected root?: BinaryTreeNode<T>,
    protected comparator: FnComparator<T> = (a, b) => Number(a) - Number(b),
  ) {}

  static createTreeFromArr<T>(arr: T[], comparator?: FnComparator<T>) {
    const tree = new BinaryTree(null, comparator);
    arr.forEach((item) => {
      tree.add(item);
    });
    return tree;
  }

  add(value: T): void {
    if (!this.root) {
      this.root = new BinaryTreeNode(value);
      return;
    }
    let node = this.root;
    let parent: BinaryTreeNode<T> | null = null;
    while (node !== null) {
      parent = node;
      if (this.comparator(value, node.value) < 0) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    if (this.comparator(value, parent.value) < 0) {
      parent.left = new BinaryTreeNode(value, parent);
    } else {
      parent.right = new BinaryTreeNode(value, parent);
    }
  }

  find(
    value: T,
    root = this.root,
  ): [BinaryTreeNode<T> | null, BinaryTreeNode<T> | null, direct: 'left' | 'right'] {
    if (!this.root) {
      return null;
    }
    let node = root;
    let parent: BinaryTreeNode<T> | null = null;
    let direct: 'left' | 'right' = 'left';
    while (node !== null) {
      const k = this.comparator(value, node.value);
      if (k < 0) {
        parent = node;
        node = node.left;
        direct = 'left';
      } else if (k > 0) {
        parent = node;
        node = node.right;
        direct = 'right';
      } else {
        return [node, parent, direct];
      }
    }
    return [null, null, 'left'];
  }

  delete(value: T): void {
    const [node, parentNode, direct] = this.find(value);
    if (!node) {
      throw new Error('Узел не найден!');
    }
    // delete for 1 and 0 branches
    if (!node.left) {
      parentNode[direct] = node.right;
    } else if (!node.right) {
      parentNode[direct] = node.left;
    } else {
      // delete for 2 branches
      const minNode = this.minInSubTree(node.right);
      const temp = minNode.value;
      this.delete(minNode.value);
      node.value = temp;
    }
  }

  minInSubTree(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    let minNode = node;
    while (minNode.left !== null) {
      minNode = minNode.left;
    }
    return minNode;
  }

  maxInSubTree(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    let maxNode = node;
    while (maxNode.right !== null) {
      maxNode = maxNode.right;
    }
    return maxNode;
  }

  bfs(): T[] {
    if (!this.root) {
      return [];
    }
    const queue = [this.root];
    const result: T[] = [];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  inOrderDepthFirstTraversalRecursion(): T[] {
    if (!this.root) {
      return [];
    }
    const result = [];
    function traverse(node: BinaryTreeNode<T>) {
      if (!node) {
        return;
      }
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  preOrderDepthFirstTraversalRecursion(): T[] {
    if (!this.root) {
      return [];
    }
    const result = [];
    function traverse(node: BinaryTreeNode<T>) {
      if (!node) {
        return;
      }
      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  postOrderDepthFirstTraversalRecursion(): T[] {
    if (!this.root) {
      return [];
    }
    const result = [];
    function traverse(node: BinaryTreeNode<T>) {
      if (!node) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    }
    traverse(this.root);
    return result;
  }

  inOrderDepthFirstTraversalIterative(): T[] {
    if (!this.root) {
      return [];
    }
    const stack = [];
    const result = [];
    let current = this.root;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();

      result.push(current.value);

      current = current.right;
    }
    return result;
  }

  preOrderDepthFirstTraversalIterative(): T[] {
    if (!this.root) {
      return [];
    }
    const stack = [this.root];
    const result = [];

    while (stack.length > 0) {
      const current = stack.pop();
      result.push(current.value);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
    return result;
  }

  postOrderDepthFirstTraversalIterative(): T[] {
    if (!this.root) {
      return [];
    }
    const result: T[] = [];
    const stack = [];
    let current = this.root;
    let lastNode: BinaryTreeNode<T> | null = null;

    while (current !== null || stack.length > 0) {
      if (current !== null) {
        stack.push(current);
        current = current.left;
      } else {
        const peekNode = stack[stack.length - 1];
        if (peekNode.right && lastNode !== peekNode.right) {
          current = peekNode.right;
        } else {
          lastNode = stack.pop();
          result.push(peekNode.value);
        }
      }
    }

    return result;
  }

  /**
   * Display the tree to console.
   */
  display() {
    if (!this.root) {
      console.log('empty :)');
      return;
    }
    const arr = [];
    function goToNode(node: BinaryTreeNode<T>, level: number) {
      if (!node) {
        return;
      }
      goToNode(node.left, level + 1);
      goToNode(node.right, level + 1);
      arr.push([node.value, level]);
    }
    goToNode(this.root, 0);
    console.log(
      Object.values<number[]>(
        arr.reduce(
          (acc, [value, levelValue]) => ({
            ...acc,
            [String(levelValue)]: [...(acc[levelValue] || []), value],
          }),
          {},
        ),
      ).reduce((acc, values) => {
        acc += '\n' + values.join(' ');
        return acc;
      }, ''),
    );
  }
}
