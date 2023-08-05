import { MinHeap } from './minHeap';

export class PriorityQueue extends MinHeap {
  constructor(arr = []) {
    super();
    arr.forEach((x) => this.push(x));
  }

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
