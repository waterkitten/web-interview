Promise 标准解读
记住两点

(1) 一个 promise 的当前状态只能是 pending、fulfilled 和 rejected 三种之一。状态改变只能是 pending 到 fulfilled 或者 pending 到 rejected。状态改变不可逆。
(2) promise 的 then 方法接收两个可选参数，表示该 promise 状态改变时的回调(promise.then(onFulfilled, onRejected))。then 方法返回一个 promise，then 方法可以被同一个 promise 调用多次。
Promise/A+并未规范 race、all、catch 方法，这些是 ES6 自己规范的。

下面来重点讲讲 Promise 原理
promise 采用了观察者模式，用特定方式 注册 对应 状态 的事件处理函数！！！
雏型：

function Promise(fn) {
var value = null,
callbacks = []; //callbacks 为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
    };

    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }

    fn(resolve);

}
1、实现链式调用 then
原理：递归

/\*\*

- 处理 promise 递归的函数
-
- promiseRef {Promise} promise 实例
- result {\*} promise 回调函数处理的结果
- resolve {function} 成功回调
- reject {function} 失败回调
  \*/
  function handlePromise(promiseRef, result, resolve, reject) {
  if(promiseRef === result) { // promise resolve（）中的参数如果是本身就无限循环了
  return reject(new TypeError("circle refrence"))
  }
  // 递归条件
  if(result !== null &&(typeof result === "object" || typeof result === "function")) {
  let called; // promise 状态只能更改一次
  try {
  let then = result.then;
  if(typeof then === "function") { // result 是 promise 对象
  then.call(result, param => {
  if(called) return
  called = true;
  handlePromise(promiseRef, param, resolve, reject) // 递归解析 promise
  }, err => {
  if(called) return;
  called = true;
  reject(err);
  })
  } else { // reuslt 只是普通 js 对象
  resolve(result)
  }

          }catch(e) {
              if(called) return;
              called = true;
              reject(e);
          }

      } else { // 基本类型
          resolve(result)
      }

  }
  将 then 方法放到 Promise 内的 callbacks 数组 中(有可能有多个 then)，当 resolve 之后去 forEach 循环执行

catch
相当于 this.then(null,onRejected)

race
赛跑
一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

var promise1 = new Promise(function(resolve, reject) {
setTimeout(resolve, 500, 'one');
});

var promise2 = new Promise(function(resolve, reject) {
setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then(function(value) {
console.log(value);
// Both resolve, but promise2 is faster
}); // 打印 "two"
