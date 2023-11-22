// school.programmers.co.kr/learn/courses/30/lessons/118668
// 2022 KAKAO TECH INTERNSHIP: 코딩 테스트 공부
// Lv. 4 (fail)

function min(a, b) {
  return a < b ? a : b;
}

function max(a, b) {
  return a > b ? a : b;
}

function solveProblems(dp, alp, cop, problems) {
  const maxAlp = dp.length - 1;
  const maxCop = dp[0].length - 1;

  for (const [alpReq, copReq, alpRwd, copRwd, cost] of problems) {
    if (alp < alpReq || cop < copReq) {
      continue;
    }

    const addedAlp = alp + alpRwd <= maxAlp ? alp + alpRwd : maxAlp;
    const addedCop = cop + copRwd <= maxCop ? cop + copRwd : maxCop;

    dp[addedAlp][addedCop] = min(dp[addedAlp][addedCop], dp[alp][cop] + cost);
  }
}

function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;

  for (const [alpReq, copReq] of problems) {
    maxAlp = max(maxAlp, alpReq);
    maxCop = max(maxCop, copReq);
  }

  const dp = Array.from({ length: maxAlp + 1 }, () => {
    return Array.from({ length: maxCop + 1 }, () => Infinity);
  });

  dp[alp][cop] = 0;

  for (let currAlp = alp; currAlp <= maxAlp; currAlp++) {
    for (let currCop = cop; currCop <= maxCop; currCop++) {
      if (currAlp < maxAlp) {
        dp[currAlp + 1][currCop] = min(
          dp[currAlp + 1][currCop],
          dp[currAlp][currCop] + 1
        );
      }

      if (currCop < maxCop) {
        dp[currAlp][currCop + 1] = min(
          dp[currAlp][currCop + 1],
          dp[currAlp][currCop] + 1
        );
      }

      solveProblems(dp, currAlp, currCop, problems);
    }
  }

  return dp[maxAlp][maxCop];
}
