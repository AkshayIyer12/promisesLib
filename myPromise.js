const pending = 0
const fulfilled = 1
const rejected = 2

function MyPromise (fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new')
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function')
  }
  let state = pending
  let value = null
  let handlers = []

  function fulfill (result) {
    state = fulfilled
    value = result
    handlers.forEach(handle)
    handlers = null
  }

  function reject (error) {
    state = rejected
    value = error
    handlers.forEach(handle)
    handlers = null
  }

  function resolve (result) {
    try {
      let then = getThen(result)
      if (then) {
        doResolve(then.bind(result), resolve, reject)
        return
      }
      fulfill(result)
    } catch (e) {
      reject(e)
    }
  }

  function handle (handler) {
    if (state === pending) {
      handlers.push(handler)
    } else {
      if (state === fulfilled &&
        typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value)
      }
      if (state === rejected &&
        typeof handler.onRejected === 'function') {
        handler.onRejected(value)
      }
    }
  }
  this.done = function (onFulfilled, onRejected) {
    process.nextTick(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      })
    })
  }

  this.then = function (onFulfilled, onRejected) {
    let self = this
    return new MyPromise(function (resolve, reject) {
      return self.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result))
          } catch (ex) {
            return reject(ex)
          }
        } else {
          resolve(result)
        }
      }, function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error))
          } catch (ex) {
            return reject(ex)
          }
        } else {
          return reject(error)
        }
      })
    })
  }

  this.catch = function (onRejected) {
    let self = this
    return self.then(undefined, onRejected)
  }
  this.all = function (arr) {
    let args = Array.from(arr)
    return new MyPromise(function (resolve, reject) {
      if (args.length === 0) {
        return resolve([])
      }
      let remaining = args.length
      console.log(remaining)
    })
  }
  doResolve(fn, resolve, reject)
}

function getThen (result) {
  if (result && (typeof result === 'object' ||
    typeof result === 'function')) {
    let then = result.then
    if (typeof then === 'function') {
      return then
    }
  }
  return null
}

function doResolve (fn, onFulfilled, onRejected) {
  let done = false
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}
module.exports = MyPromise
