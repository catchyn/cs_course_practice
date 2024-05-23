import { random } from './random';

describe('test random', () => {
  it('simple test', () => {
    const randomInt = random(0, 100);
    for (let i = 0; i < 15; i++) {
      const value = randomInt.next().value;
      expect(value).toBeLessThanOrEqual(100);
      expect(value).toBeGreaterThanOrEqual(0);
    }
  });
});
