// https://www.acmicpc.net/problem/16234
// 16234번: 인구 이동
// 골드 4

function checkIsOutOfBounds(N, x, y) {
  return x < 0 || x >= N || y < 0 || y >= N;
}

function movePopulation(population, union, total) {
  union.forEach(([x, y]) => {
    population[x][y] = Math.floor(total / union.length);
  });
}

function uniteCountries(N, L, R, startX, startY, population, visited) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  const stack = [[startX, startY]];

  let union = [];
  let total = 0;

  visited[startX][startY] = true;

  while (stack.length > 0) {
    const [x, y] = stack.pop();

    union.push([x, y]);
    total += population[x][y];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (checkIsOutOfBounds(N, nx, ny) || visited[nx][ny]) {
        continue;
      }

      const populationDiff = Math.abs(population[x][y] - population[nx][ny]);

      if (populationDiff >= L && populationDiff <= R) {
        visited[nx][ny] = true;
        stack.push([nx, ny]);
      }
    }
  }

  if (union.length > 1) {
    movePopulation(population, union, total);
    return true;
  }

  return false;
}

function solution(N, L, R, population) {
  let answer = 0;

  while (1) {
    let notUnitedCount = 0;
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (visited[x][y]) {
          continue;
        }

        const isUnited = uniteCountries(N, L, R, x, y, population, visited);

        if (!isUnited) {
          notUnitedCount += 1;
        }
      }
    }

    if (notUnitedCount === N * N) {
      break;
    }

    answer += 1;
  }

  return answer;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((ch) => Number(ch)));

  const [N, L, R] = input[0];

  if (input.length !== N + 1) {
    return;
  }

  const answer = solution(N, L, R, input.slice(1));
  console.log(answer);
  rl.close();
});
