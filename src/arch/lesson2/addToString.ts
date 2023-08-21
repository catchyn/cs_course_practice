const addToString = <T>(arr: T[]): T[] => {
  arr.toString = function (this: T[]) {
    switch (this.length) {
      case 0: {
        return '';
      }
      case 1: {
        return String(this[0]);
      }
      default: {
        return `${String(this[0])}..${String(this[this.length - 1])}`;
      }
    }
  };
  return arr;
};

console.log(addToString([1, 2, 3, 4]).toString());
console.log(addToString([1]).toString());
console.log(addToString([]).toString());
