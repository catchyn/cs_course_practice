import { TypedArrayStack } from '../../../../common/TypedArrayStack';

const stack = new TypedArrayStack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
try {
  console.log(stack.pop()); // Exception
} catch (e) {
  console.error((e as Error)?.message);
}
