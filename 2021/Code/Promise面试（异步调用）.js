// promise 的特点
// 状态: pending => resolved / rejected, 单向单次转换, 一旦改变就不会再改变
// promise.prototype.then 返回的是一个 promise 对象, 状态由回调函数的返回值决定
// 返回值: 由对应状态的处理函数(resolve, reject函数)返回, 这个值会传递给 then

// then 方法里面的两个参数也是函数, 两个函数的返回值都有如下两种情况:
// 1. 处理函数的返回值是非 promise 对象(普通数据), then 方法返回一个状态为 resolved 的 promise 对象
// 2. 处理函数返回值是 promise 对象, then 方法返回的 promise 对象的状态由处理函数的状态决定
class myPromise {
  constructor(fn) {
    // new Promise 对象的参数一定是一个函数, 这个函数的两个参数也是两个函数.
    if (typeof fn !== 'function') {
      throw TypeError(`Promise resolver ${fn} is not a function`);
    } else { // 如果是函数, 则进入正常的 Promise 代码执行.
      //  若传递参数是函数, 那么它会执行, 但是两个参数函数是 promise 的状态处理函数
      //  在原生的 Promise 对象中, resolve reject, 是内部定义好的. 我们也需要在内部定义
      let resolve = data => {
        setTimeout(() => {
          if (this.status === 'pending') { // 如果状态是 pending, 才允许改变
            this.status = 'resolved';
            this.data = data;
            if (this.resolveCB.length > 0) {
              this.resolveCB.forEach(fn => fn());
            }
          }
        }, 0);
      };
      let reject = error => {
        // 状态改变, 若是执行 reject 函数, 状态改变为 rejected, 数据存储
        setTimeout(() => {
          if (this.status === 'pending') { // 如果状态是 pending, 才允许改变
            this.status = 'rejected';
            this.data = error;
            if (this.rejectCB.length > 0) {
              this.rejectCB.forEach(fn => fn());
            }
          }
        }, 0);
      };
      // 状态改变, 若是执行 resolve 函数, 状态改变为 resolved, 数据存储
      this.status = 'pending'; //  promise 一开始的默认状态是 pending
      this.data = undefined; //  数据是undefined

      // 这两个属性是两个函数, 用来存储 then 方法中第三种情况, 来不及做的要做的事情
      this.resolveCB = [];
      this.rejectCB = [];
      fn(resolve, reject);
    }
  }
  // myPromise 原型上的方法 then
  // 参数是两个函数, 第一个用来处理 resolved 状态, 第二个处理 reject 状态
  then(onResolve, onReject) {
    // 无论怎样, then 的返回值都是一个 promise 对象
    // 所以, 无论那种情况, 都需要 return 一个 promise 对象
    if (this.status === 'resolved') {
      return new myPromise((resolve, reject) => {
        // 根据 onResolved 函数的执行结果, 决定 promise 对象的状态, 需要判断结果的类型
        // 我们使用 res 保存一下
        let res = onResolve(this.data); // this.data 就是 promise 中 resolve 或者 reject 保存的数据

        //  如果 res 是 promise 对象
        if (res instanceof myPromise) {
          // 如果 res 是一个 promise 对象, 那么一定要去触发 then 方法.
          res.then(resolve, reject);
        } else { // 如果不是 promise 对象, 让 promise 的状态变成 resolved 即可
          resolve(res);
        }
      })
    } else if (this.status === 'rejected') {
      return new myPromise((resolve, reject) => {
        let res = onReject(this.data);

        //  如果 res 是 promise 对象
        if (res instanceof myPromise) {
          res.then(resolve, reject);
        } else { // 如果不是 promise 对象
          resolve(res); // 返回状态为 resolved 的 promise 对象
        }
      })
    } else if (this.status === 'pending') {
      // 上面两个 if 分别处理了 resolved 和 rejected 状态
      // 但是当 promise 内部是一个延时定时器的时候, 代码执行到这里, 定时器的时间还没有到达, 代码没有执行
      // 状态就一直是 pending, 因为 js 引擎不会等. 但是最终那个数据还是接收到了
      // 错过了就是错过了

      // 定时器不知道什么时候结束, 状态改变之后, 又不会触发这件事了
      // 我们需要把这个要做的事情存储起来, 等状态改变之后, 再去判断要走 resolved 还是 rejected
      return new myPromise((resolve, reject) => {
        // 因为处理状态需要用到数据, 就需要传递参数
        // 所以不可能写成 this.resolveCB = 函数名 的形式, 需要用到闭包
        /*--------------------------闭包---------------------------*/
        this.resolveCB.push((resolveFn => {
          return () => {
            let res = resolveFn && resolveFn(this.data);
            if (res instanceof myPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          };
        })(onResolve));
        /*--------------------------闭包---------------------------*/
        this.rejectCB.push((rejectFn => {
          return () => {
            let res = rejectFn && rejectFn(this.data);
            if (res instanceof myPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          };
        })(onReject));
        /*---------------------------------------------------------*/
      });
    }
  }
}