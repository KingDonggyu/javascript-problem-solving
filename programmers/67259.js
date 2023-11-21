// https://school.programmers.co.kr/learn/courses/30/lessons/67259
// 2020 카카오 인턴십: 경주로 건설
// Lv. 3

function isWall(space) {
  return space === 1;
}

function isOutOfBounds(x, y, rowSize, colSize) {
  return x < 0 || x >= rowSize || y < 0 || y >= colSize;
}

function solution(board) {
  const movement = {
    x: [-1, 1, 0, 0],
    y: [0, 0, -1, 1],
  };
  const n = board.length;
  const startX = 0;
  const startY = 0;

  const minCosts = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array(4).fill(Infinity))
  );

  const stack = [
    {
      x: startX,
      y: startY,
      direction: 1,
      cost: 0,
    },
    {
      x: startX,
      y: startY,
      direction: 3,
      cost: 0,
    },
  ];

  minCosts[startX][startY][1] = 0;
  minCosts[startX][startY][3] = 0;

  while (stack.length > 0) {
    const { x, y, direction, cost } = stack.pop();

    for (let nextDirection = 0; nextDirection < 4; nextDirection++) {
      const nextX = x + movement.x[nextDirection];
      const nextY = y + movement.y[nextDirection];
      const nextCost = cost + (direction === nextDirection ? 100 : 600);

      if (
        isOutOfBounds(nextX, nextY, n, n) ||
        isWall(board[nextX][nextY]) ||
        nextCost >= minCosts[nextX][nextY][nextDirection]
      ) {
        continue;
      }

      minCosts[nextX][nextY][nextDirection] = nextCost;
      stack.push({
        x: nextX,
        y: nextY,
        direction: nextDirection,
        cost: nextCost,
      });
    }
  }

  return Math.min(...minCosts[n - 1][n - 1]);
}
