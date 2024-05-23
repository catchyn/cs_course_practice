import { bisecLeft, bisecRight } from '../../../../common/bisec';

describe('Task 1.', () => {
  it('Default test.', () => {
    expect(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)).toBe(6);
    expect(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)).toBe(9);
  });

  it("Array doesn't contain element", () => {
    expect(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 10)).toBe(-1);
    expect(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el + 4)).toBe(-1);
  });
});
