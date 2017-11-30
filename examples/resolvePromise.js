let MyPromise = require('../lib/myPromiseMethods')

let p1 = MyPromise.resolve(3)
let p2 = MyPromise.resolve({
  then: function (onFulfill, onReject) {
    onFulfill('fulfilled!')
  }
})
let p3 = MyPromise.resolve(new MyPromise(function (resolve, reject) {
  resolve(10)
}))

p1.then(display)
p2.then(display)
p3.then(display)

function display (value) {
  console.log(value)
  return value
}
