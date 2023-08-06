// https://www.acmicpc.net/problem/2667
// 2667: 단지번호붙이기
// 실버 1

function getHouseCount(map, startX, startY, visited) {
  let houseCount = 1;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const stack = [[startX, startY]];

  const checkIsOutOfBounds = (x, y) => {
    const n = map.length;
    return x < 0 || x >= n || y < 0 || y >= n;
  };

  visited[startX][startY] = true;

  while (stack.length > 0) {
    const [x, y] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (checkIsOutOfBounds(nx, ny) || visited[nx][ny] || map[nx][ny] === 0) {
        continue;
      }

      stack.push([nx, ny]);
      visited[nx][ny] = true;
      houseCount += 1;
    }
  }

  return houseCount;
}

function solution(N, map) {
  const answer = [];
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (visited[x][y] || map[x][y] === 0) {
        continue;
      }
      answer.push(getHouseCount(map, x, y, visited));
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((houseCount) => console.log(houseCount));
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(Number(line));
    return;
  }

  const N = input[0];
  input.push(line.split('').map((c) => Number(c)));

  if (input.length === N + 1) {
    solution(N, input.slice(1));
    rl.close();
  }
});
