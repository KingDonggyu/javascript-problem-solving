// https://school.programmers.co.kr/learn/courses/30/lessons/118669
// 2022 KAKAO TECH INTERNSHIP: 등산코스 정하기
// Lv. 3

function solution(n, paths, gates, summits) {
  const gatesSet = new Set(gates);
  const summitsSet = new Set(summits);
  const graph = Array.from({ length: n + 1 }, () => []);

  paths.forEach(([i, j, w]) => {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  });

  const queue = gates.map((start) => [start, 0]);
  const minIntensity = Array(n + 1).fill(Infinity);
  const answer = [Infinity, Infinity];

  while (queue.length > 0) {
    const [spot, intensity] = queue.shift();

    graph[spot].forEach(([nextSpot, time]) => {
      if (gatesSet.has(nextSpot)) {
        return;
      }

      const nextIntensity = Math.max(intensity, time);

      if (minIntensity[nextSpot] <= nextIntensity) {
        return;
      }

      minIntensity[nextSpot] = nextIntensity;

      if (!summitsSet.has(nextSpot)) {
        queue.push([nextSpot, nextIntensity]);
        return;
      }

      if (nextIntensity < answer[1]) {
        answer[0] = nextSpot;
        answer[1] = nextIntensity;
        return;
      }

      if (nextIntensity === answer[1]) {
        answer[0] = Math.min(answer[0], nextSpot);
        answer[1] = nextIntensity;
      }
    });
  }

  return answer;
}
