// https://www.acmicpc.net/problem/17070
// 17070번: 파이프 옮기기 1
// 골드 5

const WALL = '1';

function solution(N, house) {
  house = [new Array(N + 1).fill(WALL), ...house.map((row) => [WALL, ...row])];

  const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => ({
      landscape: 0,
      portrait: 0,
      diagonal: 0,
    }))
  );

  dp[1][2].landscape += 1;

  for (let x = 1; x <= N; x++) {
    for (let y = 3; y <= N; y++) {
      if (house[x][y] === WALL) {
        continue;
      }

      dp[x][y].landscape = dp[x][y - 1].landscape + dp[x][y - 1].diagonal;
      dp[x][y].portrait = dp[x - 1][y].portrait + dp[x - 1][y].diagonal;

      if (house[x - 1][y] === WALL || house[x][y - 1] === WALL) {
        continue;
      }

      dp[x][y].diagonal =
        dp[x - 1][y - 1].landscape +
        dp[x - 1][y - 1].portrait +
        dp[x - 1][y - 1].diagonal;
    }
  }

  return dp[N][N].landscape + dp[N][N].portrait + dp[N][N].diagonal;
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
  input.push(line.split(' '));

  if (input.length !== N + 1) {
    return;
  }

  const answer = solution(N, input.splice(1));
  console.log(answer);
  rl.close();
});
