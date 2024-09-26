import { firstRegexp, matchAllRegexp, numberSplitRegexp } from '../regexp';
import { format } from '../format';
import { calc } from '../calc';

describe('test regexp', () => {
  test('test firstRegexp', () => {
    expect(firstRegexp.test('привет')).toBe(false);
    expect(firstRegexp.test('привет1')).toBe(true);
    expect(firstRegexp.test('приветs')).toBe(true);
    expect(firstRegexp.test('привет_')).toBe(true);
    expect(firstRegexp.test('привет$')).toBe(true);
  });

  test('test numberSplitRegexp', () => {
    expect(
      '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(numberSplitRegexp),
    ).toEqual(['762120', '763827', '750842', '749909', '755884']);
  });

  test('test matchAllRegexp', () => {
    expect([...'{"a": 1, "b": "2"}'.matchAll(matchAllRegexp)]).toMatchObject([
      ['"a": 1', 'a', '1'],
      ['"b": "2"', 'b', '"2"'],
    ]);
  });
  test('test format', () => {
    expect(format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 })).toBe(
      'Hello, Bob! Your age is 10.',
    );
  });
  test('test calc', () => {
    expect(
      calc(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`),
    ).toBe(`
Какой-то текст 1
Еще какой то текст 20
`);
  });
});
