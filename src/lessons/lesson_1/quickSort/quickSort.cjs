function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) {
    return;
  }
  const pivot = arr[Math.floor((r + l) / 2)];
  const index = partition(arr, l, r, pivot);
  quickSort(arr, l, index - 1);
  quickSort(arr, index, r);
}

function partition(arr, l, r, pivot) {
  let i = l,
    j = r;
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

module.exports = { quickSort };
