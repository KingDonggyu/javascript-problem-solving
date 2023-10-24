// https://www.acmicpc.net/problem/2248
// 2248번: 이진수 찾기
// 골드 3 (fail)

function solution(N, L, I) {
  const dp = Array.from({ length: N + 1 }, () => new Array(L + 1).fill(0));

  for (let x = 0; x < N + 1; x++) {
    for (let y = 0; y < L + 1; y++) {
      if (x === 0 || y === 0) {
        dp[x][y] = 1;
        continue;
      }
      dp[x][y] = dp[x - 1][y - 1] + dp[x - 1][y];
    }
  }

  const answer = [];
  let l = L;
  let i = I;

  for (let n = N; n > 0; n--) {
    if (l === 0) {
      answer.push(0);
      continue;
    }
    if (i <= dp[n - 1][l]) {
      answer.push(0);
      continue;
    }
    answer.push(1);
    i -= dp[n - 1][l];
    l -= 1;
  }

  return answer.join('');
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const answer = solution(...line.split(' ').map((c) => Number(c)));
  console.log(answer);
  rl.close();
});
