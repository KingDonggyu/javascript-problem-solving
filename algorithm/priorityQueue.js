const MinHeap = require('./minHeap');

class PriorityQueue extends MinHeap {
  constructor(arr = []) {
    super();
    arr.forEach((x) => this.push(x));
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.insert(value);
  }

  pop() {
    return this.remove();
  }
}
