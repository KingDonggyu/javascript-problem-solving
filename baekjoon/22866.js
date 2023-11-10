// https://www.acmicpc.net/problem/22866
// 22866번: 탑 보기
// 골드 3 (fail)

function popLowerBuildings(stack, buildings, height) {
  const index = stack[stack.length - 1];
  if (stack.length > 0 && buildings[index] <= height) {
    stack.pop();
    popLowerBuildings(stack, buildings, height);
  }
}

function getNearestBuilding(stack, nearestBuildings, i) {
  if (stack.length === 0) {
    return nearestBuildings[i];
  }
  if (nearestBuildings[i] === null) {
    return stack[stack.length - 1];
  }
  if (
    Math.abs(i - stack[stack.length - 1]) < Math.abs(i - nearestBuildings[i])
  ) {
    return stack[stack.length - 1];
  }
  return nearestBuildings[i];
}

function solution(buildings) {
  const visibleBuildingCounts = new Array(buildings.length).fill(0);
  const nearestBuildings = new Array(buildings.length).fill(null);

  const leftStack = [];
  const rightStack = [];

  for (let i = 0; i < buildings.length; i++) {
    popLowerBuildings(leftStack, buildings, buildings[i]);
    visibleBuildingCounts[i] += leftStack.length;
    nearestBuildings[i] = getNearestBuilding(leftStack, nearestBuildings, i);
    leftStack.push(i);
  }

  for (let i = buildings.length - 1; i >= 0; i--) {
    popLowerBuildings(rightStack, buildings, buildings[i]);
    visibleBuildingCounts[i] += rightStack.length;
    nearestBuildings[i] = getNearestBuilding(rightStack, nearestBuildings, i);
    rightStack.push(i);
  }

  for (let i = 0; i < buildings.length; i++) {
    if (visibleBuildingCounts[i] === 0) {
      console.log('0');
      continue;
    }
    console.log(`${visibleBuildingCounts[i]} ${nearestBuildings[i] + 1}`);
  }
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);

  if (input.length < 2) {
    return;
  }

  const buildings = input[1].split(' ').map((ch) => Number(ch));
  solution(buildings);
  rl.close();
});
