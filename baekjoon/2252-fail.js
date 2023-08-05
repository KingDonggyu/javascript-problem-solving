// https://www.acmicpc.net/problem/2252
// 2252번: 줄 세우기
// 골드 3

function topologySort(graph, indegreeCounts) {
  const result = [];
  const queue = [];

  indegreeCounts.forEach((count, i) => {
    if (i === 0) {
      return;
    }
    if (count === 0) {
      queue.push(i);
    }
  });

  while (queue.length > 0) {
    const x = queue.shift();
    result.push(x);

    graph[x].forEach((next) => {
      indegreeCounts[next] -= 1;
      if (indegreeCounts[next] === 0) {
        queue.push(next);
      }
    });
  }

  return result;
}

function solution(N, students) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const indegreeCount = Array.from({ length: N + 1 }, () => 0);

  students.forEach(([source, destination]) => {
    graph[source].push(destination);
    indegreeCount[destination] += 1;
  });

  const answer = topologySort(graph, indegreeCount);
  return answer.join(' ');
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((x) => Number(x)));

  const [N, M] = input[0];

  if (input.length !== M + 1) {
    return;
  }

  const students = input.slice(1);
  const answer = solution(N, students);

  console.log(answer);
  rl.close();
});
