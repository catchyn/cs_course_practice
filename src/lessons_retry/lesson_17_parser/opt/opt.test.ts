import { repeat } from '../repeat';
import { tag } from '../tag';
import { opt } from './opt';
import { take } from '../take';
import { seq } from '../seq';

describe('test opt function', () => {
  it('should return value for parse symbol', () => {
    const optQuestion = opt(tag('?', { token: 'QUESTION' }))('?');
    expect([...optQuestion]).toEqual([{ type: 'QUESTION', value: '?' }]);
  });
  it("should return empty array if symbol didn't match", () => {
    const optQuestion = opt(tag('?', { token: 'QUESTION' }))('');
    expect([...optQuestion]).toEqual([]);
  });
  it('should return array', function () {
    const takeNumbers = repeat(
      seq(
        {
          token: 'NUMBER',
          tokenValue(value: unknown[]) {
            return value.map(({ value }) => value);
          },
        },
        take(/\d/),
        opt(tag(',')),
      ),
      { min: 1 },
    )('100,200,300');

    expect([...takeNumbers]).toEqual([
      { type: 'NUMBER', value: ['100', [{ type: 'TAG', value: ',' }]] },
      { type: 'NUMBER', value: ['200', [{ type: 'TAG', value: ',' }]] },
      { type: 'NUMBER', value: ['300', []] },
    ]);
  });
});
