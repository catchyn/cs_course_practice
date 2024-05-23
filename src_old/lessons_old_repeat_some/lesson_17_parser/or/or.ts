import { NamedParserValue, Parser, ParserOptions, ParserToken, ParserValue } from '../parser';
import {
  toIterableIterator,
  toIterableIteratorBuffer,
} from '../../lesson_15_iterator/toIterable/toIterable';
import { seq } from '../../lesson_15_iterator/seq/seq';

function or(optAndParser: Parser, ...parsers: Parser[]): Parser;
function or(optAndParser: ParserOptions, ...parsers: Parser[]): Parser;
function or(optAndParser: Parser | ParserOptions, ...parsers: Parser[]): Parser {
  let opt: ParserOptions = {};
  if (optAndParser instanceof Function) {
    parsers.unshift(optAndParser);
  } else {
    opt = optAndParser;
  }

  // eslint-disable-next-line require-yield
  return function* (iterable: Iterable<string>, prev?: ParserValue) {
    let iter = toIterableIterator(iterable);
    let data,
      value,
      done = false;
    let yields = [];

    outer: for (const parser of parsers) {
      const buffer = [];
      const parsing = parser(toIterableIteratorBuffer(iter, buffer), prev);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const chunk = parsing.next(data);
          if (chunk.done) {
            done = true;
            value = chunk.value[0];
            iter = toIterableIterator(chunk.value[1]);
            break outer;
          } else {
            const needNewData = chunk.value as ParserToken;
            if (needNewData.value === NamedParserValue.EXPECT_NEW_DATA) {
              data = yield needNewData.value;
            } else {
              yields.push(chunk.value);
            }
          }
        } catch (e) {
          iter = toIterableIterator(seq(buffer, iter));
          yields = [];
          break;
        }
      }
    }

    if (!done) {
      throw new Error('Parser Error. Or. No match value.');
    }

    yield* yields;

    if (opt.token) {
      yield { type: opt.token ?? 'OR', value: opt?.tokenValue?.(value) ?? value };
    }

    return [{ type: 'OR', value }, iter];
  };
}

export { or };
