import { Parser, ParserState } from '../../types/Parser';
import { createIterableIterator } from '../../utils/parser';

export const take = (
  regexp: RegExp,
  options: { max?: number; min?: number } = {},
): Parser<string, string> => {
  return function* (data: Iterable<string>) {
    const { min = 1, max = Infinity } = options;
    let iter = createIterableIterator(data);
    let value = '';
    let rest = '';
    let count = 0;

    while (true) {
      if (count >= max) {
        break;
      }
      let chunk = iter.next();
      let chunkValue = chunk.value;

      if (chunk.done) {
        if (count >= min) {
          break;
        }
        const newData = yield ParserState.EXPECT_NEW_INPUT;
        if (!newData) {
          throw new Error('incorrect data');
        }
        data = newData;
        iter = createIterableIterator(data);
        chunk = iter.next();
        chunkValue = chunk.value;
      }

      try {
        if (!regexp.test(chunkValue)) {
          throw new Error("incorrect data. Bad symbol - '" + chunkValue + "'");
        } else {
          count++;
        }
      } catch (e) {
        if (count < min) {
          throw e;
        }

        rest += chunkValue;
        break;
      }

      value += chunkValue;
    }

    let newIter = iter;
    if (rest) {
      const iterRest = createIterableIterator(rest);
      newIter = createIterableIterator({
        next: () => {
          const next = iterRest.next();
          if (!next.done) {
            return next;
          } else {
            return iter.next();
          }
        },
      });
    }

    return [{ type: 'TAKE', value: value }, newIter];
  };
};
