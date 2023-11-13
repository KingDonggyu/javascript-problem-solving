// https://www.acmicpc.net/problem/1285
// 1285번: 동전 뒤집기
// 골드 1 (fail)

const COIN_FACE = {
  head: 'H',
  tail: 'T',
};

function copy2DArray(array) {
  return array.map((rowItems) => [...rowItems]);
}

function getflippedCoin(coin) {
  if (coin === COIN_FACE.head) {
    return COIN_FACE.tail;
  }
  return COIN_FACE.head;
}

function flipCoinsInRow(coins, row) {
  for (col = 0; col < coins[0].length; col++) {
    coins[row][col] = getflippedCoin(coins[row][col]);
  }
}

function getMinTailCoinCount(coins) {
  let minTailCoinCount = 0;

  for (let col = 0; col < coins[0].length; col++) {
    const coinCount = { head: 0, tail: 0 };

    for (let row = 0; row < coins.length; row++) {
      if (coins[row][col] === COIN_FACE.head) {
        coinCount.head += 1;
        continue;
      }

      coinCount.tail += 1;
    }

    minTailCoinCount += Math.min(coinCount.head, coinCount.tail);
  }

  return minTailCoinCount;
}

function solution(N, coins) {
  let answer = N * N;

  for (let bits = 0; bits < 1 << N; bits++) {
    const currentCoins = copy2DArray(coins);

    for (let row = 0; row < N; row++) {
      if (bits & (1 << row)) {
        flipCoinsInRow(currentCoins, row);
      }
    }

    const tailCoinCount = getMinTailCoinCount(currentCoins);
    answer = Math.min(answer, tailCoinCount);
  }

  return answer;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(Number(line));
    return;
  }

  const N = input[0];
  input.push(line.split(''));

  if (input.length === N + 1) {
    const answer = solution(N, input.slice(1));
    console.log(answer);
    rl.close();
  }
});
