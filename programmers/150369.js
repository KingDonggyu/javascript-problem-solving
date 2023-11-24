// https://school.programmers.co.kr/learn/courses/30/lessons/150369
// 2023 KAKAO BLIND RECRUITMENT: 택배 배달과 수거하기
// Lv. 2

function initBoxes(boxes) {
  if (boxes.length === 0) {
    return;
  }

  if (boxes[boxes.length - 1] === 0) {
    boxes.pop();
    initBoxes(boxes);
  }
}

function deliverOrPickup(cap, boxes) {
  if (boxes.length === 0) {
    return;
  }

  if (boxes[boxes.length - 1] === 0) {
    boxes.pop();
    deliverOrPickup(cap, boxes);
    return;
  }

  if (cap === 0) {
    return;
  }

  boxes[boxes.length - 1] -= 1;
  deliverOrPickup(cap - 1, boxes);
}

function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  initBoxes(deliveries);
  initBoxes(pickups);

  while (deliveries.length || pickups.length) {
    answer += Math.max(deliveries.length, pickups.length) * 2;
    deliverOrPickup(cap, deliveries);
    deliverOrPickup(cap, pickups);
  }

  return answer;
}
