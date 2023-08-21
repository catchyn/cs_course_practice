import { Parser, ParserError, ParserOptions, ParserState } from '../../types/Parser';
import { Test, testChar } from './test';
import { intoIterableIter } from '../../utils/parser';
import { seq } from '../iterators/seq';

type TakeOptions = ParserOptions<string> & {
  min?: number;
  max?: number;
};

export function take(test: Test, opts: TakeOptions = {}): Parser<string, string> {
  return function* (source, prev) {
    const { min = 1, max = Infinity } = opts;

    const buffer: string[] = [];

    let iter = intoIterableIter(source),
      count = 0;

    let value = '';

    while (true) {
      if (count >= max) {
        break;
      }

      let chunk = iter.next(),
        char = chunk.value;

      if (chunk.done) {
        if (count >= min) {
          break;
        }

        const data = yield ParserState.EXPECT_NEW_INPUT;

        if (data == null) {
          throw new ParserError('Invalid input', prev);
        }

        source = data;
        iter = intoIterableIter(source);
        chunk = iter.next();
        char = chunk.value;
      }

      try {
        if (testChar(test, char, prev)) {
          count++;
        }
      } catch (err) {
        if (count < min) {
          throw err;
        }

        buffer.push(char);
        break;
      }

      value += char;
    }

    if (opts.token && count > 0) {
      yield {
        type: opts.token,
        value: opts.tokenValue?.(value) ?? value,
      };
    }

    const token = {
      type: 'TAKE',
      value,
    };

    return [token, buffer.length > 0 ? seq(buffer, iter) : iter];
  };
}
