import {
  NamedParserValue,
  Parser,
  ParserOptions,
  ParserResult,
  ParserToken,
  ParserValue,
  Test,
  testValue,
} from '../parser';
import { toIterableIterator } from '../../lesson_15_iterator/toIterable/toIterable';
import { seq } from '../../lesson_15_iterator/seq/seq';

function take(
  template: Test,
  opt: { min?: number; max?: number } & ParserOptions<string> = {},
): Parser<string> {
  const MIN = opt?.min ?? 1;
  const MAX = opt?.max ?? Infinity;

  // eslint-disable-next-line require-yield
  return function* (
    iterable: Iterable<string>,
    prev?: ParserValue,
  ): Generator<ParserToken<string>, ParserResult<string>, Iterable<string> | undefined> {
    let iter = toIterableIterator(iterable);
    let chunk = iter.next();
    let value = '';
    let count = 0;
    const buffer = [];
    while (count < MAX) {
      if (chunk.done) {
        if (count >= MIN) {
          break;
        }
        const data = yield { type: 'TAKE', value: NamedParserValue.EXPECT_NEW_DATA };
        if (!data) {
          throw new Error('Parse error. Tag. Empty data.');
        }
        iter = toIterableIterator(data);
        chunk = iter.next();
      }

      if (!testValue(template, chunk.value)) {
        if (count < MIN) {
          throw new Error(
            `Parser error. Take. Symbol ${chunk.value} not equal template. Number symbols less than MIN. Prev ${prev}`,
          );
        } else {
          buffer.push(chunk.value);
          break;
        }
      }

      value += chunk.value;
      chunk = iter.next();
      count++;
    }

    if (count === MAX && !chunk.done) {
      buffer.push(chunk.value);
    }

    if (opt.token || opt.tokenValue) {
      yield {
        type: opt.token ?? 'TAKE',
        value: opt.tokenValue?.(value) ?? value,
      };
    }

    return [{ value, type: 'TAKE' }, buffer.length ? seq(buffer, iter) : iter];
  };
}

export { take };
