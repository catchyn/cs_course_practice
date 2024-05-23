import { Result } from '../../../common/Result';

function exec<T>(executor: () => Generator<Result<T>, void, unknown>) {
  const executorGenerator = executor();
  const chunk = executorGenerator.next();

  function evaluate(chunk: IteratorResult<Result<T>>) {
    if (!chunk.done) {
      chunk.value
        .then((value) => {
          evaluate(executorGenerator.next(value));
        })
        .catch((error) => {
          evaluate(executorGenerator.throw(error));
        });
    }
  }

  evaluate(chunk);
}

// 1
const res1 = new Result<number>(() => 42);
res1.then((data) => {
  console.log('1 1 ', data); // 42
});

// 2
const res2 = new Result(() => {
  throw 'Boom!';
});
res2
  .then((data) => {
    // Этот callback не вызовется
    console.log('2 1 ', data);
    // А этот вызовется
  })
  .catch(console.error);

// 3
const res3 = new Result(() => 55);
res3
  .then((data) => {
    return data ** 2;
  })
  .then((data) => {
    console.log('3 1 Result = ' + data);
  });

// 4
exec(function* main() {
  const res1 = new Result(() => 42);
  console.log('4 1 ', yield res1);
  try {
    const res2 = new Result(() => {
      throw 'Boom!';
    });
    yield res2;
  } catch (err) {
    console.error(err);
  }
});

// 5
console.log(Result.Resolve(32));
console.log(Result.Resolve(new Result(() => 'check Resolve')));
