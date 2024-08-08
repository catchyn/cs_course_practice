import { Matrix2D } from '../lesson_6/matrix2D';
import { IEdge, IGraph, IVertex } from './graph';

interface IVertexAdj extends IVertex<number> {
  index: number;
}
interface IEdgeAdj extends IEdge<number> {
  start: IVertexAdj;
  end: IVertexAdj;
}

export class MatrixAdjacencyGraph extends Matrix2D<IEdgeAdj | undefined> implements IGraph<number> {
  vertexes: Set<IVertexAdj> = new Set();

  constructor() {
    super({ x: 0, y: 0 });
  }

  add_edge(value: IEdgeAdj['value'], V1: IVertex<number>, V2: IVertex<number>) {
    const V1Adj = this.findVertex(V1);
    const V2Adj = this.findVertex(V2);
    if (V1Adj && V2Adj) {
      this.set({ x: V1Adj.index, y: V2Adj.index }, new Edge(V1Adj, V2Adj, value));
    }
  }

  add_vertex(V: IVertex<number>) {
    const VAdj = { ...V, index: this.vertexes.size };
    this.vertexes.add(VAdj);
    const array = [];
    for (let i = 0; i < this.vertexes.size; i++) {
      const lastRow = i === this.vertexes.size - 1;
      for (let j = 0; j < this.vertexes.size; j++) {
        const lastCol = j === this.vertexes.size - 1;
        let edge: IEdgeAdj | undefined;
        if (!lastRow && !lastCol) {
          edge = this.get({ x: j, y: i });
        }
        array.push(edge);
      }
    }
    this.size = { x: this.size.x + 1, y: this.size.y + 1 };
    this.array = array;
  }

  adjacent(V1: IVertex<number>, V2: IVertex<number>): boolean {
    const V1Adj = this.findVertex(V1);
    const V2Adj = this.findVertex(V2);
    if (V1Adj && V2Adj) {
      return Boolean(this.get({ x: V1Adj.index, y: V2Adj.index }));
    }
  }

  get_edge_value(E: IEdgeAdj): number | undefined {
    return E.value;
  }

  get_vertex_value(V: IVertexAdj): number {
    return V.value;
  }

  neighbors(V: IVertex<number>): IVertex<number>[] {
    const index = this.findVertex(V)?.index;
    if (!index) {
      return;
    }
    const vertexes = new Set<IVertexAdj>();
    for (let i = 0; i < this.size.y; i++) {
      const edge = this.get({ x: index, y: i });
      if (edge) {
        vertexes.add(edge.end);
      }
    }
    for (let i = 0; i < this.size.x; i++) {
      const edge = this.get({ x: i, y: index });
      if (edge) {
        vertexes.add(edge.start);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return [...vertexes].map(({ index, ...rest }) => rest);
  }

  remove_edge(V1: IVertex<number>, V2: IVertex<number>) {
    const V1Adj = this.findVertex(V1);
    const V2Adj = this.findVertex(V2);
    if (V1Adj && V2Adj) {
      this.set({ x: V1Adj.index, y: V2Adj.index }, undefined);
    }
  }

  remove_vertex(V: IVertex<number>) {
    const VAdj = this.findVertex(V);
    const index = VAdj.index;
    this.vertexes.delete(VAdj);
    [...this.vertexes].forEach((vertex, i) => {
      vertex.index = i;
    });
    const array = [];
    for (let i = 0; i < this.vertexes.size + 1; i++) {
      if (i === index) {
        continue;
      }
      for (let j = 0; j < this.vertexes.size + 1; j++) {
        if (j === index) {
          continue;
        }
        const edge: IEdgeAdj = this.get({ x: j, y: i });
        array.push(edge);
      }
    }
    this.size = { x: this.size.x - 1, y: this.size.y - 1 };
    this.array = array;
  }

  set_edge_value(E: IEdgeAdj, value: number) {
    E.value = value;
  }

  set_vertex_value(V: IVertex<number>, value: number) {
    V.value = value;
  }

  display() {
    let str = '\n\r';
    const vertexesArr = [...this.vertexes.values()].sort((a, b) => (a.index < b.index ? -1 : 1));
    for (let i = 0; i < this.size.y; i++) {
      if (i === 0) {
        str += '  ';
        vertexesArr.forEach(({ name }) => {
          str += name + '  ';
        });
        str += '\n\r';
      }
      for (let j = 0; j < this.size.y; j++) {
        if (j === 0) {
          str += vertexesArr[i].name + '';
        }
        str += ' ' + ((this.get({ x: j, y: i }) ? '1' : '0') || '') + ' ';
      }
      if (i < this.size.y - 1) {
        str += '\n\r';
      }
    }
    console.log(str);
  }

  private findVertex(V1: IVertex<number>): IVertexAdj {
    return [...this.vertexes].find((item) => item.name === V1.name);
  }
}

export class Edge implements IEdgeAdj {
  constructor(public start: IVertexAdj, public end: IVertexAdj, public value?: number) {}
}

export class Vertex implements IVertex<number> {
  constructor(public name: string, public value?: number) {}
}
