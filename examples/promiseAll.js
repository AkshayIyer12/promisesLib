let MyPromise = require('../lib/myPromiseMethods')

let p1 = MyPromise.resolve(3)
let p2 = 1337
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

MyPromise.all([p1, p2, p3])
.then(values => {
  console.log(values)
})

MyPromise.all([]).then(function (array) {
  console.log('This should be []:', array)
})

function soon (val) {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      resolve(val)
    },
      Math.random() * 500)
  })
}
MyPromise.all([soon(1), soon(2), soon(3)]).then(function (array) {
  console.log('This should be [1, 2, 3]:', array)
})

let p4 = MyPromise.all([1, 2, 3])
let p5 = MyPromise.all([1, 2, 3, MyPromise.resolve(444)])
let p6 = MyPromise.all([1, 2, 3, MyPromise.reject(555)])

setTimeout(function () {
  p4.then(values => {
    console.log(values)
    return values
  })
  p5.then(values => {
    console.log(values)
    return values
  })
  p6.then(values => {
    console.log(values)
    return values
  }).catch(error => {
    console.log('Error ', error)
    return error
  })
}, 100)
