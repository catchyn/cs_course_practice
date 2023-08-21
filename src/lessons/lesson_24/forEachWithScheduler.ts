// ## Необходимо доработать функцию forEach, чтобы несколько таких вызовов гарантировано не вызывали фризов
import { forEach } from './forEach';

let total = 0;

setInterval(() => {
  console.log('------------------');
}, 100);

forEach(new Array(50e7), (_, i) => {
  console.log(i);
  total++;
});

forEach(new Array(50e7), (_, i) => {
  console.log(i);
  total++;
});

forEach(new Array(50e7), (_, i) => {
  console.log(i);
  total++;
});

forEach(new Array(50e7), (_, i) => {
  console.log(i);
  total++;
});

forEach(new Array(50e7), (_, i) => {
  console.log(i);
  total++;
});

console.log(total);
