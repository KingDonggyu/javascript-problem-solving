// 순열
function getPermutation(arr, count) {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const sliced = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutation = getPermutation(sliced, count - 1);
    const attached = permutation.map((p) => [fixed, ...p]);
    result.push(...attached);
  });

  return result;
}

// 중복 순열
function getRedundantPermutation() {
  if (count === 1) {
    return arr.map((el) => [el]);
  }

  const result = [];

  arr.forEach((fixed, index, origin) => {
    const permutation = getPermutation(origin, count - 1);
    const attached = permutation.map((p) => [fixed, ...p]);
    result.push(...attached);
  });

  return result;
}
