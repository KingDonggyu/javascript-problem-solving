// https://www.acmicpc.net/problem/14002
// 14002번: 가장 긴 증가하는 부분 수열 4
// 골드 4

function solution(N, numbers) {
  const dp = numbers.map((x) => [x]);

  for (let x = 1; x < N; x++) {
    for (let y = x - 1; y >= 0; y--) {
      if (numbers[x] <= numbers[y]) {
        continue;
      }

      if (dp[x].length <= dp[y].length) {
        dp[x] = [...dp[y], dp[x][dp[x].length - 1]];
      }
    }
  }

  let answer = [];

  dp.forEach((sequence) => {
    if (answer.length < sequence.length) {
      answer = sequence;
    }
  });

  console.log(answer.length);
  console.log(answer.join(' '));
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line);

  if (input.length !== 2) {
    return;
  }

  const N = Number(input[0]);
  const numbers = input[1].split(' ').map((c) => Number(c));

  solution(N, numbers);
  rl.close();
});
