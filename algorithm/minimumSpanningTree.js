class DisjointSet {
  constructor(n) {
    this.parents = Array.from({ length: n }, (_, i) => i);
    this.count = 0;
    this.cost = 0;
  }

  find(node) {
    if (this.parents[node] !== node) {
      this.parents[node] = this.find(this.parents[node]);
    }
    return this.parents[node];
  }

  union(nodeA, nodeB, cost) {
    const parentA = this.find(nodeA);
    const parentB = this.find(nodeB);

    this.count += 1;
    this.cost += cost;

    if (parentA < parentB) {
      this.parents[parentB] = nodeA;
      return;
    }

    this.parents[parentA] = nodeB;
  }
}

/**
 *
 * @param {[number, number, number][]} edges: [nodeA, nodeB, cost][]
 * @param {number} size
 * @returns {DisjointSet}
 */
function getMinSpanningTree(edges, size) {
  const minSpanningTree = new DisjointSet(size);

  edges.sort((nodeA, nodeB) => nodeA[2] - nodeB[2]);

  edges.forEach(([nodeA, nodeB, cost]) => {
    if (minSpanningTree.find(nodeA) !== minSpanningTree.find(nodeB)) {
      minSpanningTree.union(nodeA, nodeB, cost);
    }
  });

  return minSpanningTree;
}
