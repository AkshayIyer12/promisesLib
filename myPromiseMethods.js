let MyPromise = require('./myPromise')

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value
  }
  if (typeof value === 'object' || typeof value === 'function') {
    try {
      let then = value.then
      if (typeof then === 'function') {
        return new MyPromise(then.bind(value))
      }
    } catch (ex) {
      return new MyPromise(function (resolve, reject) {
        reject(ex)
      })
    }
  }
  return new Promise(function (resolve, reject) {
    resolve(value)
  })
}

module.exports = MyPromise.resolve
