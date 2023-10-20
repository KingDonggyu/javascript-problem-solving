// 순열 O(n!)
function getPermutation(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const sliced = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutation = getPermutation(sliced, count - 1);
    permutation.forEach((p) => {
      result.push([fixed, ...p]);
    });
  });

  return result;
}

// 중복 순열
function getRedundantPermutation(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, _, origin) => {
    const permutation = getRedundantPermutation(origin, count - 1);
    permutation.forEach((p) => {
      result.push([fixed, ...p]);
    });
  });

  return result;
}
