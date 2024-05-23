import {
  Parser,
  ParserResult,
  ParserToken,
  ParserValue,
  ParserOptions,
  Test,
  NamedParserValue,
  testValue,
} from '../parser';
import { toIterableIterator } from '../../lesson_15_iterator/toIterable/toIterable';

function tag(template: Iterable<Test>, opt: ParserOptions<string> = {}): Parser<string, string> {
  // eslint-disable-next-line require-yield
  return function* (
    iterable: Iterable<string>,
    prev?: ParserValue,
  ): Generator<ParserToken<string>, ParserResult<string>, Iterable<string> | undefined> {
    let iter = toIterableIterator(iterable);
    let value = '';
    for (const item of template) {
      let chunk = iter.next();
      if (chunk.done) {
        const data = yield { type: 'TAG', value: NamedParserValue.EXPECT_NEW_DATA };
        if (!data) {
          throw new Error('Parse error. Tag. Empty data.');
        }
        iter = toIterableIterator(data);
        chunk = iter.next();
      }

      if (!testValue(item, chunk.value)) {
        throw new Error(
          `Parse error. Tag. Symbol "${chunk.value}" not equal template. Prev ${prev}.`,
        );
      }

      value += chunk.value;
    }

    if (opt.token || opt.tokenValue) {
      yield { type: opt.token ?? 'TAG', value: opt.tokenValue?.(value) ?? value };
    }

    return [{ type: 'TAG', value }, iter];
  };
}

export { tag };
