import { NamedParserValue, Parser, ParserOptions } from '../parser';
import {
  toIterableIterator,
  toIterableIteratorBuffer,
} from '../../lesson_15_iterator/toIterable/toIterable';
import { seq } from '../../../common/iterators/seq';

function repeat(parser: Parser, opt: ParserOptions & { min?: number; max?: number } = {}): Parser {
  const MAX = opt.max ?? Infinity;
  const MIN = opt.min ?? 1;

  return function* (iterable: Iterable<string>, prev) {
    let data,
      count = 0;
    const resultValues = [];
    let yields = [];
    let iter = toIterableIterator(iterable);
    const globalBuffer = [];
    // eslint-disable-next-line no-constant-condition
    outer: while (true) {
      const buffer = count >= MIN ? [] : globalBuffer;
      const parsing = parser(toIterableIteratorBuffer(iter, buffer), prev);

      while (true) {
        if (count >= MAX) {
          yield* yields;
          break outer;
        }

        try {
          const chunk = parsing.next(data);

          if (!chunk.done) {
            if (chunk.value['value'] === NamedParserValue.EXPECT_NEW_DATA) {
              if (count < MIN) {
                data = yield chunk.value['value'];
              }
            } else {
              yields.push(chunk.value);
            }
          } else {
            prev = chunk.value[0];
            iter = toIterableIterator(chunk.value[1]);
            count++;
            resultValues.push(chunk.value[0]);
            if (count >= MIN) {
              yield* yields;
              yields = [];
            }
            break;
          }
        } catch (e) {
          if (count < MIN) {
            throw new Error('Parser error. Repeat. Count parser frames less than MIN');
          }
          iter = toIterableIterator(seq(buffer, iter));
          break outer;
        }
      }
    }

    if (opt.token) {
      yield { type: opt.token ?? 'REPEAT', value: opt.tokenValue?.(resultValues) ?? resultValues };
    }

    return [{ type: 'REPEAT', value: resultValues }, iter];
  };
}

export { repeat };
