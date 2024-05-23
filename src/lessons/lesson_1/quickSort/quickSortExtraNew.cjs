function quickSortExtraNew(arr, l = 0, r = arr.length - 1) {
  if (l < r) {
    const i = partition(arr, l, r);
    quickSortExtraNew(arr, l, i - 1);
    quickSortExtraNew(arr, i + 1, r);
  }
}

function partition(arr, l, r) {
  const pivot = arr[r];
  let i = 0, j = r - 1;
  while (i < j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  if (arr[i] > pivot) {
    [arr[i], arr[r]] = [pivot, arr[i]];
  }
  return i;
}

module.exports = { quickSortExtraNew };