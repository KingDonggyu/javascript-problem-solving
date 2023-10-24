// https://www.acmicpc.net/problem/2618
// 2681번: 경찰차
// 플래티넘 4 (fail)

function getDistance(source, destination) {
  return (
    Math.abs(source[0] - destination[0]) + Math.abs(source[1] - destination[1])
  );
}

function getMinDistance(currA, currB, routeA, routeB, caseCount, cache) {
  if (currA === caseCount || currB === caseCount) {
    return 0;
  }

  if (cache[currA][currB] !== null) {
    return cache[currA][currB];
  }

  const next = Math.max(currA, currB) + 1;

  const distanceA = getDistance(routeA[currA], routeA[next]);
  const distanceB = getDistance(routeB[currB], routeB[next]);

  const minDistanceA =
    getMinDistance(next, currB, routeA, routeB, caseCount, cache) + distanceA;

  const minDistanceB =
    getMinDistance(currA, next, routeA, routeB, caseCount, cache) + distanceB;

  const result = Math.min(minDistanceA, minDistanceB);
  cache[currA][currB] = result;

  return result;
}

function printPoliceSequence(currA, currB, routeA, routeB, caseCount, cache) {
  if (currA === caseCount || currB === caseCount) {
    return;
  }

  const next = Math.max(currA, currB) + 1;

  const distanceA = getDistance(routeA[currA], routeA[next]);
  const distanceB = getDistance(routeB[currB], routeB[next]);

  const minDistanceA =
    getMinDistance(next, currB, routeA, routeB, caseCount, cache) + distanceA;

  const minDistanceB =
    getMinDistance(currA, next, routeA, routeB, caseCount, cache) + distanceB;

  if (minDistanceA < minDistanceB) {
    console.log(1);
    printPoliceSequence(next, currB, routeA, routeB, caseCount, cache);
    return;
  }

  console.log(2);
  printPoliceSequence(currA, next, routeA, routeB, caseCount, cache);
}

function solution(N, W, cases) {
  const routeA = [[1, 1]];
  const routeB = [[N, N]];

  cases.forEach(([x, y]) => {
    routeA.push([x, y]);
    routeB.push([x, y]);
  });

  const cache = Array.from({ length: W + 1 }, () =>
    Array.from({ length: W + 1 }, () => null)
  );

  const minDistance = getMinDistance(0, 0, routeA, routeB, W, cache);
  console.log(minDistance);

  printPoliceSequence(0, 0, routeA, routeB, W, cache);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  if (input.length < 2) {
    input.push(Number(line));
    return;
  }

  const N = input[0];
  const W = input[1];

  input.push(line.split(' ').map((x) => Number(x)));

  if (input.length < W + 2) {
    return;
  }

  solution(N, W, input.slice(2));
  rl.close();
});
