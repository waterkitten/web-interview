// const PENDING = 'PENDING'
// const RESOLVED = 'RESOLVED'
// const REJECTED = 'REJECTED'

// class Promise {
//   constructor(executor) {
//     this.status = PENDING // 宏变量, 默认是等待态
//     this.value = undefined // then方法要访问到所以放到this上
//     this.reason = undefined // then方法要访问到所以放到this上
//     this.onResolvedCallbacks = [] // 专门存放成功的回调函数
//     this.onRejectedCallbacks = [] // 专门存放成功的回调函数
//     let resolve = (value) => {
//       if (this.status === PENDING) {
//         // 保证只有状态是等待态的时候才能更改状态
//         this.value = value
//         this.status = RESOLVED
//         // 需要让成功的方法依次执行
//         this.onResolvedCallbacks.forEach((fn) => fn())
//       }
//     }
//     let reject = (reason) => {
//       if (this.status === PENDING) {
//         this.reason = reason
//         this.status = REJECTED
//         // 需要让失败的方法依次执行
//         this.onRejectedCallbacks.forEach((fn) => fn())
//       }
//     }
//     // 执行executor传入我们定义的成功和失败函数:把内部的resolve和reject传入executor中用户写的resolve, reject
//     try {
//       executor(reject, resolve)
//     } catch (e) {
//       console.log('catch错误', e)
//       reject(e) //如果内部出错 直接将error手动调用reject向下传递
//     }
//   }
//   then(onfulfilled, onrejected) {
//     if (this.status === RESOLVED) {
//       onfulfilled(this.value)
//     }
//     if (this.status === REJECTED) {
//       onrejected(this.reason)
//     }
//     // 处理异步的情况
//     if (this.status === PENDING) {
//       // this.onResolvedCallbacks.push(onfulfilled); 这种写法可以换成下面的写法，多包了一层，这叫面向切片编程，可以加上自己的逻辑
//       this.onResolvedCallbacks.push(() => {
//         // TODO ... 自己的逻辑
//         onfulfilled(this.value)
//       })
//       this.onRejectedCallbacks.push(() => {
//         // TODO ... 自己的逻辑
//         onrejected(this.reason)
//       })
//     }
//   }
// }

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('xxx')
//   }, 1000)
// })
// // 发布订阅模式应对异步 支持一个promise可以then多次
// promise.then(
//   (res) => {
//     console.log('成功的结果1', res)
//   },
//   (error) => {
//     console.log(error)
//   }
// )

// promise
//   .then(
//     (res) => {
//       console.log('成功的结果2', res)
//     },
//     (error) => {
//       console.log(error)
//     }
//   )

// console.log(promise)
// console.log(55)

// let a = new Promise((resolve, reject) => {
//   resolve()
//   reject()
// })
// a.then((res) => console.log(res))
// fn就是(resolve, reject) => {}的函数部分
function promise(fn) {
  // 定义值/错误/状态
  this.value = undefined
  this.err = undefined
  this.status = 'pending'
  let t = this
  function resolve(val) {
    if (t.status == 'pending') {
      t.value = val
      t.status = 'success'
    }
  }
  function reject(err) {
    if (t.status == 'pending') {
      t.err = err
      t.status = 'fail'
    }
  }
  fn(resolve, reject)
}
// 方法要用prototype
promise.prototype.then = function (isSuccess, isFail) {
  // var t = this
  return new Promise((resolve, reject) => {
    // 用setTimeout模拟实现then方法的异步操作
    setTimeout(() => {
      if (this.status == 'success') {
        resolve(isSuccess(this.value))
      }
      if (this.status == 'fail') {
        reject(isFail(this.err))
      }
    })
  })
}
//测试
var p = new promise(function (resolve, reject) {
  if (1) {
    resolve('test resolve success')
  } else {
    reject('test rejecr fail')
  }
})
p.then(function (val) {
  console.log(val)
  return val + '链式调用return'
}).then(function (val) {
  console.log(val)
})
