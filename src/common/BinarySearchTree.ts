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
      } if (isLeft) {
        parentNode.left = currentNode.left
      } else {
        parentNode.right = currentNode.left;
      }
    } else if (parentNode && !currentNode.left) {
      if (currentNode === this.#root) {
        this.#root = currentNode.right;
      } if (isLeft) {
        parentNode.left = currentNode.right
      } else {
        parentNode.right = currentNode.right;
      }

    // 3. Два потомка
    } else if () {

    }

    return true;
  }

  #getSuccessor(value: TreeNode<T> | null): TreeNode<T> | null {
    if (!value) {
      return null;
    }
  }
}
