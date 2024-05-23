import { tag } from './tag';
import { NamedParserValue, ParserToken } from '../parser';

describe('Test tag function', () => {
  it('should tag simple', function () {
    const fnTag = tag('function')('function foo() {}');
    expect(fnTag.next().value[0]).toEqual({ type: 'TAG', value: 'function' });
  });
  it('should produce yield named token', function () {
    const fnTag = tag('function', { token: 'WORD' })('function foo() {}');
    expect(fnTag.next().value).toEqual({ type: 'WORD', value: 'function' });
  });
  it('should work with data flow', function () {
    const fnTag = tag('function', { token: 'WORD' })('func');
    expect((fnTag.next().value as ParserToken<string>).value).toBe(
      NamedParserValue.EXPECT_NEW_DATA,
    );
    expect(fnTag.next('tion').value).toEqual({ type: 'WORD', value: 'function' });
  });
});
