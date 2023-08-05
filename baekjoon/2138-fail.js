// https://www.acmicpc.net/problem/2138
// 2138번: 전구와 스위치
// 골드 5

function press(state) {
  return state === 1 ? 0 : 1;
}

function run(n, currState, targetState, pressCouunt) {
  for (let i = 0; i < n - 1; i++) {
    if (currState[i] === targetState[i]) {
      continue;
    }

    currState[i] = press(currState[i]);
    currState[i + 1] = press(currState[i + 1]);

    if (i + 2 < n) {
      currState[i + 2] = press(currState[i + 2]);
    }

    pressCouunt += 1;
  }

  if (currState.join('') !== targetState.join('')) {
    return -1;
  }

  return pressCouunt;
}

function solution(n, currState, targetState) {
  let answer = run(n, [...currState], [...targetState], 0);

  if (answer !== -1) {
    return answer;
  }

  currState[0] = press(currState[0]);
  currState[1] = press(currState[1]);

  answer = run(n, [...currState], [...targetState], 1);

  return answer;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);

  if (input.length !== 3) {
    return;
  }

  const n = Number(input[0]);
  const currState = Array.from(input[1], (ch) => Number(ch));
  const targetState = Array.from(input[2], (ch) => Number(ch));
  const answer = solution(n, currState, targetState);

  console.log(answer);
  rl.close();
});
