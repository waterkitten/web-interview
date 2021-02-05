const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    // 有可能是promise, 如果是promise那就要有then方法
    let then = x.then;
    if (typeof then === 'function') { // 到了这里就只能认为他是promise了
      // 如果x是一个promise那么在new的时候executor就立即执行了，就会执行他的resolve
      //那么数据就会传递到他的then中
      then.call(x, y => { // 当前promise解析出来的结果可能还是一个promise,
        //直到解析到他是一个普通值
        resolvePromise(promise2, y, resolve, reject); // resolve, reject都是promise2的
      }, r => {
        reject(r);
      });
    } else {
      // 出现像这种结果 {a: 1, then: 1} 
      resolve(x);
    }
  } else {
    resolve(x);
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING; // 宏变量, 默认是等待态
    this.value = undefined; // then方法要访问到所以放到this上
    this.reason = undefined; // then方法要访问到所以放到this上
    // 专门存放成功的回调函数
    this.onResolvedCallbacks = [];
    // 专门存放成功的回调函数
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.status === PENDING) { // 保证只有状态是等待态的时候才能更改状态
        this.value = value;
        this.status = RESOLVED;
        // 需要让成功的方法一次执行
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        // 需要让失败的方法一次执行
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    // 执行executor 传入成功和失败:把内部的resolve和 reject传入executor中用户写的resolve, reject
    try {
      executor(resolve, reject); // 立即执行
    } catch (e) {
      console.log('catch错误', e);
      reject(e); //如果内部出错 直接将error 手动调用reject向下传递
    }
  }
  then(onfulfilled, onrejected) {
    // 为了实现链式调用，创建一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // 执行then中的方法 可能返回的是一个普通值，也可能是一个promise，如果是promise的话，需要让这个promise执行
        // 使用宏任务把代码放在一下次执行,这样就可以取到promise2,为什么要取到promise2? 这里在之后会介绍到
        setTimeout(() => {
          try {
            let x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) { // 一旦执行then方法报错就走到下一个then的失败方法中
            console.log(e);
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 处理异步的情况
      if (this.status === PENDING) {
        // 这时候executor肯定是有异步逻辑
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              // 注意这里传入的是promise2的resolve和reject
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

module.exports = Promise;