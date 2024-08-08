export const collapse = (obj: any, keyStr = '', result = {}): any => {
  if (Object.prototype.toString.call(obj) === '[object Object]' && obj !== null) {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        collapse(obj[key], keyStr + (keyStr ? `.` : '') + key, result);
      }
    }
  } else if (Object.prototype.toString.call(obj) === '[object Array]' && obj !== null) {
    for (let i = 0; i < obj.length; i++) {
      collapse(obj[i], keyStr + (keyStr ? `.` : '') + i, result);
    }
  } else {
    result[keyStr] = obj;
  }
  return result;
};
