// class MyPromise {
//   constructor (executor) {
//     this.func = executor
//   }
//   resolve (a) {
//     return a
//   }
//   reject (err) {
//     throw Error(err)
//   }
//   then (b) {
//     if (this.func(this.resolve)) {
//       return b(20)
//     }
//     return b(100)
//   }
// }

let MyPromise = function (executor) {
  this.__func = executor
}
MyPromise.of = function (x) {
  return new MyPromise(x)
}
MyPromise.prototype.resolve = function (a) {
  return a
}
MyPromise.prototype.reject = function (err) {
  return Error(err)
}
MyPromise.prototype.then = function (vfunc) {
  return this.__func(this.__proto__.resolve(vfunc(20)))
}
MyPromise.prototype.catch = function (vfunc) {
  return this.__func(this.__proto__.reject(vfunc('Error')))
}
console.log(MyPromise.of((resolve, reject) => {
  let timeString = Date.now()
  setTimeout(() => {
    console.log(resolve, reject)
    return resolve(timeString)
  }, 2000)
}).then(display))
//.catch(display))

function display (value) {
  return value
}
