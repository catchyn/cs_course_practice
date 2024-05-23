function indexedWrapper<T extends Map<K, V> | Set<V>, K = unknown, V = unknown>(
  data: T,
): T & { [key: number]: V } {
  let index = 0;
  const result = data;
  for (const value of data.values()) {
    result[index] = value;
    index++;
  }
  return result as T & { [key: number]: V };
}

export { indexedWrapper };
