import { Stack } from '../lesson_4/stack';

export const collapseStack = (obj: any): any => {
  const stack = new Stack([[obj, '']]);
  const result = {};
  while (!stack.isEmpty()) {
    const [value, keyStr] = stack.pop();
    if (Object.prototype.toString.call(value) === '[object Object]' && value !== null) {
      for (const key in value) {
        if (Object.hasOwn(value, key)) {
          stack.push([value[key], keyStr + (keyStr ? `.` : '') + key]);
        }
      }
    } else if (Object.prototype.toString.call(value) === '[object Array]' && value !== null) {
      for (let i = 0; i < value.length; i++) {
        stack.push([value[i], keyStr + (keyStr ? `.` : '') + i]);
      }
    } else {
      result[keyStr] = value;
    }
  }
  return result;
};
