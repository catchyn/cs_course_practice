import { Graph, Vertex } from '../../../common/Graph';

console.log('\nnon oriented graph\n');

const graph = new Graph('NON_ORIENTED', 10);
graph.addVertex(new Vertex({ name: 'A' }));
graph.addVertex(new Vertex({ name: 'B' }));
graph.addVertex(new Vertex({ name: 'D' }));
graph.addVertex(new Vertex({ name: 'E' }));
graph.addVertex(new Vertex({ name: 'C' }));

graph.addEdge(0, 1);
graph.addEdge(1, 2);
graph.addEdge(0, 3);
graph.addEdge(3, 4);

graph.display();

console.log('\n-- adjacent'); // true
console.log(graph.isAdjacentByIndex(0, 1)); // true
console.log(graph.isAdjacentByIndex(3, 5)); // true
console.log(graph.isAdjacentByIndex(3, 0)); // false

let dfsStr = '';
for (const data of graph.dfsNonOriented()) {
  dfsStr += data.name;
}
console.log('\nDFS: ', dfsStr);

let bfsStr = '';
for (const data of graph.bfsNonOriented()) {
  bfsStr += data.name;
}
console.log('\nBFS: ', bfsStr);

console.log('\noriented graph\n');

const orGraph = new Graph('ORIENTED', 8);
orGraph.addVertex(new Vertex({ name: 'A' }));
orGraph.addVertex(new Vertex({ name: 'B' }));
orGraph.addVertex(new Vertex({ name: 'C' }));
orGraph.addVertex(new Vertex({ name: 'D' }));
orGraph.addVertex(new Vertex({ name: 'E' }));
orGraph.addVertex(new Vertex({ name: 'F' }));
orGraph.addVertex(new Vertex({ name: 'G' }));
orGraph.addVertex(new Vertex({ name: 'H' }));
orGraph.addEdge(0, 3);
orGraph.addEdge(0, 4);
orGraph.addEdge(1, 4);
orGraph.addEdge(2, 5);
orGraph.addEdge(3, 6);
orGraph.addEdge(4, 6);
orGraph.addEdge(5, 7);
orGraph.addEdge(6, 7);
orGraph.display();

console.log('\n-- topological sort');
console.log(orGraph.topologicalSort().reduce((acc, item) => acc + item, ''));

console.log('\n-- delete');
orGraph.deleteVertex(1);
orGraph.display();

console.log('\n-- transitive closure');
const orGraph1 = new Graph('ORIENTED', 5);
orGraph1.addVertex(new Vertex({ name: 'A' }));
orGraph1.addVertex(new Vertex({ name: 'B' }));
orGraph1.addVertex(new Vertex({ name: 'C' }));
orGraph1.addVertex(new Vertex({ name: 'D' }));
orGraph1.addVertex(new Vertex({ name: 'E' }));
orGraph1.addEdge(0, 2);
orGraph1.addEdge(1, 0);
orGraph1.addEdge(1, 4);
orGraph1.addEdge(3, 4);
orGraph1.addEdge(4, 2);
orGraph1.display();
console.log('\n');
orGraph1.transitiveClosure();
orGraph1.display();
