export const biSearchLeft = <T>(arr: T[], comparator: (item: T) => number) => {
  let from = 0,
    to = arr.length;
  let res = null;

  while (from < to) {
    const mid = Math.floor((from + to) / 2);
    const k = comparator(arr[mid]);
    if (!k) {
      res = mid;
    }

    if (k < 0) {
      from = mid + 1;
    }

    if (k >= 0) {
      to = mid;
    }
  }

  return res;
};

export const biSearchRight = <T>(arr: T[], comparator: (item: T) => number) => {
  let from = 0,
    to = arr.length;
  let res = null;

  while (from < to) {
    const mid = Math.floor((from + to) / 2);
    const k = comparator(arr[mid]);
    if (!k) {
      res = mid;
    }

    if (k <= 0) {
      from = mid + 1;
    }

    if (k > 0) {
      to = mid;
    }
  }

  return res;
};
