function random(start: number, end: number): Iterator<number> {
  return {
    next() {
      const value = Math.round(start + Math.random() * (end - start));
      return {
        value,
        done: false,
      };
    },
  };
}

export { random };
