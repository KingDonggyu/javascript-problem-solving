// https://www.acmicpc.net/problem/13549
// 13549번: 숨바꼭질 3
// 골드 5

class MinHeap {
  constructor() {
    this._heap = [];
  }

  _insert(value) {
    this._heap.push(value);
    this.#heapifyUp();
  }

  _remove() {
    const count = this._heap.length;

    if (count === 0) {
      return;
    }

    if (count === 1) {
      return this._heap.pop();
    }

    const root = this._heap[0];
    const leaf = this._heap.pop();

    this._heap[0] = leaf;
    this.#heapifyDown();

    return root;
  }

  #heapifyUp() {
    let index = this._heap.length - 1;
    const inserted = this._heap[index];

    while (index > 0) {
      const parentIndex = this.#getParentIndex(index);

      if (this._heap[parentIndex].key <= inserted.key) {
        break;
      }

      this._heap[index] = this._heap[parentIndex];
      index = parentIndex;
    }

    this._heap[index] = inserted;
  }

  #heapifyDown() {
    let index = 0;
    const root = this._heap[index];
    const count = this._heap.length;

    while (this.#getLeftChildIndex(index) < count) {
      const leftChildIndex = this.#getLeftChildIndex(index);
      const rightChildIndex = this.#getRightChildIndex(index);

      const isSelectRightChild =
        rightChildIndex < count &&
        this._heap[rightChildIndex].key < this._heap[leftChildIndex].key;

      const selectedChildIndex = isSelectRightChild
        ? rightChildIndex
        : leftChildIndex;

      if (this._heap[selectedChildIndex].key >= root.key) {
        break;
      }

      this._heap[index] = this._heap[selectedChildIndex];
      index = selectedChildIndex;
    }

    this._heap[index] = root;
  }

  #getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  #getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  #getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }
}

class PriorityQueue extends MinHeap {
  size() {
    return this._heap.length;
  }

  push(value) {
    this._insert(value);
  }

  pop() {
    return this._remove();
  }
}

function solution(N, K) {
  const MAX = 200000;
  const priorityQueue = new PriorityQueue();
  const visited = new Array(MAX + 1).fill(false);

  priorityQueue.push({ key: 0, value: N });

  while (priorityQueue.size()) {
    const { key: time, value: x } = priorityQueue.pop();

    visited[x] = true;

    if (x === K) {
      return time;
    }

    const isPossibleWalkingForward = x + 1 <= MAX && !visited[x + 1];
    const isPossibleWalkingBackward = x - 1 >= 0 && !visited[x - 1];
    const isPossibleTeleport = x * 2 <= MAX && !visited[x * 2];

    if (isPossibleTeleport) {
      priorityQueue.push({ key: time, value: x * 2 });
    }

    if (isPossibleWalkingForward) {
      priorityQueue.push({ key: time + 1, value: x + 1 });
    }

    if (isPossibleWalkingBackward) {
      priorityQueue.push({ key: time + 1, value: x - 1 });
    }
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [N, K] = line.split(' ').map((x) => Number(x));
  const answer = solution(N, K);
  console.log(answer);
  rl.close();
});
