import { extend } from './extend';

describe('Test function extend', () => {
  it('should work correct', () => {
    // Define the Foo class
    class Foo {
      get42() {
        return 42;
      }
    }

    // Define the Bar class by extending Foo
    class Bar extends Foo {}

    // Use the extend function to add methods to Bar class
    extend(Bar, {
      get overloaded42() {
        return this.get42();
      },

      get42() {
        return super.get42() * 10;
      },
    });

    // Test the classes
    const bar = new Bar();

    expect(bar.overloaded42).toBe(420); // Output: 420
    expect(bar.get42()).toBe(420); // Output: 420
  });
});
