import { Queue } from '../../../common/Queue';

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

try {
  console.log(queue.head); // 10

  console.log(queue.pop()); // 10

  console.log(queue.head); // 11

  console.log(queue.pop()); // 11
  console.log(queue.pop()); // 12

  console.log(queue.pop()); // Exception
} catch (e) {
  console.log('error message: ', e.message);
}
