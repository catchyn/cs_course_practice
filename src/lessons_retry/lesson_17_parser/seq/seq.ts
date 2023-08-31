import { NamedParserValue, Parser, ParserOptions, ParserToken } from '../parser';
import { toIterableIterator } from '../../lesson_15_iterator/toIterable/toIterable';

function seq<T = unknown, R = unknown>(parser: Parser, ...parsers: Parser[]): Parser<T | T[], R[]>;
function seq<T = unknown, R = unknown>(
  opt: ParserOptions,
  ...parsers: Parser[]
): Parser<T | T[], R[]>;

function seq<T = unknown, R = unknown>(
  optOrParse: ParserOptions | Parser,
  ...parsers: Parser[]
): Parser<T | T[], R[]> {
  let opt: ParserOptions = {};
  if (optOrParse instanceof Function) {
    parsers.unshift(optOrParse);
  } else {
    opt = optOrParse;
  }
  return function* (iterable, prev) {
    let iter = toIterableIterator(iterable),
      data;
    const resultValue: unknown[] = [];
    for (const parser of parsers) {
      const parsing = parser(iter, prev);
      while (true) {
        const chunk = parsing.next(data);
        if (!chunk.done) {
          const chunkParserToken = chunk.value as any;
          if (chunkParserToken.value === NamedParserValue.EXPECT_NEW_DATA) {
            data = yield chunkParserToken;
          } else {
            yield chunk.value as ParserToken<T>;
          }
        } else {
          prev = chunk.value[0];
          resultValue.push(prev);
          iter = toIterableIterator(chunk.value[1]);
          break;
        }
      }
    }

    if (opt.token || opt.tokenValue) {
      yield {
        type: opt.token ?? 'SEQ',
        value: (opt.tokenValue?.(resultValue) ?? resultValue) as T[],
      };
    }

    return [{ type: 'SEQ', value: resultValue as R[] }, iter];
  };
}

export { seq };
