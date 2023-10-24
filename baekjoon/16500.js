// https://www.acmicpc.net/problem/16500
// 16500번: 문자열 판별
// 골드 5 (fail)

function solution(target, words) {
  const dp = new Array(target.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= target.length; i++) {
    for (const word of words) {
      const size = word.length;
      if (i >= size && dp[i - size] && target.substring(i - size, i) === word) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[target.length] ? 1 : 0;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);

  if (input.length < 2) {
    return;
  }

  if (Number(input[1]) + 2 === input.length) {
    const answer = solution(input[0], input.slice(2));
    console.log(answer);
    rl.close();
  }
});
