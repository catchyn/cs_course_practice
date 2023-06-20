import { Parser, ParserState, ParserToken } from '../../types/Parser';
import { createIterableIterator } from '../../utils/parser';

export function seq(...parsers: Parser<string, string>[]) {
  return function* (data: Iterable<string>) {
    let iter = createIterableIterator(data);
    const value: ParserToken[] = [];
    let chunkValue;

    for (const parser of parsers) {
      const parserGen = parser(iter);

      while (true) {
        const chunk = parserGen.next(chunkValue);

        if (chunk.done) {
          value.push(chunk.value[0]);
          iter = createIterableIterator(chunk.value[1]);
          break;
        } else {
          if (chunk.value === ParserState.EXPECT_NEW_INPUT) {
            chunkValue = yield chunk.value;
          } else {
            yield chunk.value;
          }
        }
      }
    }

    return [{ type: 'SEQ', value: value?.reduce((acc, item) => acc + item.value, '') }, iter];
  };
}
