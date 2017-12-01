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
  return new MyPromise(function (resolve, reject) {
    resolve(value)
  })
}

MyPromise.reject = function (value) {
  return new MyPromise(function (resolve, reject) {
    reject(value)
  })
}

MyPromise.all = function (arr) {
  let promises = Array.from(arr)
  return new MyPromise(function (resolve, reject) {
    if (promises.length === 0) {
      resolve(promises)
    }
    let collector = []
    let pending = promises.length
    for (let i = 0; i < promises.length; i++) {
      if (typeof promises[i] !== 'object') {
        promises[i] = new MyPromise(function (resolve, reject) {
          resolve(promises[i])
        })
      }
      promises[i].then(function (result) {
        collector.push(result)
        pending -= 1
        if (pending === 0) {
          resolve(collector)
        }
      }, function (error) {
        reject(error)
      })
    }
  })
}

module.exports = MyPromise
