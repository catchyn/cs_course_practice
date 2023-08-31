import { Parser, ParserOptions } from '../parser';
import { repeat } from '../repeat';

function opt(parser: Parser, opt: ParserOptions = {}): Parser {
  return repeat(parser, { ...opt, min: 0, max: 1 });
}

export { opt };
