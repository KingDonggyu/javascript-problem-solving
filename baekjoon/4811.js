// https://www.acmicpc.net/problem/4811
// 4811번: 알약
// 골드 5

function key(onePieceCount, halfPieceCount) {
  return `${onePieceCount},${halfPieceCount}`;
}

function eatPill(onePieceCount, halfPieceCount, cache = new Map()) {
  if (onePieceCount === 0 && halfPieceCount === 0) {
    return 1;
  }

  if (cache.has(key(onePieceCount, halfPieceCount))) {
    return cache.get(key(onePieceCount, halfPieceCount));
  }

  let result = 0;

  if (onePieceCount > 0) {
    result += eatPill(onePieceCount - 1, halfPieceCount + 1, cache);
  }

  if (halfPieceCount > 0) {
    result += eatPill(onePieceCount, halfPieceCount - 1, cache);
  }

  cache.set(key(onePieceCount, halfPieceCount), result);
  return result;
}

function solution(N) {
  return eatPill(N - 1, 1);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  if (line === '0') {
    rl.close();
    return;
  }
  const answer = solution(Number(line));
  console.log(answer);
});
