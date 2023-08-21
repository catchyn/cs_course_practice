import { Parser, ParserState, ParserOptions, ParserError } from '../../types/Parser';
import { intoIterableIter } from '../../utils/parser';
import { Test, testChar } from './test';

export function tag(
  template: Iterable<Test>,
  opt: ParserOptions<string> = {},
): Parser<string, string> {
  return function* (data: Iterable<string>, prev) {
    let iter = intoIterableIter(data);
    let value = '';
    for (const char of template) {
      let chunk = iter.next();
      if (chunk.done) {
        const newData = yield ParserState.EXPECT_NEW_INPUT;

        if (!newData) {
          throw new ParserError('incorrect data', prev);
        }

        data = newData;
        iter = intoIterableIter(data);
        chunk = iter.next();
      }

      testChar(char, chunk.value, prev);

      value += char;
    }

    if (opt) {
      yield {
        type: opt?.token || 'TAG',
        value: opt?.tokenValue?.(value) ?? value,
      };
    }

    return [{ type: 'TAG', value }, iter];
  };
}
