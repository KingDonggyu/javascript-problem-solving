// https://www.acmicpc.net/problem/2559
// 2559번: 수열
// 실버 3

function solution(K, numbers) {
  let answer = 0;
  let sum = 0;

  for (let i = 0; i < K; i++) {
    sum += numbers[i];
    answer = sum;
  }

  for (let i = K; i <= numbers.length - 1; i++) {
    sum -= numbers[i - K];
    sum += numbers[i];
    answer = Math.max(answer, sum);
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
  if (input.length === 0) {
    input.push(line.split(' ').map((x) => Number(x)));
    return;
  }

  input.push(line.split(' ').map((x) => Number(x)));
  const answer = solution(input[0][1], input[1]);
  console.log(answer);
  rl.close();
});
