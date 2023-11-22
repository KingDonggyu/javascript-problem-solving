// https://school.programmers.co.kr/learn/courses/30/lessons/81302
// 2021 카카오 채용연계형 인턴십: 거리두기 확인하기
// Lv. 2

const PERSON = 'P';
const PARTITION = 'X';

function isOutOfBounds(x, y, rowSize, colSize) {
  return x < 0 || x >= rowSize || y < 0 || y >= colSize;
}

function getManhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function isFollowSocialDistancingOfPerson(place, startX, startY, visited) {
  const movement = {
    x: [-1, 1, 0, 0],
    y: [0, 0, -1, 1],
  };
  const queue = [[startX, startY, 0]];

  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();

    for (let direction = 0; direction < 4; direction++) {
      const nextX = x + movement.x[direction];
      const nextY = y + movement.y[direction];

      if (
        isOutOfBounds(nextX, nextY, 5, 5) ||
        place[nextX][nextY] === PARTITION ||
        visited[nextX][nextY]
      ) {
        continue;
      }

      if (place[nextX][nextY] === PERSON && distance <= 1) {
        return false;
      }

      queue.push([
        nextX,
        nextY,
        place[nextX][nextY] === PERSON ? 0 : distance + 1,
      ]);

      visited[nextX][nextY] = true;
    }
  }

  return true;
}

function isFollowSocialDistancingOfPlace(place) {
  const visited = Array.from({ length: 5 }, () => Array(5).fill(false));

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (place[x][y] !== PERSON || visited[x][y]) {
        continue;
      }

      const isFollow = isFollowSocialDistancingOfPerson(place, x, y, visited);

      if (!isFollow) {
        return false;
      }
    }
  }

  return true;
}

function solution(places) {
  return places.map((place) => Number(isFollowSocialDistancingOfPlace(place)));
}
