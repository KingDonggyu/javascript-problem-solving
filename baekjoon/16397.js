// https://www.acmicpc.net/problem/16397
// 16379번: 탈출
// 골드 4 (fail)

const MAX = 100000;

function solution(N, T, G) {
  if (N === G) {
    return 0;
  }

  let answer = null;
  const queue = [[N, 0]];
  const visited = new Array(MAX).fill(false);

  visited[N] = true;

  while (queue.length > 0) {
    const [n, count] = queue.shift();

    if (n === G) {
      answer = count;
      break;
    }

    if (count === T) {
      continue;
    }

    // A 버튼
    if (!visited[n + 1]) {
      queue.push([n + 1, count + 1]);
      visited[n + 1] = true;
    }

    // B 버튼
    if (n === 0 || n * 2 >= MAX) {
      continue;
    }

    const str = (n * 2).toString();
    const nextN = +((+str[0] - 1).toString() + str.slice(1));

    if (nextN >= MAX) {
      continue;
    }

    if (!visited[nextN]) {
      queue.push([nextN, count + 1]);
      visited[nextN] = true;
    }
  }

  if (answer) {
    return answer;
  }

  return 'ANG';
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const answer = solution(...line.split(' ').map((x) => +x));
  console.log(answer);
  rl.close();
});

rl.on('close', () => {});
