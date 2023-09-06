// https://www.acmicpc.net/problem/2098
// 2098번: 외판원 순회
// 골드 1

function solution(graph) {
  const n = graph.length;
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(null));

  const dfs = (mask, city) => {
    if (mask === (1 << n) - 1) {
      return graph[city][0] || Infinity;
    }

    if (dp[mask][city] !== null) {
      return dp[mask][city];
    }

    let minCost = Infinity;

    for (let nextCity = 0; nextCity < n; nextCity++) {
      if (mask & (1 << nextCity) || graph[city][nextCity] === 0) {
        continue;
      }
      const newMask = mask | (1 << nextCity);
      const cost = graph[city][nextCity] + dfs(newMask, nextCity);
      minCost = Math.min(minCost, cost);
    }

    dp[mask][city] = minCost;
    return minCost;
  };

  const initialMask = 1;
  const answer = dfs(initialMask, 0);

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
    input.push(Number(line));
    return;
  }

  input.push(line.split(' ').map((c) => Number(c)));

  if (input.length - 1 !== input[0]) {
    return;
  }

  const answer = solution(input.slice(1));
  console.log(answer);
  rl.close();
});
