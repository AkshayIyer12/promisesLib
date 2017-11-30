let MyPromise = require('../lib/myPromiseMethods')

let p1 = MyPromise.resolve(3)
let p2 = MyPromise.resolve({
  then: function (onFulfill, onReject) {
    onFulfill('Hey! I am fulfilled now')
  }
})
let p3 = MyPromise.resolve(new MyPromise(function (resolve, reject) {
  reject('Show me some Error')
}))
let p4 = MyPromise.resolve(new MyPromise(function (resolve, reject) {
  resolve('Ahoy! Im here')
}))
p1.then(display)
p2.then(display)
p3.then(display).catch(function (err) {
  console.log(err)
})
p4.then(display).catch(function (err) {
  console.log(err)
})

function display (value) {
  console.log(value)
  return value
}
