import { DataProvider } from './DataProvider';
import { FetchRequestStrategy } from './requestStrategy/FetchRequestStrategy';

export type ProviderOptions = { contentType: 'json'; requestType: 'json' };

abstract class Provider implements DataProvider {
  protected constructor(
    protected options: ProviderOptions,
    protected requestStrategy: FetchRequestStrategy = new FetchRequestStrategy(
      options?.requestType ?? 'json',
    ),
  ) {}

  protected request(options: ProviderOptions) {
    this.requestStrategy();
  }

  delete<T>(query): Promise<T> {
    return Promise.resolve(undefined);
  }

  get<T>(query): Promise<T> {
    return Promise.resolve(undefined);
  }

  post<T>(query): Promise<T> {
    return Promise.resolve(undefined);
  }

  put<T>(query): Promise<T> {
    return Promise.resolve(undefined);
  }
}
