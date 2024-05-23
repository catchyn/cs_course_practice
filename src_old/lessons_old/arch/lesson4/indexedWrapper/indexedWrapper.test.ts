import { indexedWrapper } from './indexedWrapper';

describe('Test indexed wrapper function', () => {
  it('should correctly work for happy path', () => {
    const indexedMap = indexedWrapper<Map<string, string>>(
      new Map([
        ['key1', 'foo'],
        ['key2', 'bar'],
      ]),
    );

    // true
    expect(indexedMap.get('key1') === indexedMap[0]).toBe(true);
    expect(indexedMap.get('key2') === indexedMap[1]).toBe(true);
    expect(indexedMap.get('key3') === indexedMap[1]).toBe(false);
  });
});
