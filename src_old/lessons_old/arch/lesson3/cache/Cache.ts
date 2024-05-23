type AbstractCache<K, V> = {
  // получение элемента из кэша
  get(key: K): V | null;
  // помещение в кэш
  put(key: K, value: V): void;
};

export { AbstractCache };

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
const user: PartialUser = {
  id: 1,
  email: '123',
};
