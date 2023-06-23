import { getErrorMsg } from '../utils/error';

enum ResultState {
  'OK' = 'OK',
  'ERR' = 'ERR',
}

export class Result {
  result: unknown;
  state: ResultState;
  errMessage?: string;

  constructor(func: () => unknown) {
    try {
      this.state = ResultState.OK;
      this.result = func();
    } catch (e) {
      this.state = ResultState.ERR;
      this.errMessage = getErrorMsg(e as string | Error);
    }
  }

  static Error(errMessage: string): Result {
    return new Result(() => {
      throw new Error(errMessage);
    });
  }

  flatMap(func: (value: unknown) => Result) {
    return new Result(() => {
      let result;
      func(this.result)
        .then((value) => {
          result = value;
        })
        .catch((message) => {
          result = message;
        });
      return result;
    });
  }

  then(f: (data: unknown) => unknown) {
    if (this.state === ResultState.OK) {
      try {
        this.result = f(this.result);
      } catch (e) {
        this.state = ResultState.ERR;
        this.errMessage = getErrorMsg(e as string | Error);
      }
    }
    return this;
  }

  catch(errF: (error?: string) => void) {
    if (this.state === ResultState.ERR) {
      errF(this.errMessage);
    }
  }
}
