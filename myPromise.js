let pending = 0, fulfilled = 1, rejected = 2

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
    handlers.map(handle)
    handlers = null
  }

  function reject (error) {
    state = rejected
    value = error
    handlers.map(handle)
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
      typeof handler === 'function') {
        handler.onFulfilled(value)
      }
      if (state === rejected && 
      typeof handler === 'function') {
        handler.onRejected(value)
      }
    }
  }
  this.done = function (onFulfilled, onRejected) {
    process.nextTick(function () {
      handle({
        onFulfilled,
        onRejected
      })
    })
  }
  doResolve(fn, resolve, reject)
}

function getThen (result) {
  if (result && (typeof result === 'object' || typeof result === 'function')) {
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
