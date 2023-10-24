// https://www.acmicpc.net/problem/15989
// 15989번: 1, 2, 3 더하기 4
// 골드 5 (fail)

function solution(n) {
  if (n <= 3) {
    return n;
  }

  const dp = Array.from({ length: n + 1 }, () => new Array(4).fill(0));

  dp[1][1] = 1;
  dp[2][1] = 1;
  dp[2][2] = 1;
  dp[3][1] = 1;
  dp[3][2] = 1;
  dp[3][3] = 1;

  for (let target = 4; target <= n; target++) {
    for (let lastNumber = 1; lastNumber <= 3; lastNumber++) {
      if (lastNumber === 1) {
        dp[target][1] = 1;
        continue;
      }
      if (lastNumber === 2) {
        dp[target][2] = dp[target - 2][1] + dp[target - 2][2];
        continue;
      }
      dp[target][3] = dp[target - 3][1] + dp[target - 3][2] + dp[target - 3][3];
    }
  }

  return dp[n][1] + dp[n][2] + dp[n][3];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(Number(line));

  if (input.length !== input[0] + 1) {
    return;
  }

  input.slice(1).forEach((n) => {
    console.log(solution(n));
  });

  rl.close();
});
