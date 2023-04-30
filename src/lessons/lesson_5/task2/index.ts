// recurse
import { Stack } from '../../../common/Stack';

const collapseByStack = (obj: TaskObject) => {
  const stack = new Stack<StackItem>([[obj]]);
  const result: { [key in string]: string } = {};

  while (!stack.isEmpty()) {
    const item = stack.pop() as StackItem;
    const [value, resultKey] = item;
    const keys = Object.keys(value);
    for (let i = keys.length - 1; i >= 0; i--) {
      const j = Array.isArray(value) ? keys.length - 1 - i : i;
      if (typeof value[keys[j]] === 'object' && value[keys[j]] !== null) {
        stack.push([value[keys[j]] as TaskObject, (resultKey || '') + keys[j] + '.']);
        continue;
      }

      result[(resultKey || '') + keys[j]] = <string>value[keys[j]];
    }
  }
  return result;
};

const collapseByFunc = (
  obj: TaskObject,
  valueStr = '',
  result: { [key in string]: string } = {},
) => {
  if (typeof obj !== 'object' || obj === null) {
    result[valueStr ? valueStr.slice(0, -1) : ''] = obj;
    return result;
  }

  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    result = collapseByFunc(obj[keys[i]] as TaskObject, valueStr + keys[i] + '.', result);
  }

  return result;
};

const obj: TaskObject = {
  a: {
    b: [1, 2],
    '': { c: 2 },
  },
};

type TaskObject = {
  [key in string]: TaskObject | (number | string | TaskObject)[] | string | number | null;
};

type StackItem = [obj: TaskObject, key?: string];

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapseByStack(obj));
console.log(collapseByFunc(obj));
