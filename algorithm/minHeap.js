export class MinHeap {
  constructor() {
    this._heap = [];
  }

  _insert(value) {
    this._heap.push(value);
    this.#heapifyUp();
  }

  _remove() {
    const count = this._heap.length;

    if (!count) {
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
      const isMorePriority = this._heap[parentIndex] > inserted;

      if (!isMorePriority) {
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
        this._heap[rightChildIndex] < this._heap[leftChildIndex];

      const selectedChildIndex = isSelectRightChild
        ? rightChildIndex
        : leftChildIndex;

      const hasAnotherPriorityItem = this._heap[selectedChildIndex] < root;

      if (!hasAnotherPriorityItem) {
        break;
      }

      this._heap[index] = this._heap[selectedChildIndex];
      index = selectedChildIndex;
    }

    this._heap[index] = root;
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
