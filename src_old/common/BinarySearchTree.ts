import { Queue } from './Queue';

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class BinarySearchTree<T> {
  #root: TreeNode<T> | null = null;

  get root() {
    return this.#root;
  }

  insert(value: T): void {
    const node = new TreeNode(value);
    if (!this.#root) {
      this.#root = node;
    } else {
      let current: TreeNode<T> | null = this.#root;
      while (current) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            return;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = node;
            return;
          }
          current = current.right;
        }
      }
    }
  }

  *preOrder(node?: TreeNode<T> | null): Generator<T> {
    if (node === undefined) {
      node = this.#root;
    }

    if (node !== null) {
      yield node.value;
      yield* this.preOrder(node.left);
      yield* this.preOrder(node.right);
    }
  }

  *inOrder(node?: TreeNode<T> | null): Generator<T> {
    if (node === undefined) {
      node = this.#root;
    }

    if (node !== null) {
      yield* this.inOrder(node.left);
      yield node.value;
      yield* this.inOrder(node.right);
    }
  }

  *postOrder(node?: TreeNode<T> | null): Generator<T> {
    if (node === undefined) {
      node = this.#root;
    }

    if (node !== null) {
      yield* this.postOrder(node.left);
      yield* this.postOrder(node.right);
      yield node.value;
    }
  }

  *bfs(): Generator<[T, number]> {
    const q = new Queue<[TreeNode<T>, number]>();
    if (!this.#root) {
      return;
    }
    q.push([this.#root, 0]);
    while (!q.isEmpty()) {
      const [current, currentLevel] = q.pop();
      current.left && q.push([current.left, currentLevel + 1]);
      current.right && q.push([current.right, currentLevel + 1]);
      yield [current.value, currentLevel];
    }
  }

  delete(value: T): boolean {
    let currentNode = this.#root,
      parentNode = this.#root,
      isLeft = false;

    // Поиск
    while (currentNode && currentNode?.value !== value) {
      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        isLeft = true;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
        isLeft = false;
      }
    }

    if (!currentNode) {
      return false;
    }

    // 1. Нет потомков
    if (parentNode && !currentNode.right && !currentNode.left) {
      if (currentNode === this.#root) {
        this.#root = null;
      } else if (isLeft) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }

      // 2. Один потомок
    } else if (parentNode && !currentNode.right) {
      if (currentNode === this.#root) {
        this.#root = currentNode.left;
      }
      if (isLeft) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    } else if (parentNode && !currentNode.left) {
      if (currentNode === this.#root) {
        this.#root = currentNode.right;
      }
      if (isLeft) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }

      // 3. Два потомка
    } else if (parentNode) {
      const successor = this.#getSuccessor(currentNode);
      if (currentNode === this.#root) {
        this.#root = successor;
      } else if (isLeft) {
        parentNode.left = successor;
      } else {
        parentNode.right = successor;
      }
      successor.left = currentNode.left;
    }

    return true;
  }

  #getSuccessor(value: TreeNode<T> | null): TreeNode<T> {
    if (!value) {
      throw Error(
        'Поиск приемника должен происходить только в соответствующем случае, когда преемник точно есть.',
      );
    }

    let successor = value;
    let successorParent = value;
    let current = value?.right;

    while (current) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    if (successor !== value.right) {
      if (successorParent && successor) {
        successorParent.left = successor.right;
        successor.right = value.right;
      }
    }

    return successor;
  }
}
