# 자바스크립트 알고리즘 문제 풀이 팁

## 목차

- [순열(Permutation)](#순열permutation)
- [중복 순열(Permuation with Repetition)](#중복-순열permuation-with-repetition)
- [조합(Combination)](#조합combination)
- [중복 조합(Combination with Repetition)](#중복-조합combination-with-repetition)
- [힙(Heap)](#힙heap)
- [큐(Queue)](#큐queue)
- [데크(deque)](#데크deque)
- [최소 신장 트리(Minimum Spanning Tree)](#최소-신장-트리minimum-spanning-tree)
- [위상 정렬(Topological Sort)](#위상-정렬topological-sort)
- [이분 탐색(Binary Search)](#이분-탐색binary-search)

## 순열(Permutation)

```js
function getPermutations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = [...items.slice(0, index), ...items.slice(index + 1)];
    const subPermutations = getPermutations(slicedItems, count - 1);
    subPermutations.forEach((currentPermutation) => {
      permutations.push([fixedItem, ...currentPermutation]);
    });
  });

  return permutations;
}
```

## 중복 순열(Permuation with Repetition)

```js
function getPermuationsWithRepetition(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem) => {
    const subPermutations = getPermuationsWithRepetition(items, count - 1);
    subPermutations.forEach((currentPermutation) => {
      permutations.push([fixedItem, ...currentPermutation]);
    });
  });

  return permutations;
}
```

## 조합(Combination)

```js
function getCombinations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const combinations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = items.slice(index + 1);
    const subCombinations = getCombinations(slicedItems, count - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([fixedItem, ...subCombination]);
    });
  });

  return combinations;
}
```

## 중복 조합(Combination with Repetition)

```js
function getCombinationsWithRepetition(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const combinations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = items.slice(index);
    const subCombinations = getCombinationsWithRepetition(slicedItems, count - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([fixedItem, ...subCombination]);
    });
  });

  return combinations;
}
```

## 힙(Heap)

> 아래 코드는 최소 힙(Min Heap)입니다.
> `heapifyUp`과 `heapifyDown` 메서드 내 비교 연산자만 반대로 변경하면 최대 힙(Max Heap)으로 사용할 수 있습니다.

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    this.#heapifyUp();
  }

  pop() {
    const count = this.heap.length;

    if (count === 0) {
      return;
    }

    if (count === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    const leaf = this.heap.pop();

    this.heap[0] = leaf;
    this.#heapifyDown();

    return root;
  }

  #heapifyUp() {
    let index = this.heap.length - 1;
    const pushed = this.heap[index];

    while (index > 0) {
      const parentIndex = this.#getParentIndex(index);
      const isMorePriority = this.heap[parentIndex] > pushed;

      if (!isMorePriority) {
        break;
      }

      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }

    this.heap[index] = pushed;
  }

  #heapifyDown() {
    let index = 0;
    const root = this.heap[index];
    const count = this.heap.length;

    while (this.#getLeftChildIndex(index) < count) {
      const leftChildIndex = this.#getLeftChildIndex(index);
      const rightChildIndex = this.#getRightChildIndex(index);

      const isSelectRightChild =
        rightChildIndex < count &&
        this.heap[rightChildIndex] < this.heap[leftChildIndex];

      const selectedChildIndex = isSelectRightChild
        ? rightChildIndex
        : leftChildIndex;

      const isMorePriority = this.heap[selectedChildIndex] < root;

      if (!isMorePriority) {
        break;
      }

      this.heap[index] = this.heap[selectedChildIndex];
      index = selectedChildIndex;
    }

    this.heap[index] = root;
  }

  #getParentIndex(child) {
    return Math.floor((child - 1) / 2);
  }

  #getLeftChildIndex(parent) {
    return parent * 2 + 1;
  }

  #getRightChildIndex(parent) {
    return parent * 2 + 2;
  }
}
```

## 큐(Queue)

```js
class Queue {
  constructor(queue) {
    this.queue = Array.isArray(queue) ? [...queue] : [];
    this.tail = this.queue.length;
    this.head = 0;
  }

  enqueue(val) {
    this.queue.push(val);
    this.tail += 1;
  }

  dequeue() {
    const value = this.queue[this.head];
    delete this.queue[this.head];

    this.head += 1;
    return value;
  }

  get length() {
    return this.tail - this.head;
  }
}
```

## 데크(deque)

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.head = null;
    this.tail = null;
  }

  unshift(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.count += 1;
      return;
    }

    const head = this.head;
    head.prev = node;
    node.next = head;
    this.head = node;
    this.count += 1;
  }

  shift() {
    if (this.count === 0) {
      return;
    }

    const value = this.head.value;

    if (this.count === 1) {
      this.init();
      return value;
    }

    this.head = this.head.next;
    this.head.prev = null;
    this.count -= 1;
    return value;
  }

  push(value) {
    const node = new Node(value);

    if (this.count === 0) {
      this.head = node;
      this.tail = node;
      this.count += 1;
      return;
    }

    const tail = this.tail;
    tail.next = node;
    node.prev = tail;
    this.tail = node;
    this.count += 1;
  }

  pop() {
    if (this.count === 0) {
      return;
    }

    const value = this.tail.value;

    if (this.count === 1) {
      this.init();
      return value;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;
    this.count -= 1;
    return value;
  }

  getValue(index) {
    if (index >= this.count) {
      return;
    }

    let node = this.head;

    for (let i = 0; i < index; i += 1) {
      node = node.next;
    }

    return node.value;
  }

  get first() {
    return this.head.value;
  }

  get last() {
    return this.tail.value;
  }

  get length() {
    return this.count;
  }
}
```

## 최소 신장 트리(Minimum Spanning Tree)

```js
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
```

## 위상 정렬(Topological Sort)

```js
function topologySort(graph, indegreeCounts) {
  const result = [];
  const queue = [];

  indegreeCounts.forEach((count, i) => {
    if (count === 0) {
      queue.push(i);
    }
  });

  while (queue.length > 0) {
    const x = queue.shift();
    result.push(x);

    graph[x].forEach((next) => {
      indegreeCounts[next] -= 1;
      if (indegreeCounts[next] === 0) {
        queue.push(next);
      }
    });
  }

  return result;
}
```

## 이분 탐색(Binary Search)

```js
function binarySearch(items, limit) {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = items[mid];

    if (value <= limit) {
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return left;
}
```
