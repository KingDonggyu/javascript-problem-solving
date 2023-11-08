// https://www.acmicpc.net/problem/2240
// 2240번: 자두나무
// 골드 5

function solution(W, tree) {
  const limitSecond = tree.length;
  const dp = Array.from({ length: limitSecond + 1 }, () =>
    new Array(W + 1).fill(0)
  );

  for (let second = 1; second <= limitSecond; second++) {
    const targetTree = tree[second - 1];

    if (targetTree === 1) {
      dp[second][0] = dp[second - 1][0] + 1;
    }

    if (targetTree === 2) {
      dp[second][0] = dp[second - 1][0];
    }

    for (let move = 1; move <= W; move++) {
      if (second < move) {
        continue;
      }

      const currentTree = move % 2 ? 2 : 1;

      if (targetTree !== currentTree) {
        dp[second][move] = dp[second - 1][move];
        continue;
      }

      dp[second][move] =
        Math.max(dp[second - 1][move - 1], dp[second - 1][move]) + 1;
    }
  }

  return Math.max(...dp[limitSecond]);
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

  const [T, W] = input[0];
  input.push(Number(line));

  if (input.length === T + 1) {
    const answer = solution(W, input.slice(1));
    console.log(answer);
    rl.close();
  }
});
