// 조합
function getCombination(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const sliced = origin.slice(index + 1);
    const combination = getCombination(sliced, count - 1);
    const attached = combination.map((c) => [fixed, ...c]);
    result.push(...attached);
  });

  return result;
}

// 중복 조합
function getRedundantCombination(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const sliced = origin.slice(index);
    const combination = getRedundantCombination(sliced, count - 1);
    const attached = combination.map((c) => [fixed, ...c]);
    result.push(...attached);
  });

  return result;
}
