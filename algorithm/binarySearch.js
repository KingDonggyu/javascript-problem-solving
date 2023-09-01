function binarySearch(items, limit) {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = items[mid];

    if (value <= limit) {
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return left;
}
