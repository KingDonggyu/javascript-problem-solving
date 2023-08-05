// https://www.acmicpc.net/problem/1244
// 1244번: 스위치 켜고 끄기
// 실버 4

function pressSwitch(state) {
  return state === 1 ? 0 : 1;
}

function pressSwitchWithMan(switches, number) {
  for (let i = number - 1; i < switches.length; i++) {
    if ((i + 1) % number === 0) {
      switches[i] = pressSwitch(switches[i]);
    }
  }
}

function pressSwitchWithWoman(switches, number) {
  let left = number - 1;
  let right = number - 1;

  while (switches[left] === switches[right]) {
    left -= 1;
    right += 1;

    if (left < 0 || right > switches.length - 1) {
      break;
    }
  }

  for (i = left + 1; i < right; i++) {
    switches[i] = pressSwitch(switches[i]);
  }
}

function pringSwitches(switches) {
  if (switches.length === 0) {
    return;
  }

  const sliced = switches.slice(0, 20);
  console.log(sliced.join(' '));

  const rested = switches.slice(20);
  pringSwitches(rested);
}

function solution(switches, students) {
  students.forEach(([gender, number]) => {
    if (gender === 1) {
      pressSwitchWithMan(switches, number);
      return;
    }
    pressSwitchWithWoman(switches, number);
  });

  pringSwitches(switches);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);

  if (input.length <= 3) {
    return;
  }

  const studentCount = Number(input[2]);

  if (input.length !== studentCount + 3) {
    return;
  }

  const switches = input[1].split(' ').map((x) => Number(x));
  const students = input
    .slice(3)
    .map((s) => s.split(' ').map((x) => Number(x)));

  solution(switches, students);
  rl.close();
});
