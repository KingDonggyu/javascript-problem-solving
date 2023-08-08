// https://www.acmicpc.net/problem/14503
// 14503: 로봇 청소기
// 골드 5

const NOT_CLEAN = 0;
const WALL = 1;
const CLEAN = 2;

// 북, 동, 남, 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function checkIsOutOfBounds(room, x, y) {
  const N = room.length;
  const M = room[0].length;
  return x < 0 || x >= N || y < 0 || y >= M;
}

function checkIsCleanAround(room, x, y) {
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dx[i], y + dy[i]];

    if (!checkIsOutOfBounds(room, nx, ny) && room[nx][ny] === NOT_CLEAN) {
      return false;
    }
  }

  return true;
}

function back(room, x, y, d) {
  const backDirection = [2, 3, 0, 1];
  const move = backDirection[d];
  const [nx, ny] = [x + dx[move], y + dy[move]];

  if (checkIsOutOfBounds(room, nx, ny) || room[nx][ny] === WALL) {
    return null;
  }

  return [nx, ny, d];
}

function rotate(d) {
  const rotateDirection = [3, 0, 1, 2];
  return rotateDirection[d];
}

function clean(room, x, y) {
  if (room[x][y] === NOT_CLEAN) {
    room[x][y] = CLEAN;
    return 1;
  }

  return 0;
}

function solution(room, position) {
  let cleanCount = 0;
  let [x, y, d] = position;

  // 1. 현재 칸이 아직 청소되지 않은 경우, 현재 칸을 청소한다.
  cleanCount += clean(room, x, y);

  // 2. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 없는 경우
  if (checkIsCleanAround(room, x, y)) {
    // 2 - 1. 바라보는 방향을 유지한 채로 한 칸 후진할 수 있다면 한 칸 후진하고 1번으로 돌아간다.
    const nextPosition = back(room, x, y, d);

    if (nextPosition) {
      cleanCount += solution(room, nextPosition);
      return cleanCount;
    }

    // 2 - 2. 바라보는 방향의 뒤쪽 칸이 벽이라 후진할 수 없다면 작동을 멈춘다.
    return cleanCount;
  }

  // 3. 현재 칸의 주변 4칸 중 청소되지 않은 빈 칸이 있는 경우
  // 3 - 1. 반시계 방향으로 90도 회전한다.
  d = rotate(d);
  const [nx, ny] = [x + dx[d], y + dy[d]];

  // 3 - 2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 한 칸 전진한다.
  if (checkIsOutOfBounds(room, nx, ny) || room[nx][ny] === NOT_CLEAN) {
    [x, y] = [nx, ny];
  }

  // 3 - 3. 1번으로 돌아간다.
  cleanCount += solution(room, [x, y, d]);
  return cleanCount;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((c) => Number(c)));
  const [N] = input[0];

  if (input.length !== N + 2) {
    return;
  }

  const position = input[1];
  const room = input.slice(2);
  const answer = solution(room, position);

  console.log(answer);
  rl.close();
});
