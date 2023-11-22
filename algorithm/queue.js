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
