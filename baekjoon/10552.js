// https://www.acmicpc.net/problem/10552
// 10552번: DOM
// 실버 2

function solution(channel, viewers) {
  const channelInfo = new Map();

  viewers.forEach(([like, unlike]) => {
    if (!channelInfo.has(unlike)) {
      channelInfo.set(unlike, like);
    }
  });

  const visited = new Set([channel]);
  let answer = 0;

  while (channelInfo.has(channel)) {
    channel = channelInfo.get(channel);

    if (visited.has(channel)) {
      return -1;
    }

    visited.add(channel);
    answer += 1;
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
  input.push(line.split(' ').map((c) => Number(c)));
  const [N, M, channel] = input[0];

  if (input.length - 1 !== N) {
    return;
  }

  const answer = solution(channel, input.slice(1));
  console.log(answer);
  rl.close();
});
