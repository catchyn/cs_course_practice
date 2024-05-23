import { readonly } from './readonly';

describe('Test readonly function', () => {
  it('should work correctly', () => {
    const obj = {
      a: 1,
      b: [1, 2, 3],
      mutate() {
        this.a++;
      },
    };

    const readonlyObj = readonly(obj);

    readonlyObj.a++;

    /// true
    expect(readonlyObj.a === 1).toBe(true);

    readonlyObj.mutate();

    /// true
    expect(readonlyObj.a === 1).toBe(true);

    readonlyObj.b.push(10);

    // [1, 2, 3]
    expect(readonlyObj.b).toEqual([1, 2, 3]);

    obj.a++;

    /// true
    expect(readonlyObj.a === 2).toBe(true);
  });
});
