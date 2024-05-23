function readonly<T extends object>(obj: T): T {
  return withProxy<T>(obj);
}

function withProxy<T extends object>(obj, initialValue?: T): T {
  const newObj = initialValue ?? {};
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop) && typeof obj[prop] === 'object' && obj[prop] !== null) {
      if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
        newObj[prop] = withProxy(obj[prop]);
      } else if (Object.prototype.toString.call(obj[prop]) === '[object Array]') {
        newObj[prop] = withProxy(obj[prop], []);
      } else {
        newObj[prop] = withProxy(obj[prop]);
      }
    } else {
      newObj[prop] = obj[prop];
    }
  }

  return new Proxy(newObj as T, {
    set() {
      return false;
    },
    defineProperty(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean {
      return false;
    },
    deleteProperty(target: T, p: string | symbol): boolean {
      return false;
    },
    setPrototypeOf(target: T, v: object | null): boolean {
      return false;
    },
    getOwnPropertyDescriptor(target: T, p: string | symbol): PropertyDescriptor | undefined {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, p);

      if (!descriptor) {
        return;
      }
    },
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
  });
}

export { readonly };
