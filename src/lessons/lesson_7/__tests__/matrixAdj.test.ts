import { MatrixAdjacencyGraph, Vertex } from '../matrixAdjacencyGraph';

describe('matrixAdj test', () => {
  test('test', () => {
    const graph = new MatrixAdjacencyGraph();
    const VA = new Vertex('A');
    const VB = new Vertex('B');
    const VC = new Vertex('C');
    const VD = new Vertex('D');
    graph.add_vertex(VA);
    graph.add_vertex(VB);
    graph.add_vertex(VC);
    graph.add_edge(1, VA, VB);
    graph.add_edge(1, VB, VC);
    graph.add_vertex(VD);
    graph.add_edge(1, VA, VD);
    graph.add_edge(1, VD, VC);
    graph.display();
    graph.remove_edge(VA, VB);
    graph.display();
    graph.remove_vertex(VB);
    graph.display();
    expect(graph.adjacent(VA, VD)).toBe(true);
  });
});
