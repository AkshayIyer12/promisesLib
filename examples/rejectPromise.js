let MyPromise = require('../lib/myPromiseMethods')

MyPromise.reject('fail').then(function (error) {
  // not called
}, function (error) {
  console.log(error) // Stacktrace
})
