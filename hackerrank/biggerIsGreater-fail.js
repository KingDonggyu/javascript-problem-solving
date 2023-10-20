// https://www.hackerrank.com/challenges/bigger-is-greater/problem?isFullScreen=true
// "Bigger is Greater"
// DIFFICULTY: Medium

function biggerIsGreater(w) {
  const chars = Array.from(w);
  let i = chars.length - 2;

  while (i >= 0 && chars[i] >= chars[i + 1]) {
    i--;
  }

  if (i === -1) {
    return 'no answer';
  }

  let j = chars.length - 1;

  while (chars[j] <= chars[i]) {
    j--;
  }

  [chars[i], chars[j]] = [chars[j], chars[i]];

  const answer = [...chars.slice(0, i + 1), ...chars.slice(i + 1).sort()];

  return answer.join('');
}
