// https://www.acmicpc.net/problem/2293
// 2293번: 동전 1
// 골드 5

function solution(coins, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  coins.forEach((coin) => {
    for (let value = coin; value <= target; value++) {
      dp[value] += dp[value - coin];
    }
  });

  return dp[target];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(line.split(' ').map((ch) => Number(ch)));
    return;
  }

  const [n, k] = input[0];
  input.push(Number(line));

  if (input.length === n + 1) {
    const answer = solution(input.slice(1), k);
    console.log(answer);
    rl.close();
  }
});
