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
p.then(display).catch(displayNum)

function display (value) {
  console.log(value)
  return value
}

function displayNum (value) {
  console.log('Caught ', value)
  return value
}
