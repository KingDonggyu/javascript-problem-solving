// https://school.programmers.co.kr/learn/courses/30/lessons/64062
// 2019 카카오 개발자 겨울 인턴십: 징검다리 건너기
// Lv. 3

function canCross(stones, count, k) {
  let continuousCroosed = 0;

  for (const stone of stones) {
    if (stone > count) {
      continuousCroosed = 0;
      continue;
    }

    if (++continuousCroosed === k) {
      return false;
    }
  }

  return true;
}

function solution(stones, k) {
  let left = 1;
  let right = 200000000;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canCross(stones, mid, k)) {
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return left;
}
