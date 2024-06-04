import { Stack } from './stack';

export const reverse = (str: string): string => {
  const stack = new Stack<string>();
  let result = '';
  for (const key of str) {
    stack.push(key);
  }
  while (!stack.isEmpty()) {
    result += stack.pop();
  }
  return result;
};
