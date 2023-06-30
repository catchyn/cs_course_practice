enum SyncPromiseState {
  'fulfilled' = 'fulfilled',
  'pending' = 'pending',
  'rejected' = 'rejected',
}

export class SyncPromise<T> {
  state: SyncPromiseState = SyncPromiseState.pending;
  data: T | null = null;
  reason?: any;

  constructor(
    cb: (resolve: (value: T | SyncPromise<T>) => void, reject: (reason?: any) => void) => void,
  ) {
    try {
      cb(
        (result: T | SyncPromise<T>) => {
          if (result instanceof SyncPromise) {
            result.then((value: T) => {
              this.data = value;
              this.state = SyncPromiseState.fulfilled;
            });
          } else {
            this.data = result;
            this.state = SyncPromiseState.fulfilled;
          }
        },
        (reason) => {
          this.data = null;
          this.reason = reason;
          this.state = SyncPromiseState.rejected;
        },
      );
    } catch (e) {
      this.state = SyncPromiseState.rejected;
      this.reason = e;
    }
  }

  static resolve<T>(value: T | SyncPromise<T>) {
    return new SyncPromise((resolve) => resolve(value));
  }

  static reject<T>(reason?: any): SyncPromise<T> {
    return new SyncPromise(() => {
      throw new Error(reason || 'UnknownError');
    });
  }

  then<R>(cb: (value: T) => R): SyncPromise<R> {
    if (this.state === SyncPromiseState.fulfilled) {
      return new SyncPromise((resolve, reject) => {
        try {
          resolve(cb(this.data as T));
        } catch (e) {
          reject(e);
        }
      });
    }

    return SyncPromise.reject();
  }
}
