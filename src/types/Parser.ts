export type ParserToken<T = unknown> = {
  type: string;
  value?: T;
};

export type ParserValue<T = unknown> = ParserToken<T>;

export type ParserResult<T = unknown> = [ParserValue<T>, Iterable<string>];

export type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  prev?: ParserValue,
) => Generator<ParserState | ParserToken<T>, ParserResult<R>, Iterable<string> | undefined>;

export enum ParserState {
  EXPECT_NEW_INPUT = 'EXPECT_NEW_INPUT',
}

export type ParserOptions<T = unknown> = {
  token?: string;
  tokenValue?(value: unknown): T;
};

export class ParserError extends Error {
  prev: ParserValue | undefined;

  constructor(message: string, prev: ParserValue | undefined) {
    super(message);
    this.prev = prev;
  }
}
