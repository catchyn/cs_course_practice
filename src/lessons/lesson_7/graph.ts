// Граф можно создать через
// 1. матрицу смежности
// 2. список смежности
// 3. матрицу инцидентности

export interface IVertex<T> {
  name: string;
  value?: T;
}

export interface IEdge<T> {
  start: IVertex<T>;
  end: IVertex<T>;
  value?: number;
}

export interface IGraph<T> {
  adjacent(V1: IVertex<T>, V2: IVertex<T>);
  neighbors(V: IVertex<T>): IVertex<T>[];
  add_vertex(V: IVertex<T>);
  remove_vertex(V: IVertex<T>);
  add_edge(value: IEdge<T>['value'], V1: IVertex<T>, V2: IVertex<T>);
  remove_edge(V1: IVertex<T>, V2: IVertex<T>);
  get_vertex_value(V: IVertex<T>): number;
  set_vertex_value(V: IVertex<T>, value: number);
  get_edge_value(E: IEdge<T>): number;
  set_edge_value(E: IEdge<T>, value: number);
  display(): void;
}
