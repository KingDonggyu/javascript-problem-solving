// https://www.acmicpc.net/problem/2467
// 2467번: 용액
// 골드 5

function solution(values) {
  let answer = null;
  let distanceFromZero = Infinity;

  let left = 0;
  let right = values.length - 1;

  while (left < right) {
    const sum = values[left] + values[right];

    if (Math.abs(sum) < distanceFromZero) {
      answer = [values[left], values[right]];
      distanceFromZero = Math.abs(sum);
    }

    if (sum < 0) {
      left += 1;
      continue;
    }

    right -= 1;
  }

  return answer.join(' ');
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

  const values = input[1].split(' ').map((ch) => Number(ch));
  const answer = solution(values);

  console.log(answer);
  rl.close();
});
