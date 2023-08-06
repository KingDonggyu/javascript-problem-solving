// https://www.acmicpc.net/problem/21921
// 21921: 블로그
// 실버 3

function solution(X, visitCounts) {
  const prefixSum = [...visitCounts];

  for (let i = 1; i < prefixSum.length; i++) {
    prefixSum[i] += prefixSum[i - 1];
  }

  const answer = { maxVisitCount: 0, periodCount: 0 };

  for (let i = X - 1; i < prefixSum.length; i++) {
    const count = i === X - 1 ? prefixSum[i] : prefixSum[i] - prefixSum[i - X];

    if (answer.maxVisitCount === count) {
      answer.periodCount += 1;
      continue;
    }

    if (answer.maxVisitCount < count) {
      answer.maxVisitCount = count;
      answer.periodCount = 1;
    }
  }

  if (answer.maxVisitCount === 0) {
    console.log('SAD');
    return;
  }

  console.log(answer.maxVisitCount);
  console.log(answer.periodCount);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((c) => Number(c)));

  if (input.length < 2) {
    return;
  }

  const X = input[0][1];
  const visitCounts = input[1];

  solution(X, visitCounts);
  rl.close();
});
