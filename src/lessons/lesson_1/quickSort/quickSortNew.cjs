function quickSortNew(arr, l = 0, r = arr.length - 1) {
  if (l >= r) {
    return;
  }
  const index = partition(arr, l, r);
  quickSortNew(arr, l, index - 1);
  quickSortNew(arr, index + 1, r);
}

function partition(arr, l, r) {
  let i = l, j = r - 1, pivot = arr[r];

  while (i < j) {
    while ( i < r && arr[i] < pivot) i++;
    while ( j > l && arr[j] > pivot) j--;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  if (arr[i] > pivot) {
    [arr[i], arr[r]] = [pivot, arr[i]];
  }

  return i;
}

module.exports = { quickSortNew };