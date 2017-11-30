let MyPromise = require('../lib/myPromiseMethods')

let p = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    let timeString = Date.now()
    if (timeString % 2 === 0) {
      resolve(timeString)
    } else {
      reject(timeString)
    }
  }, 3000)
})
p.then(display)
.then(display)
.then(display)
.then(display)
.catch(displayNum)

function display (value) {
  console.log('I am even', value)
  return value + 1
}

function displayNum (value) {
  console.log('I am odd', value)
  return value
}
