export interface DataProvider {
  get<T>(query): Promise<T>;
  delete<T>(query): Promise<T>;
  post<T>(query): Promise<T>;
  put<T>(query): Promise<T>;
}
