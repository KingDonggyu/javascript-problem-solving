function topologySort(graph, indegreeCounts) {
  const result = [];
  const queue = [];

  indegreeCounts.forEach((count, i) => {
    if (count === 0) {
      queue.push(i);
    }
  });

  while (queue.length > 0) {
    const x = queue.shift();
    result.push(x);

    graph[x].forEach((next) => {
      indegreeCounts[next] -= 1;
      if (indegreeCounts[next] === 0) {
        queue.push(next);
      }
    });
  }

  return result;
}
