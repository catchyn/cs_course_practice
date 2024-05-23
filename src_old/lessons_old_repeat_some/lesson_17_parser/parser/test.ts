type Test = string | RegExp | ((value: string) => boolean);

function testValue(test: Test, char: string): boolean {
  if (typeof test === 'string') {
    return test === char;
  }

  if (test instanceof Function) {
    return test(char);
  }

  return test.test(char);
}

export { Test, testValue };
