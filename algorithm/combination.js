// 조합 O(n^count)
function getCombinations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const combinations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = items.slice(index + 1);
    const subCombinations = getCombinations(slicedItems, count - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([fixedItem, ...subCombination]);
    });
  });

  return combinations;
}

// 중복 조합
function getRedundantCombinations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const combinations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = items.slice(index);
    const subCombinations = getRedundantCombinations(slicedItems, count - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([fixedItem, ...subCombination]);
    });
  });

  return combinations;
}
