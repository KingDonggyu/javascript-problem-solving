// https://www.acmicpc.net/problem/7568
// 7568번: 덩치
// 실버 5

function solution(N, physicals) {
  const answer = [];

  physicals.forEach(([x, y], i) => {
    let rank = 1;
    physicals.forEach(([p, q], j) => {
      if (i === j) {
        return;
      }
      if (x < p && y < q) {
        rank += 1;
      }
    });
    answer.push(rank);
  });

  return answer.join(' ');
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(Number(line));
    return;
  }

  input.push(line.split(' ').map((x) => Number(x)));

  if (input.length === input[0] + 1) {
    const answer = solution(input[0], input.slice(1));
    console.log(answer);
    rl.close();
  }
});

rl.on('close', () => {});
