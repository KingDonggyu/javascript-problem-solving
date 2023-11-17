// https://school.programmers.co.kr/learn/courses/30/lessons/214288
// 2023 현대모비스 알고리즘 경진대회 예선: 상담원 인원
// Lv. 3

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

function getParticipantsByType(participants, maxType) {
  const participantsByType = Array.from({ length: maxType + 1 }, () => []);

  participants.forEach(([startTime, durationTime, type]) => {
    participantsByType[type].push([startTime, durationTime]);
  });

  return participantsByType;
}

function getWaitingTimesByType(participantsByType, mentorCount) {
  const typeCount = participantsByType.length - 1;
  const maxAssignedMentorCount = mentorCount - typeCount + 1;
  const waitingTimes = Array.from({ length: typeCount + 1 }, () =>
    Array(maxAssignedMentorCount + 1).fill(0)
  );

  participantsByType.forEach((participants, type) => {
    if (type === 0) {
      return;
    }

    for (
      let assignedMentorCount = 1;
      assignedMentorCount <= maxAssignedMentorCount;
      assignedMentorCount++
    ) {
      const minHeap = new MinHeap();

      participants.forEach(([startTime, durationTime]) => {
        if (minHeap.size() < assignedMentorCount) {
          minHeap.push(startTime + durationTime);
          return;
        }

        const currentTime = minHeap.pop();

        if (startTime < currentTime) {
          waitingTimes[type][assignedMentorCount] += currentTime - startTime;
          minHeap.push(currentTime + durationTime);
          return;
        }

        minHeap.push(startTime + durationTime);
      });
    }
  });

  return waitingTimes;
}

function getIndexWithMaxValue(numbers) {
  if (numbers.length === 0) {
    return -1;
  }

  let indexWithMaxValue = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[indexWithMaxValue]) {
      indexWithMaxValue = i;
    }
  }

  return indexWithMaxValue;
}

function getAssignedMentorCountsByType(waitingTimes, mentorCount) {
  const typeCount = waitingTimes.length - 1;
  const assignedMentorCounts = new Array(typeCount + 1).fill(1);
  let availableMentorCount = mentorCount - typeCount;

  assignedMentorCounts[0] = null;

  while (availableMentorCount > 0) {
    const waitingTimeDiffs = assignedMentorCounts.map((count, type) => {
      if (type === 0 || count + 1 >= mentorCount) {
        return 0;
      }
      // 멘토 수를 증가시킬 경우 대기 시간 차이
      return waitingTimes[type][count] - waitingTimes[type][count + 1];
    });

    // 대기 시간 차이가 가장 큰 타입의 멘토 수 증가
    const typeWithMaxWaitingTime = getIndexWithMaxValue(waitingTimeDiffs);
    assignedMentorCounts[typeWithMaxWaitingTime] += 1;
    availableMentorCount -= 1;
  }

  return assignedMentorCounts;
}

function solution(k, n, reqs) {
  const participantsByType = getParticipantsByType(reqs, k);
  const waitingTimes = getWaitingTimesByType(participantsByType, n);
  const assignedMentorCounts = getAssignedMentorCountsByType(waitingTimes, n);

  let answer = 0;

  assignedMentorCounts.forEach((mentorCount, type) => {
    if (type === 0) {
      return;
    }
    answer += waitingTimes[type][mentorCount];
  });

  return answer;
}
