import { collapseStack } from '../collapseStack';

describe('Collapse stack', () => {
  test('collapse stack', () => {
    expect(
      collapseStack({
        a: {
          b: [1, 2],
          '': { c: 2 },
        },
      }),
    ).toEqual({
      'a..c': 2,
      'a.b.0': 1,
      'a.b.1': 2,
    });
  });
});
