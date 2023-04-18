import { Dequeue } from '../../../common/Dequeue';

const dequeue = new Dequeue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
try {
  console.log(dequeue.pop()); // Exception
} catch (e) {
  console.error('Error: ', e.message);
}
