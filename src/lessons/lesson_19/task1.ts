import { Result } from '../../common/Result';

function exec(executor: () => Generator<Result, void, unknown>) {
  const executorGenerator = executor();
  const chunk = executorGenerator.next();

  function evaluate(chunk: IteratorResult<Result>) {
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
const res1 = new Result(() => 42);
res1.then((data) => {
  console.log(data);
});

// 2
const res2 = new Result(() => {
  throw 'Boom!';
});
res2
  .then((data) => {
    // Этот callback не вызовется
    console.log(data);
    // А этот вызовется
  })
  .catch(console.error);

// 3
const res3 = new Result(() => 55);
res3
  .then((data) => {
    if (typeof data === 'number') {
      return data ** 2;
    }
    return data;
  })
  .then((data) => {
    console.log('Result = ' + data);
  });

// 4
exec(function* main() {
  const res1 = new Result(() => 42);
  console.log(yield res1);
  try {
    const res2 = new Result(() => {
      throw 'Boom!';
    });
    yield res2;
  } catch (err) {
    console.error(err);
  }
});
