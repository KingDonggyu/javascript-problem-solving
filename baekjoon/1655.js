// https://www.acmicpc.net/problem/1655
// 1655번: 가운데를 말해요
// 골드 2

class Heap {
  constructor(type = 'min') {
    this.heap = [];
    this.type = type;
  }

  insert(value) {
    this.heap.push(value);
    this.type === this.#heapifyUp();
  }

  remove() {
    const count = this.heap.length;

    if (!count) {
      return;
    }

    if (count === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    const leaf = this.heap.pop();

    this.heap[0] = leaf;
    this.type === this.#heapifyDown();

    return root;
  }

  #heapifyUp() {
    let index = this.heap.length - 1;
    const inserted = this.heap[index];

    while (index > 0) {
      const parentIndex = this.#getParentIndex(index);
      const isMorePriority =
        this.type === 'min'
          ? this.heap[parentIndex] > inserted
          : this.heap[parentIndex] < inserted;

      if (!isMorePriority) {
        break;
      }

      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }

    this.heap[index] = inserted;
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
        (this.type === 'min'
          ? this.heap[rightChildIndex] < this.heap[leftChildIndex]
          : this.heap[rightChildIndex] > this.heap[leftChildIndex]);

      const selectedChildIndex = isSelectRightChild
        ? rightChildIndex
        : leftChildIndex;

      const hasAnotherPriorityItem =
        this.type === 'min'
          ? this.heap[selectedChildIndex] < root
          : this.heap[selectedChildIndex] > root;

      if (!hasAnotherPriorityItem) {
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

function solution(numbers) {
  const answer = [];
  const minHeap = new Heap('min');
  const maxHeap = new Heap('max');

  numbers.forEach((x) => {
    if (maxHeap.heap.length === 0) {
      maxHeap.insert(x);
      answer.push(maxHeap.heap[0]);
      return;
    }

    if (maxHeap.heap.length > minHeap.heap.length) {
      minHeap.insert(x);
    } else {
      maxHeap.insert(x);
    }

    if (maxHeap.heap[0] > minHeap.heap[0]) {
      minHeap.insert(maxHeap.remove());
      maxHeap.insert(minHeap.remove());
    }

    answer.push(maxHeap.heap[0]);
  });

  console.log(answer.join('\n'));
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(Number(line));

  if (input.length === input[0] + 1) {
    solution(input.slice(1));
    rl.close();
  }
});
