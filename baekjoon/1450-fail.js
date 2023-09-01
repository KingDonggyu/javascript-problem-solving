// https://www.acmicpc.net/problem/1450
// 1450번: 냅색문제
// 골드 1

function getCombination(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const sliced = origin.slice(index + 1);
    const combination = getCombination(sliced, count - 1);
    const attached = combination.map((c) => [fixed, ...c]);
    result.push(...attached);
  });

  return result;
}

function combinationsToSum(combinations) {
  return combinations
    .map((combi) => combi.map((arr) => arr.reduce((sum, value) => sum + value)))
    .flat();
}

function searchItemCount(items, limit) {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = items[mid];

    if (value <= limit) {
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return left;
}

function solution(bag, items) {
  const n = items.length;
  const mid = Math.floor(n / 2);
  const leftItems = items.slice(0, mid);
  const rightItems = items.slice(mid);

  const leftItemsCombinations = Array.from({ length: mid }, (_, index) =>
    getCombination(leftItems, index + 1)
  );

  const rightItemsCombinations = Array.from({ length: n - mid }, (_, index) =>
    getCombination(rightItems, index + 1)
  );

  const leftItemsSum = combinationsToSum(leftItemsCombinations);
  const rightItemsSum = combinationsToSum(rightItemsCombinations);

  leftItemsSum.unshift(0);
  rightItemsSum.unshift(0);

  leftItemsSum.sort((a, b) => a - b);

  let answer = 0;

  rightItemsSum.forEach((weight) => {
    const limit = bag - weight;

    if (limit < 0) {
      return;
    }

    const count = searchItemCount(leftItemsSum, limit);
    answer += count;
  });

  return answer;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((c) => Number(c)));

  if (input.length !== 2) {
    return;
  }

  const answer = solution(input[0][1], input[1]);
  console.log(answer);
  rl.close();
});
