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

module.exports = MinHeap;
