// https://www.acmicpc.net/problem/4179
// 4179번: 불!
// 골드 4

const WALL = '#';
const PATH = '.';
const JIHOON = 'J';
const FIRE = 'F';

function getJihoonAndFireLocations(r, c, maze) {
  const locations = {
    jihoon: null,
    fire: [],
  };

  for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
      if (maze[x][y] === JIHOON) {
        locations.jihoon = [x, y];
        continue;
      }
      if (maze[x][y] === FIRE) {
        locations.fire.push([x, y]);
      }
    }
  }

  return locations;
}

function isOutOfBounds(r, c, x, y) {
  return x < 0 || x >= r || y < 0 || y >= c;
}

function isEscape(r, c, x, y) {
  return x === 0 || x === r - 1 || y === 0 || y === c - 1;
}

function moveFire(r, c, maze, fireLocations) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const fireMap = Array.from({ length: r }, () => new Array(c).fill(Infinity));
  const queue = fireLocations.map(([x, y]) => {
    fireMap[x][y] = 0;
    return [x, y, 0];
  });

  while (queue.length > 0) {
    const [x, y, time] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (
        isOutOfBounds(r, c, nx, ny) ||
        fireMap[nx][ny] <= time + 1 ||
        maze[nx][ny] === WALL
      ) {
        continue;
      }

      fireMap[nx][ny] = time + 1;
      queue.push([nx, ny, time + 1]);
    }
  }

  return fireMap;
}

function moveJihoon(r, c, maze, fireMap, jihoonLocation) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const visited = Array.from({ length: r }, () => new Array(c).fill(false));
  const [startX, startY] = jihoonLocation;
  const queue = [[startX, startY, 0]];

  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y, time] = queue.shift();

    if (isEscape(r, c, x, y)) {
      return time + 1;
    }

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (
        isOutOfBounds(r, c, nx, ny) ||
        visited[nx][ny] ||
        maze[nx][ny] !== PATH ||
        fireMap[nx][ny] <= time + 1
      ) {
        continue;
      }

      visited[nx][ny] = true;
      queue.push([nx, ny, time + 1]);
    }
  }

  return 'IMPOSSIBLE';
}

function solution(r, c, maze) {
  const { jihoon, fire } = getJihoonAndFireLocations(r, c, maze);
  const fireMap = moveFire(r, c, maze, fire);
  return moveJihoon(r, c, maze, fireMap, jihoon);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(line.split(' ').map((ch) => Number(ch)));
    return;
  }

  const [r, c] = input[0];
  input.push(line.split(''));

  if (input.length === r + 1) {
    const answer = solution(r, c, input.slice(1));
    console.log(answer);
    rl.close();
  }
});
