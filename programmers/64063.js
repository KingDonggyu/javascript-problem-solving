// https://school.programmers.co.kr/learn/courses/30/lessons/64063
// 2019 카카오 개발자 겨울 인턴십: 호텔 방 배정
// Lv. 4

class DisjointSet {
  constructor(items) {
    this.parents = new Map(items.map((value) => [value, value]));
  }

  find(node) {
    if (this.parents.get(node) !== node) {
      this.parents.set(node, this.find(this.parents.get(node)));
    }
    return this.parents.get(node);
  }

  union(nodeA, nodeB) {
    [nodeA, nodeB].forEach((node) => {
      if (!this.parents.has(node)) {
        this.parents.set(node, node);
      }
    });

    const parentA = this.find(nodeA);
    const parentB = this.find(nodeB);

    if (parentA > parentB) {
      this.parents.set(parentB, nodeA);
      return;
    }

    this.parents.set(parentA, nodeB);
  }
}

function solution(k, room_number) {
  const answer = [];
  const disjointSet = new DisjointSet(Array.from(new Set(room_number)));

  room_number.forEach((wantedRoom) => {
    const assignedRoom = disjointSet.find(wantedRoom);
    answer.push(assignedRoom);
    disjointSet.union(wantedRoom, assignedRoom + 1);
  });

  return answer;
}
