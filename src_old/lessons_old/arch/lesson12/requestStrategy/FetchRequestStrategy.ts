export class FetchRequestStrategy {
  constructor(protected type: 'arrayBuffer' | 'json' | 'text' | 'blob' | 'formData') {}

  request<T>(url: string | URL): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
