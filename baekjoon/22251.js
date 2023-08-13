// https://www.acmicpc.net/problem/22251
// 22251번: 빌런 호석
// 골드 5

function solution(N, K, P, X) {
  let answer = 0;
  const inversionCounts = [
    [0, 4, 3, 3, 4, 3, 2, 3, 1, 2],
    [4, 0, 5, 3, 2, 5, 6, 1, 5, 4],
    [3, 5, 0, 2, 5, 4, 3, 4, 2, 3],
    [3, 3, 2, 0, 3, 2, 3, 2, 2, 1],
    [4, 2, 5, 3, 0, 3, 4, 3, 3, 2],
    [3, 5, 4, 2, 3, 0, 1, 4, 2, 1],
    [2, 6, 3, 3, 4, 1, 0, 5, 1, 2],
    [3, 1, 4, 2, 3, 4, 5, 0, 4, 3],
    [1, 5, 2, 2, 3, 2, 1, 4, 0, 1],
    [2, 4, 3, 1, 2, 1, 2, 3, 1, 0],
  ];

  let target = 0;
  X = `${'0'.repeat(K - String(X).length)}${X}`;

  while (++target <= N && String(target).length <= K) {
    if (Number(X) === target) {
      continue;
    }

    let count = 0;
    let targetString = `${'0'.repeat(K - String(target).length)}${target}`;

    for (let i = 0; i < K; i++) {
      const numberA = Number(X[i]);
      const numberB = Number(targetString[i]);
      count += inversionCounts[numberA][numberB];
    }

    if (count <= P) {
      answer += 1;
    }
  }

  return answer;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const answer = solution(...line.split(' ').map((x) => Number(x)));
  console.log(answer);
  rl.close();
});
