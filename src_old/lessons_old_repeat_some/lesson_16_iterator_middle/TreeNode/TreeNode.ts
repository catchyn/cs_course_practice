enum TreeNodeState {
  'current' = 'current',
  'left' = 'left',
  'right' = 'right',
}

class TreeNode<T> implements Iterable<T> {
  protected value: T;
  protected left: TreeNode<T> | null;
  protected right: TreeNode<T> | null;

  constructor(value: T, { left, right }: { left?: TreeNode<T>; right?: TreeNode<T> } = {}) {
    this.left = left ?? null;
    this.right = right ?? null;
    this.value = value;
  }

  [Symbol.iterator](): IterableIterator<T> {
    let state = TreeNodeState.current;
    let cursor: IterableIterator<T> | null = null;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (state === TreeNodeState.current) {
          state = TreeNodeState.left;
          return {
            value: this.value,
            done: false,
          };
        }
        if (state === TreeNodeState.left) {
          if (this.left === null) {
            state = TreeNodeState.right;
          } else {
            cursor ??= this.left[Symbol.iterator]();
            const chunk = cursor.next();
            if (chunk.done) {
              state = TreeNodeState.right;
              cursor = null;
            } else {
              return chunk;
            }
          }
        }

        if (this.right === null) {
          return { done: true, value: undefined };
        }
        cursor ??= this.right[Symbol.iterator]();
        return cursor.next();
      },
    };
  }
}

export { TreeNode };
