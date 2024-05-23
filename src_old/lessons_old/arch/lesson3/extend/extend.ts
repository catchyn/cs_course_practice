// Define the extend function
function extend<T>(Class: { new (): T }, extension) {
  const obj = {
    __proto__: Class.prototype,
  };
  for (const prop in extension) {
    if (Object.hasOwn(extension, prop)) {
      obj[prop] = prop;
    }
  }
  Object.defineProperties(obj, Object.getOwnPropertyDescriptors(extension));
  Class.prototype = obj;
}

export { extend };
