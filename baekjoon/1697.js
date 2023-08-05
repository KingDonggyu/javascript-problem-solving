// https://www.acmicpc.net/problem/1697
// 1697번: 숨바꼭질
// 실버 1

function solution(N, K) {
  const MAX = 100000;
  const queue = [[N, 0]];
  const visited = new Array(MAX + 1).fill(false);

  visited[N] = true;

  while (queue.length > 0) {
    const [x, time] = queue.shift();

    if (x === K) {
      return time;
    }

    if (x !== MAX && !visited[x + 1]) {
      queue.push([x + 1, time + 1]);
      visited[x + 1] = true;
    }

    if (x !== 0 && !visited[x - 1]) {
      queue.push([x - 1, time + 1]);
      visited[x - 1] = true;
    }

    if (x * 2 <= MAX && !visited[x * 2]) {
      queue.push([x * 2, time + 1]);
      visited[x * 2] = true;
    }
  }
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
