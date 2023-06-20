import { tag } from '../../common/parser/tag';
import { take } from '../../common/parser/take';
import { seq } from '../../common/parser/seq';

const fnTag = tag('function')('function foo() {}');

console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}

const takeNumber = take(/\d/)('1234 foo');

console.log(takeNumber.next()); // {done: true, value: {type: 'TAKE', value: '1234'}}

const takeNumber2 = take(/\d/, { max: 2 })('1234 foo');

console.log(takeNumber2.next()); // {done: true, value: {type: 'TAKE', value: '12'}}

const fnExpr = seq(
  tag('function '),

  take(/[a-z_$]/i, { max: 1 }),
  take(/\w/, { min: 0 }),

  tag('()'),
)('function foo() {}');

console.log(fnExpr.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}
