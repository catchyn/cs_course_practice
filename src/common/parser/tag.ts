import { Parser, ParserState } from '../../types/Parser';
import { createIterableIterator } from '../../utils/parser';

export function tag(template: Iterable<string>): Parser<string, string> {
  return function* (data: Iterable<string>) {
    let iter = createIterableIterator(data);
    let value = '';
    for (const char of template) {
      let chunk = iter.next();
      if (chunk.done) {
        const newData = yield ParserState.EXPECT_NEW_INPUT;
        if (!newData) {
          throw new Error('incorrect data');
        }
        data = newData;
        iter = createIterableIterator(data);
        chunk = iter.next();
      }

      if (char != chunk.value) {
        throw new Error("incorrect data. Bad symbol - '" + chunk.value + "'");
      }

      value += char;
    }
    return [{ type: 'TAG', value }, iter];
  };
}
