newFunction() // [Error: bar]

function newFunction () {
  let MyPromise = require('../lib/myPromiseMethods')
  const wait = time => new MyPromise((resolve, reject) => setTimeout(() => resolve(), time))
  wait(200)
    .then(() => new MyPromise((resolve, reject) => resolve('foo')))
    .then(a => a)
    .then(b => console.log(b))
    .then(() => null)
    .then(c => console.log(c))
    .then(() => { throw new Error('foo') })
    .then(
    d => console.log(`d: ${d}`),
    e => console.log('Error e here: ', e))
    .then(f => console.log(`f: ${f}`))
    .catch(e => console.log(e))
    .then(() => { throw new Error('bar') })
    .then(g => console.log(`g: ${g}`))
    .catch(h => console.log('Error h here:', h))
}
