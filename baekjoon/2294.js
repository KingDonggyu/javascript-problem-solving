// // https://www.acmicpc.net/problem/2294
// // 2294번: 동전 2
// // 골드 5 (fail)

function solution(coins, target) {
  const dp = new Array(target + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let value = coin; value <= target; value++) {
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    }
  }

  return dp[target] === Infinity ? -1 : dp[target];
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
