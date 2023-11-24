// https://school.programmers.co.kr/learn/courses/30/lessons/92342
// 2022 KAKAO BLIND RECRUITMENT: 양궁대회
// Lv. 2

function getRedundantCombinations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const combinations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = items.slice(index);
    const subCombinations = getRedundantCombinations(slicedItems, count - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([fixedItem, ...subCombination]);
    });
  });

  return combinations;
}

function getRyanTotalScoreDiff(ryanInfo, apeachInfo) {
  let ryanTotalScore = 0;
  let apeachTotalScore = 0;

  for (let score = 10; score >= 0; score--) {
    const ryanCount = ryanInfo[10 - score];
    const apeachCount = apeachInfo[10 - score];

    if (ryanCount === 0 && apeachCount === 0) {
      continue;
    }

    if (ryanCount > apeachCount) {
      ryanTotalScore += score;
      continue;
    }

    apeachTotalScore += score;
  }

  return ryanTotalScore - apeachTotalScore;
}

function solution(n, info) {
  const score = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ryanScoreCombinations = getRedundantCombinations(score, n);
  const winnerRyan = { diff: 0, info: [-1] };

  ryanScoreCombinations.forEach((ryanScore) => {
    const ryanInfo = Array(11).fill(0);

    ryanScore.forEach((score) => (ryanInfo[10 - score] += 1));

    const diff = getRyanTotalScoreDiff(ryanInfo, info);

    if (diff > winnerRyan.diff) {
      winnerRyan.diff = diff;
      winnerRyan.info = ryanInfo;
    }
  });

  return winnerRyan.info;
}
