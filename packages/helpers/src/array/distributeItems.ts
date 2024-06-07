export function distributeItems<T>(sourceArray: T[], itemCount: number): T[] {
  if (sourceArray.length <= itemCount) return sourceArray;

  const result: T[] = [];
  const n = sourceArray.length;

  // Calculate the interval using floor to evenly space out items
  const interval = Math.floor((n - 1) / (itemCount - 1));

  for (let i = 0; i < itemCount; i++) {
    let index = i * interval;

    // Ensure the last item fetched is the last element of the array if the counts are fewer
    if (i === itemCount - 1 && itemCount > 1) {
      index = n - 1;
    }

    if (index < n) {
      result.push(sourceArray[index]);
    }
  }

  return result;
}
