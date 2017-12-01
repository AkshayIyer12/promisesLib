# promisesLib
A basic implementation of JavaScript Promises.
Implemented with reference to:
1. [Promises/A+ Spec](https://promisesaplus.com/)
2. [Promise as a State Machine](https://www.promisejs.org/implementing/)
3. [q Designs](https://github.com/kriskowal/q/tree/master/design)
4. [Promise Core](https://github.com/then/promise/blob/master/src/core.js)
### How to require MyPromise?
```require('./lib/myPromise')```

### How to use the methods to core MyPromise?
```require('./lib/myPromiseMethods')```
Do keep in mind to `require` the core `MyPromise` as well.

### How to create a MyPromise?
```new MyPromise(function (resolve, reject) {})```

### What in-built functions does it have?
* then()
* catch()

### What all methods are available?
* MyPromise.all()
* MyPromise.resolve()
* MyPromise.reject()
 
### Does it support chaining?
Yes, it supports chaining.

### Do you have examples for the above implementation of Promise?
[MyPromise Examples](https://github.com/AkshayIyer12/promisesLib/tree/master/examples)

### Found a bug!
Issue Format:```
Issue: Give a one line description of the issue.
Description: Exlain the issue over here, try to keep it to the point.
Sample Code: Source Code link in which you found the issue.
```
File an issue at [Issues](https://github.com/AkshayIyer12/promisesLib/issues/new)

### Want to contribute
Send a PR at [PR](https://github.com/AkshayIyer12/promisesLib/pulls)