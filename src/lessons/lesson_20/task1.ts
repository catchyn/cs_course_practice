import { Result } from '../../common/Result';

const res = new Result(() => 42);
console.log('started');
res.flatMap(() => Result.Error('Boom')).catch(console.error);
// res
//   .flatMap((value) => new Result(() => value + 'Boom'))
//   .then((value) => console.log('result ' + value));

// res.then((value) => console.log('result ' + value));
