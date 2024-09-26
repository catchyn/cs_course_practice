export const format = <T>(template: string, obj: T): string => {
  return template.replace(/\$\{([^}]+)}/g, (str, value) => {
    return obj[value] ?? '*placeholder*';
  });
};
