// 순열 O(n^count)
function getPermutations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = [...items.slice(0, index), ...items.slice(index + 1)];
    const subPermutations = getPermutations(slicedItems, count - 1);
    subPermutations.forEach((currentPermutation) => {
      permutations.push([fixedItem, ...currentPermutation]);
    });
  });

  return permutations;
}

// 중복 순열
function getRedundantPermutations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem) => {
    const subPermutations = getRedundantPermutations(items, count - 1);
    subPermutations.forEach((currentPermutation) => {
      permutations.push([fixedItem, ...currentPermutation]);
    });
  });

  return permutations;
}
