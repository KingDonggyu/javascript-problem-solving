// https://school.programmers.co.kr/learn/courses/30/lessons/67258
// 2020 카카오 인턴십: 보석 쇼핑
// Lv. 3

function increaseMapValue(map, item) {
  if (!map.has(item)) {
    map.set(item, 1);
    return;
  }
  map.set(item, map.get(item) + 1);
}

function decreaseMapValue(map, item) {
  if (map.get(item) === 1) {
    map.delete(item);
    return;
  }
  map.set(item, map.get(item) - 1);
}

function solution(gems) {
  const gemMap = new Map();
  const gemCount = new Set(gems).size;

  let start = 0;
  let end = -1;
  let answer = [1, gems.length];

  while (end < gems.length) {
    if (gemMap.size !== gemCount) {
      end += 1;
      increaseMapValue(gemMap, gems[end]);
      continue;
    }

    if (end - start < answer[1] - answer[0]) {
      answer = [start + 1, end + 1];
    }

    decreaseMapValue(gemMap, gems[start]);
    start += 1;
  }

  return answer;
}
