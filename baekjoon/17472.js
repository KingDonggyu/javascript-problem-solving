// https://www.acmicpc.net/problem/17472
// 17472: 다리 만들기 2
// 골드 1

const SEA = 0;

const direction = {
  x: [-1, 1, 0, 0],
  y: [0, 0, -1, 1],
};

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

function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}

function isOutOfBounds(x, y, rowSize, colSize) {
  return x < 0 || x >= rowSize || y < 0 || y >= colSize;
}

function setIslandNumber(map, startX, startY, islandNumber, visited) {
  const rowSize = map.length;
  const colSize = map[0].length;
  const stack = [[startX, startY]];

  map[startX][startY] = islandNumber;
  visited[startX][startY] = true;

  while (stack.length > 0) {
    const [x, y] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const nextX = x + direction.x[i];
      const nextY = y + direction.y[i];

      if (
        isOutOfBounds(nextX, nextY, rowSize, colSize) ||
        visited[nextX][nextY] ||
        map[nextX][nextY] === SEA
      ) {
        continue;
      }

      map[nextX][nextY] = islandNumber;
      visited[nextX][nextY] = true;
      stack.push([nextX, nextY]);
    }
  }
}

function getIslandInformation(N, M, map) {
  let islandNumber = 1;
  const copyMap = copyArray(map);
  const visited = Array.from({ length: N }, () => new Array(M).fill(false));

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (visited[x][y] || copyMap[x][y] === SEA) {
        continue;
      }
      setIslandNumber(copyMap, x, y, islandNumber, visited);
      islandNumber += 1;
    }
  }

  const island = { map: copyMap, count: islandNumber - 1 };
  return island;
}

function setMinBridgeLength(map, startX, startY, bridge) {
  const rowSize = map.length;
  const colSize = map[0].length;
  const startingIsland = map[startX][startY];
  const stack = Array.from({ length: 4 }, (_, i) => [startX, startY, -1, i]);
  const visited = Array.from({ length: rowSize }, () =>
    new Array(colSize).fill(false)
  );

  visited[startX][startY] = true;

  while (stack.length > 0) {
    const [x, y, bridgeLength, directionIndex] = stack.pop();

    if (map[x][y] !== SEA && map[x][y] !== startingIsland && bridgeLength > 1) {
      const endingIsland = map[x][y];
      bridge[startingIsland][endingIsland] = Math.min(
        bridge[startingIsland][endingIsland],
        bridgeLength
      );
      continue;
    }

    const nextX = x + direction.x[directionIndex];
    const nextY = y + direction.y[directionIndex];

    if (
      isOutOfBounds(nextX, nextY, rowSize, colSize) ||
      visited[nextX][nextY] ||
      map[nextX][nextY] === startingIsland
    ) {
      continue;
    }

    if (map[nextX][nextY] !== SEA && bridgeLength < 1) {
      continue;
    }

    visited[nextX][nextY] = true;
    stack.push([nextX, nextY, bridgeLength + 1, directionIndex]);
  }
}

function getMinBridgeLengths(N, M, island) {
  const bridge = Array.from({ length: island.count + 1 }, () =>
    new Array(island.count + 1).fill(Infinity)
  );

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (island.map[x][y] !== SEA) {
        setMinBridgeLength(island.map, x, y, bridge);
      }
    }
  }

  return bridge;
}

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

function solution(N, M, map) {
  const island = getIslandInformation(N, M, map);
  const bridge = getMinBridgeLengths(N, M, island);
  const edges = [];

  for (let islandA = 1; islandA <= island.count; islandA++) {
    for (let islandB = 1; islandB <= island.count; islandB++) {
      if (islandA !== islandB && isFinite(bridge[islandA][islandB])) {
        edges.push([islandA, islandB, bridge[islandA][islandB]]);
      }
    }
  }

  const minSpanningTree = getMinSpanningTree(edges, island.count + 1);

  if (minSpanningTree.count + 1 !== island.count) {
    return -1;
  }

  return minSpanningTree.cost;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line.split(' ').map((ch) => Number(ch)));
  const [N, M] = input[0];

  if (input.length === N + 1) {
    const answer = solution(N, M, input.slice(1));
    console.log(answer);
    rl.close();
  }
});
