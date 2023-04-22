// recurse
import { Stack } from '../../../common/Stack';

const collapseByStack = (obj) => {
  const stack = new Stack([[obj]]);
  const result = {};

  while (!stack.isEmpty()) {
    const [value, resultKey] = stack.pop();
    const keys = Object.keys(value);
    for (let i = keys.length - 1; i >= 0; i--) {
      const j = Array.isArray(value) ? keys.length - 1 - i : i;
      if (typeof value[keys[j]] === 'object' && value[keys[j]] !== null) {
        stack.push([value[keys[j]], (resultKey || '') + keys[j] + '.']);
        continue;
      }

      result[(resultKey || '') + keys[j]] = value[keys[j]];
    }
  }
  return result;
};

const collapseByFunc = (obj, valueStr = '', result = {}) => {
  if (typeof obj !== 'object' || obj === null) {
    result[valueStr ? valueStr.slice(0, -1) : ''] = obj;
    return result;
  }

  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    result = collapseByFunc(obj[keys[i]], valueStr + keys[i] + '.', result);
  }

  return result;
};

const obj = {
  a: {
    b: [1, 2],
    '': { c: 2 },
  },
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapseByStack(obj));
console.log(collapseByFunc(obj));
