export const calc = (str: string): string => {
  const regExp = /([-(]+)?\d[\d +\-*/()]*/g;
  return str.replace(regExp, (str) => {
    return Function(`return ${str}`)();
  });
};
