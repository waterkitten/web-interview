Promise 是 ES6 中对回调的处理方案，用于处理回调过多，形成回调地狱，不直观的问题；
Promise 可以链式调用，代码直观易操作,并且有 Promise.all, Promise.race 等语法糖便于操作

用同步的编码方式来处理异步代码
解决旧时代用回调函数来解决异步的问题，一定程度避免了回调地狱

一、Pomise.all 的使用
Promise.all 可以将多个 Promise 实例包装成一个新的 Promise 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被 reject 失败状态的值。

具体代码如下：

let p1 = new Promise((resolve, reject) => {
resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
resolve('success')
})

let p3 = Promse.reject('失败')

Promise.all([p1, p2]).then((result) => {
console.log(result) //['成功了', 'success']
}).catch((error) => {
console.log(error)
})

Promise.all([p1,p3,p2]).then((result) => {
console.log(result)
}).catch((error) => {
console.log(error) // 失败了，打出 '失败'
})
Promse.all 在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个 ajax 的数据回来以后才正常显示，在此之前只显示 loading 图标。

代码模拟：

let wake = (time) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve(`${time / 1000}秒后醒来`)
}, time)
})
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
console.log(result) // [ '3 秒后醒来', '2 秒后醒来' ]
}).catch((error) => {
console.log(error)
})
需要特别注意的是，Promise.all 获得的成功结果的数组里面的数据顺序和 Promise.all 接收到的数组顺序是一致的，即 p1 的结果在前，即便 p1 的结果获取的比 p2 要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用 Promise.all 毫无疑问可以解决这个问题。

二、Promise.race 的使用
顾名思义，Promse.race 就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

let p1 = new Promise((resolve, reject) => {
setTimeout(() => {
resolve('success')
},1000)
})

let p2 = new Promise((resolve, reject) => {
setTimeout(() => {
reject('failed')
}, 500)
})

Promise.race([p1, p2]).then((result) => {
console.log(result)
}).catch((error) => {
console.log(error) // 打开的是 'failed'
})
原理是挺简单的，但是在实际运用中还没有想到什么的使用场景会使用到。

作者：李悦之
链接：https://www.jianshu.com/p/7e60fc1be1b2
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
