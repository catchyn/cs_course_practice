import { Matrix } from './Matrix';
import { Stack } from './Stack';
import { Queue } from './Queue';

export class Vertex<T extends { name: string }> {
  data: T;
  wasVisited: boolean;

  constructor(data: T) {
    this.wasVisited = false;
    this.data = data;
  }
}

export type GraphType = 'ORIENTED' | 'NON_ORIENTED';

/**
 * Неориентированный граф.
 */
export class Graph<T extends { name: string }> {
  /**
   * Матрица смежности.
   * @private
   */
  #objMatrix: Matrix<number>;
  /**
   * Список вершин.
   * @private
   */
  #vertexList: Vertex<T>[] = [];
  /**
   * Число вершин.
   * @private
   */
  #nVertex = 0;
  /**
   * Тип графа.
   * @private
   */
  #type: GraphType;

  constructor(type: GraphType, size: number) {
    this.#objMatrix = new Matrix({ x: size, y: size, defaultValue: 0 });
    this.#type = type;
  }

  addVertex(vertex: Vertex<T>) {
    this.#vertexList.push(vertex);
    this.#nVertex++;
  }

  addEdge(start: number, end: number, weight = 1) {
    if (this.#type === 'NON_ORIENTED') {
      this.#objMatrix.set({ x: start, y: end }, weight);
      this.#objMatrix.set({ x: end, y: start }, weight);
    } else if (this.#type === 'ORIENTED') {
      this.#objMatrix.set({ x: start, y: end }, weight);
    }
  }

  isAdjacentByIndex(vertexA: number, vertexB: number) {
    return this.#objMatrix.get({ x: vertexA, y: vertexB }) > 0;
  }

  isAdjacentByName(vertexAName: string, vertexBName: string) {
    const indexA = this.#vertexList.findIndex((value) => value.data.name === vertexAName);
    const indexB = this.#vertexList.findIndex((value) => value.data.name === vertexBName);
    return this.isAdjacentByIndex(indexA, indexB);
  }

  display() {
    let str = '';
    for (let i = 0; i < this.#nVertex; i++) {
      if (i === 0) {
        str += '  ';
        for (let j = 0; j < this.#nVertex; j++) {
          str += this.#vertexList[j].data.name + ' ';
        }
        str += '\n\r';
      }
      for (let j = 0; j < this.#nVertex; j++) {
        if (j === 0) {
          str += this.#vertexList[i].data.name + '';
        }
        str += ' ' + this.#objMatrix.get({ x: i, y: j }) || '' + ' ';
      }
      if (i < this.#nVertex - 1) {
        str += '\n\r';
      }
    }
    console.log(str);
  }

  getAdjUnvisitedVertex(vIndex: number): number {
    for (let i = 0; i < this.#nVertex; i++) {
      if (this.#objMatrix.get({ x: vIndex, y: i }) > 0 && !this.#vertexList[i].wasVisited) {
        return i;
      }
    }
    return -1;
  }

  isEmpty(): boolean {
    return this.#nVertex === 0;
  }

  deleteVertex(vIndex: number): Vertex<T> {
    const temp = this.#vertexList[vIndex];
    if (vIndex < this.#nVertex - 1) {
      this.#vertexList = this.#vertexList
        .slice(0, vIndex)
        .concat(this.#vertexList.slice(vIndex + 1));
      for (let row = vIndex; row < this.#nVertex - 1; row++) {
        for (let col = 0; col < this.#nVertex; col++) {
          this.#objMatrix.set({ x: row, y: col }, this.#objMatrix.get({ x: row + 1, y: col }));
        }
      }
      for (let col = vIndex; col < this.#nVertex - 1; col++) {
        for (let row = 0; row < this.#nVertex; row++) {
          this.#objMatrix.set({ x: row, y: col }, this.#objMatrix.get({ x: row, y: col + 1 }));
        }
      }
    }
    this.#nVertex--;
    return temp;
  }

  topologicalSort(): string[] {
    if (this.#type !== 'ORIENTED') {
      throw Error('Сортировка доступна только для орграфов.');
    }
    let node = this.#noSuccessor();
    if (node === null) {
      throw Error('Граф содержит циклы. Сортировка доступна для ацикличных орграфов.');
    }
    const set = new Set<string>();
    while (node !== null) {
      this.#vertexList[node].wasVisited = true;
      set.add(this.#vertexList[node].data.name);
      node = this.#noSuccessor();
    }
    this.#clearVisitedVertex();
    return Array.from(set).reverse();
  }

  /**
   * Реализует транзитивное замыкание для орграфа
   */
  transitiveClosure() {
    for (let row = 0; row < this.#nVertex; row++) {
      for (let col = 0; col < this.#nVertex; col++) {
        if (this.#objMatrix.get({ x: row, y: col }) > 0) {
          for (let startRow = 0; startRow < this.#nVertex; startRow++) {
            if (
              this.#objMatrix.get({ x: startRow, y: row }) > 0 &&
              this.#objMatrix.get({ x: startRow, y: col }) === 0
            ) {
              this.#objMatrix.set({ x: startRow, y: col }, 1);
            }
          }
        }
      }
    }
  }

  *dfsNonOriented() {
    if (this.isEmpty()) {
      throw Error('Граф пустой, добавьте вершины и ребра.');
    }
    this.#vertexList[0].wasVisited = true;
    const stack = new Stack<number>([0]);
    yield this.#vertexList[0].data;
    while (!stack.isEmpty()) {
      const vIndex = stack.peek() as number;
      const adjVertex = this.getAdjUnvisitedVertex(vIndex);
      if (adjVertex === -1) {
        stack.pop();
      } else {
        this.#vertexList[adjVertex].wasVisited = true;
        stack.push(adjVertex);
        yield this.#vertexList[adjVertex].data;
      }
    }
    this.#clearVisitedVertex();
  }

  *bfsNonOriented() {
    if (this.isEmpty()) {
      throw Error('Граф пустой, добавьте вершины и ребра.');
    }
    const q = new Queue<number>();
    this.#vertexList[0].wasVisited = true;
    q.push(0);
    yield this.#vertexList[0].data;
    let vIndex2;

    while (!q.isEmpty()) {
      const vIndex = q.pop();
      vIndex2 = this.getAdjUnvisitedVertex(vIndex);
      while (vIndex2 !== -1) {
        this.#vertexList[vIndex2].wasVisited = true;
        q.push(vIndex2);
        yield this.#vertexList[vIndex2].data;
        vIndex2 = this.getAdjUnvisitedVertex(vIndex);
      }
    }
    this.#clearVisitedVertex();
  }

  #clearVisitedVertex() {
    for (const vertex of this.#vertexList) {
      vertex.wasVisited = false;
    }
  }

  /**
   * Поиск ноды у которой нет приемников.
   */
  #noSuccessor(): number | null {
    for (let row = 0; row < this.#nVertex; row++) {
      let hasEdge = false;
      for (let col = 0; col < this.#nVertex; col++) {
        if (this.#objMatrix.get({ x: row, y: col }) > 0 && !this.#vertexList[col].wasVisited) {
          hasEdge = true;
          break;
        }
      }
      if (!hasEdge && !this.#vertexList[row].wasVisited) {
        return row;
      }
    }
    return null;
  }
}
