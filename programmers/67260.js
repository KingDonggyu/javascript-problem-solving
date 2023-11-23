// https://school.programmers.co.kr/learn/courses/30/lessons/67260
// 2020 카카오 인턴십: 동굴 탐험
// Lv. 4

function isOpendRoom(room, reverseOrderMap) {
  return !reverseOrderMap.has(room);
}

function openRoom(room, orderMap, reverseOrderMap) {
  if (!orderMap.has(room)) {
    return null;
  }

  const opendRoom = orderMap.get(room);
  reverseOrderMap.delete(opendRoom);
  orderMap.delete(room);

  return opendRoom;
}

function canVisitAllRoom(n, graph, order) {
  const orderMap = new Map();
  const reverseOrderMap = new Map();

  order.forEach(([prev, after]) => {
    orderMap.set(prev, after);
    reverseOrderMap.set(after, prev);
  });

  if (!isOpendRoom(0, reverseOrderMap)) {
    return false;
  }

  const opendRoomStack = [0];
  const waitingRoomSet = new Set();
  const visited = Array.from({ length: n }, () => false);

  while (opendRoomStack.length > 0) {
    const room = opendRoomStack.pop();

    graph[room].forEach((nextRoom) => {
      if (visited[nextRoom]) {
        return;
      }

      if (!isOpendRoom(nextRoom, reverseOrderMap)) {
        waitingRoomSet.add(nextRoom);
        return;
      }

      opendRoomStack.push(nextRoom);
      visited[nextRoom] = true;

      if (!orderMap.has(nextRoom)) {
        return;
      }

      const opendRoom = openRoom(nextRoom, orderMap, reverseOrderMap);

      if (waitingRoomSet.has(opendRoom)) {
        opendRoomStack.push(opendRoom);
        waitingRoomSet.delete(opendRoom);
      }
    });
  }

  return orderMap.size === 0;
}

function solution(n, path, order) {
  const graph = Array.from({ length: n }, () => []);

  path.forEach(([room1, room2]) => {
    graph[room1].push(room2);
    graph[room2].push(room1);
  });

  return canVisitAllRoom(n, graph, order);
}
