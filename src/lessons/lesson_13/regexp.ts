export const firstRegexp = /[\w$]/;

export const numberSplitRegexp = {
  [Symbol.split](str: string) {
    return str.split(/,\d+,\d+;/).slice(0, -1);
  },
};

export const matchAllRegexp = /"([^"]+)": ([^,}]+)/g;
