// https://school.programmers.co.kr/learn/courses/30/lessons/214289
// 2023 현대모비스 알고리즘 경진대회 예선: 에어컨
// Lv. 3 (fail)

function get2DArray(rowSize, colSize, value) {
  return Array.from({ length: rowSize }, () => Array(colSize).fill(value));
}

function solution(temperature, t1, t2, a, b, onboard) {
  temperature += 10;
  t1 += 10;
  t2 += 10;

  const secondLimit = onboard.length;
  const outdoorTemp = temperature;

  let minTemp = Math.min(outdoorTemp, t1);
  let maxTemp = Math.max(outdoorTemp, t2);

  const dp = get2DArray(secondLimit, maxTemp + 1, Infinity);

  dp[0][outdoorTemp] = 0;

  onboard.forEach((isBoard, second) => {
    if (second === 0) {
      return;
    }

    let startTemp = minTemp;
    let endTemp = maxTemp;

    if (isBoard) {
      startTemp = t1;
      endTemp = t2;
    }

    for (let desiredTemp = startTemp; desiredTemp <= endTemp; desiredTemp++) {
      const powerConsumptions = [];

      if (desiredTemp === outdoorTemp) {
        if (desiredTemp > 0) {
          powerConsumptions.push(dp[second - 1][desiredTemp - 1]);
        }
        if (desiredTemp < maxTemp) {
          powerConsumptions.push(dp[second - 1][desiredTemp + 1]);
        }
        powerConsumptions.push(dp[second - 1][desiredTemp]);
        dp[second][desiredTemp] = Math.min(...powerConsumptions);
        continue;
      }

      powerConsumptions.push(dp[second - 1][desiredTemp] + b);

      if (desiredTemp > outdoorTemp) {
        if (desiredTemp > 0) {
          powerConsumptions.push(dp[second - 1][desiredTemp - 1] + a);
        }
        if (desiredTemp < maxTemp) {
          powerConsumptions.push(dp[second - 1][desiredTemp + 1]);
        }
      }

      if (desiredTemp < outdoorTemp) {
        if (desiredTemp > 0) {
          powerConsumptions.push(dp[second - 1][desiredTemp - 1]);
        }
        if (desiredTemp < maxTemp) {
          powerConsumptions.push(dp[second - 1][desiredTemp + 1] + a);
        }
      }

      dp[second][desiredTemp] = Math.min(...powerConsumptions);
    }
  });

  return Math.min(...dp[secondLimit - 1]);
}
