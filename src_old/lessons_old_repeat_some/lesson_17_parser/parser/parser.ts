interface ParserToken<T = unknown> {
  type: string;
  value?: T;
}

type ParserValue<T = unknown> = ParserToken<T>;

type ParserResult<T = unknown> = [ParserValue<T>, Iterable<string>];

type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: ParserValue,
) => Generator<ParserToken<T>, ParserResult<R>, Iterable<string> | undefined>;

type ParserOptions<T = unknown> = {
  token?: string;
  tokenValue?(value: unknown): T;
};

enum NamedParserValue {
  EXPECT_NEW_DATA = 'EXPECT_NEW_DATA',
}

export { Parser, ParserToken, ParserValue, ParserResult, ParserOptions, NamedParserValue };
