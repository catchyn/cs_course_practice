import { Stack } from '../../../common/Stack';

const braces: string[] = ['{', '}', '[', ']', '(', ')'];

const braceMap = {
  '{': '}',
  '[': ']',
  '(': ')',
};

const isValid = function (s: string): boolean {
  const stack = new Stack();
  for (let i = 0; i < s.length; i++) {
    if (!braces.some((ch) => ch === s[i])) {
      continue;
    }

    if (stack.isEmpty()) {
      stack.push(s[i]);
    } else {
      const lastChar = stack.peek();
      if (braceMap[lastChar] === s[i]) {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    }
  }
  return stack.isEmpty();
};

console.log(isValid('(hello{world} and [me])')); // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')')); // false
