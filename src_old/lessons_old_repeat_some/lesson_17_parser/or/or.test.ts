import { or } from './or';
import { tag } from '../tag';
import { seq } from '../seq';
import { take } from '../take';

describe('test or function', () => {
  it('should take 2 argument if first tag bad', function () {
    const boolExpr = or(
      {
        token: 'BOOL',
        tokenValue: ({ value }) => value,
      },
      tag('true'),
      tag('false'),
    )('false');
    const value = boolExpr.next().value;
    expect(value).toEqual({ type: 'BOOL', value: 'false' });
  });
  it('should work with custom example 2', function () {
    const expr = or(take('z'), seq(tag('a', { token: 'FIRST' })))('a, b?');
    expect([...expr]).toEqual([{ type: 'FIRST', value: 'a' }]);
  });
});
