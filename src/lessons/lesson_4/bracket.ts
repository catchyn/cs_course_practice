import { Stack } from './stack';

export const bracket = (str: string) => {
  const pairs = {
    '[': ']',
    '{': '}',
    '(': ')',
  };
  const closeBackets = Object.values(pairs);
  const stack = new Stack<string>();
  for (const ch of str) {
    if (pairs[ch]) {
      stack.push(pairs[ch]);
      continue;
    }
    if (ch === stack.peek()) {
      stack.pop();
    } else if (closeBackets.includes(ch)) {
      return false;
    }
  }
  return stack.isEmpty();
};
