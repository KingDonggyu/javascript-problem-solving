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
