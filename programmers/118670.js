// https://school.programmers.co.kr/learn/courses/30/lessons/118670
// 2022 KAKAO TECH INTERNSHIP: 행렬과 연산
// Lv. 4 (fail)

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

function shiftRow(matrix) {
  const { middleDeque, leftDeque, rightDeque } = matrix;
  middleDeque.unshift(middleDeque.pop());
  leftDeque.unshift(leftDeque.pop());
  rightDeque.unshift(rightDeque.pop());
}

function rotate(matrix) {
  const { middleDeque, leftDeque, rightDeque } = matrix;
  const middleFirstDeque = middleDeque.first;
  const middleLastDeque = middleDeque.last;

  middleFirstDeque.unshift(leftDeque.shift());
  rightDeque.unshift(middleFirstDeque.pop());
  middleLastDeque.push(rightDeque.pop());
  leftDeque.push(middleLastDeque.shift());
}

function solution(rc, operations) {
  const rowSize = rc.length;
  const colSize = rc[0].length;

  const middleDeque = new Deque();
  const leftDeque = new Deque();
  const rightDeque = new Deque();

  for (let x = 0; x < rowSize; x++) {
    const middleDequeElement = new Deque();
    leftDeque.push(rc[x][0]);
    rightDeque.push(rc[x][colSize - 1]);

    for (let y = 1; y < colSize - 1; y++) {
      middleDequeElement.push(rc[x][y]);
    }

    middleDeque.push(middleDequeElement);
  }

  operations.forEach((operation) => {
    if (operation === 'Rotate') {
      rotate({ middleDeque, leftDeque, rightDeque });
      return;
    }

    if (operation === 'ShiftRow') {
      shiftRow({ middleDeque, leftDeque, rightDeque });
    }
  });

  const answer = Array.from({ length: rowSize }, () =>
    Array.from({ length: colSize }, () => null)
  );

  for (let x = 0; x < rowSize; x++) {
    const middleFirstDeque = middleDeque.shift();
    answer[x][0] = leftDeque.shift();
    answer[x][colSize - 1] = rightDeque.shift();

    for (let y = 1; y < colSize - 1; y++) {
      answer[x][y] = middleFirstDeque.shift();
    }
  }

  return answer;
}
