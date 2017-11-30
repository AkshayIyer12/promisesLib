let MyPromise = require('../lib/myPromiseMethods')

MyPromise.reject('fail').then(function (result) {
  // not called
  console.log('Im should not be here')
}, function (error) {
  console.log(error) // Stacktrace
})
