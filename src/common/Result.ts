import { getErrorMsg } from '../utils/error';

enum ResultState {
  'OK' = 'OK',
  'ERR' = 'ERR',
}

export class Result<T> {
  data: T | null = null;
  state: ResultState | undefined;
  errMessage?: string;

  static Resolve<R>(value: Result<R> | R): Result<R> {
    return new Result(() => value);
  }

  static Error(errMessage?: string): Result<void> {
    return new Result(() => {
      throw new Error(errMessage || 'UnknownError');
    });
  }

  constructor(fn: () => T | Result<T>) {
    try {
      const data = fn();

      if (data instanceof Result) {
        data
          .then((value) => {
            this.state = ResultState.OK;
            this.data = value;
          })
          .catch((e) => {
            this.state = ResultState.ERR;
            this.errMessage = getErrorMsg(e as string | Error);
          });
      } else {
        this.state = ResultState.OK;
        this.data = data;
      }
    } catch (e) {
      this.state = ResultState.ERR;
      this.errMessage = getErrorMsg(e as string | Error);
    }
  }

  flatMap<R>(fn: (value: T) => Result<R>): Result<R | void> {
    try {
      return Result.Resolve(fn(this.data as T));
    } catch (e) {
      return Result.Error(getErrorMsg(e as string | Error));
    }
  }

  map<R>(fn: (value: T) => R): Result<R | void> {
    try {
      return Result.Resolve(fn(this.data as T));
    } catch (e) {
      return Result.Error(getErrorMsg(e as string | Error));
    }
  }

  then<R>(fn: (data: T) => R | Result<R>): Result<R | void> {
    if (this.state === ResultState.OK) {
      return new Result(() => fn(this.data as T));
    }

    return Result.Error(this.errMessage);
  }

  catch<R>(fn: (error?: string) => Result<R> | R): Result<T | R> {
    if (this.state === ResultState.ERR) {
      return new Result(() => fn(this.errMessage));
    }
    return Result.Resolve(this);
  }
}
