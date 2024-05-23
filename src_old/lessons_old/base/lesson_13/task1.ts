// 1.
export const myRegExp1 = /^[a-zA-Z0-9_$]*$/;
console.log(myRegExp1.test('привет')); // false

// 2. А что можно это сделать одной регуляркой? =)
export const myRegExp2 = /,\d+,\d+;/;
console.log(
  '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(myRegExp2).slice(0, -1),
); // ['762120', '763827', '750842', '749909', '755884']

// 3. ...
export const myRegExp3 = /"([^"]+)": ([^,}]+)/g;
console.log([...'{"a": 1, "b": "2"}'.matchAll(myRegExp3)].map((item) => item.slice(1, 4))); // [['"a": 1', 'a', '1'], ['"b": "2"', 'b', '"2"']]

// 4.
function format(template: string, data: { [key in string]: string | number }) {
  return template.replace(/\$\{([a-zA-Z0-9]*)}/g, (_, ...args) => String(data[args[0]]));
}
const res = format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 });
console.log(res);

// 5.
const calc = (string: string): string => {
  return string.replace(/[(|\d].*[)|\d]/gm, (str) => eval(str));
};

calc(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`) ==
  `
Какой-то текст 1
Еще какой-то текст 20
`;
