import { repeat } from './repeat';
import { seq } from '../seq';
import { take } from '../take';
import { tag } from '../tag';

describe('test function repeat', () => {
  it('test', () => {
    const fnExpr = repeat(
      seq(
        {
          token: 'NUMBER',
          tokenValue(value: []) {
            return value.map(({ value }) => value);
          },
        },
        take(/\d/),
        tag(','),
      ),
      {
        token: 'REPEAT',
        min: 1,
      },
    )('100,200,300,');
    console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '100,'}}
    console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '200,'}}
    console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '300,'}}
  });
});
