import { tag } from '../tag';
import { take } from '../take';
import { seq } from './seq';
import { NamedParserValue, ParserToken } from '../parser';

describe('test seq function', () => {
  it('should test with take and tag parsers', function () {
    const fnExpr = seq(
      tag('function '),

      take(/[a-z_$]/i, { max: 1 }),
      take(/\w/, { min: 0 }),

      tag('()'),
    )('function foo() {}');
    expect(fnExpr.next().value[0]).toEqual({
      type: 'SEQ',
      value: [
        {
          type: 'TAG',
          value: 'function ',
        },
        {
          type: 'TAKE',
          value: 'f',
        },
        {
          type: 'TAKE',
          value: 'oo',
        },
        {
          type: 'TAG',
          value: '()',
        },
      ],
    });
  });
  it('should add new data', function () {
    const fnExpr = seq(
      { token: 'CUSTOM' },
      tag('function '),

      take(/[a-z_$]/i, { max: 1 }),
      take(/\w/, { min: 0 }),

      tag('()'),
    )('function');
    expect(fnExpr.next().value['value']).toBe(NamedParserValue.EXPECT_NEW_DATA);
    expect(fnExpr.next(' foo() {}').value).toEqual({
      type: 'CUSTOM',
      value: [
        {
          type: 'TAG',
          value: 'function ',
        },
        {
          type: 'TAKE',
          value: 'f',
        },
        {
          type: 'TAKE',
          value: 'oo',
        },
        {
          type: 'TAG',
          value: '()',
        },
      ],
    });
  });
  it('should use named token', function () {
    const fnExpr = seq(
      {
        token: 'CUSTOM',
        tokenValue(value: ParserToken[]) {
          return value.map(({ value }) => value);
        },
      },
      tag('function ', { token: 'FN_KW' }),

      take(/[a-z_$]/i, { max: 1 }),
      take(/\w/, { min: 0 }),

      tag('()', { token: 'BACK' }),
    )('function foo() {}');
    expect([...fnExpr]).toEqual([
      { type: 'FN_KW', value: 'function ' },
      { type: 'BACK', value: '()' },
      { type: 'CUSTOM', value: ['function ', 'f', 'oo', '()'] },
    ]);
  });
});
