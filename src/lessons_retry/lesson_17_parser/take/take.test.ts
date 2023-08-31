import { take } from './take';
import { NamedParserValue } from '../parser';

describe('Test Take function', () => {
  it('should parse numbers', function () {
    const takeNumber = take(/\d/)('1234 foo');
    const token = takeNumber.next().value[0];
    expect(token).toEqual({ type: 'TAKE', value: '1234' });
  });
  it('should use max limit', function () {
    const takeNumber = take(/\d/, { max: 2 })('1234 foo');
    const token = takeNumber.next().value[0];
    expect(token).toEqual({ type: 'TAKE', value: '12' });
  });
  it('should use no contain regexp', function () {
    const takeNumber = take(/\d/)('foo');
    expect(() => takeNumber.next().value[0]).toThrowError(
      new Error('Parser error. Take. Symbol f not equal template. Number symbols less than MIN.'),
    );
  });
  it('should max if max > string length but no data more', function () {
    const takeNumber = take(/\d/, { min: 5 })('123');
    expect(takeNumber.next().value['value']).toBe(NamedParserValue.EXPECT_NEW_DATA);
    expect(() => takeNumber.next().value).toThrowError(new Error('Parse error. Tag. Empty data.'));
  });
  it('should max if max > string length and add new data', function () {
    const takeNumber = take(/\d/, { min: 5, token: 'NUMBERS' })('123');
    expect(takeNumber.next().value['value']).toBe(NamedParserValue.EXPECT_NEW_DATA);
    expect(takeNumber.next('45').value).toEqual({ type: 'NUMBERS', value: '12345' });
  });
  it('should every symbol if min=0', function () {
    const takeNumber = take(/\d/, { min: 0 })('12345');
    const token = takeNumber.next().value[0];
    expect(token).toEqual({ type: 'TAKE', value: '12345' });
  });
});
