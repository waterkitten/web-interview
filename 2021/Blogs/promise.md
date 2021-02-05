# 使用

## ![img](https://www.freecodecamp.org/news/content/images/2020/06/Ekran-Resmi-2020-06-06-12.21.27.png)

## 场景一：回调地狱

```javascript
firstRequest(function(response) {  
    secondRequest(response, function(nextResponse) {    
        thirdRequest(nextResponse, function(finalResponse) {     
            console.log('Final response: ' + finalResponse);    
        }, failureCallback);  
    }, failureCallback);
}, failureCallback);
```

```javascript
firstRequest()
  .then(function(response) {
    return secondRequest(response);
}).then(function(nextResponse) {  
    return thirdRequest(nextResponse);
}).then(function(finalResponse) {  
    console.log('Final response: ' + finalResponse);
}).catch(failureCallback);
```

## 使用拆分

```javascript
const myPromise = new Promise((resolve, reject) => {  
    let condition;  
    
    if(condition is met) {    
        resolve('Promise is resolved successfully.');  
    } else {    
        reject('Promise is rejected');  
    }
});
myPromise.then((message) => {  
    console.log(message);
}).catch((message) => { 
    console.log(message);
});
```



# 手动实现（易理解版本）

    let a = new Promise((resolve, reject) => {
        resolve()
        reject()
    })
    a.then((res) => console.log(res))
    // fn就是(resolve, reject) => {}的函数部分
    function Promise (fn) {
        // 定义值/错误/状态
        this.value = undefined
        this.err = undefined
        this.status = 'pending'
        let t = this
        function resolve (val) {
            if (t.status == 'pending') {
                t.value = val
                t.status = 'success'
            }
        }
        function reject (err) {
            if (t.status == 'pending') {
                t.err = err
                t.status = 'fail'
            }
        }
        fn(resolve, reject)
    }
    // 方法要用prototype
    Promise.prototype.then = function(isSuccess, isFail) {
        // var t = this
        return new Promise((resolve,reject) => {
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
    var p = new promise(function(resolve, reject) {
        if (1) {
            resolve("test resolve success")
        } else {
            reject("test rejecr fail")
        }
    
    })
    p.then(function(val) {
        console.log(val)
        return val + "链式调用return"
    }).then(function(val) {
        console.log(val)
    })
# 手动实现（分步骤递增难度版本）

## 处理成功和失败回调

![image-20210126231720464](C:\Users\DLX02\AppData\Roaming\Typora\typora-user-images\image-20210126231720464.png)

```javascript
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
	constructor(executor) {
		this.status = PENDING; // 宏变量, 默认是等待态
		this.value = undefined; // then方法要访问到所以放到this上
		this.reason = undefined; // then方法要访问到所以放到this上
		let resolve = (value) => {
			if (this.status === PENDING) {// 保证只有状态是等待态的时候才能更改状态
				this.value = value;
				this.status = RESOLVED;
			}
		};
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED;
			}
		};
		// 执行executor传入我们定义的成功和失败函数:把内部的resolve和reject传入executor中用户写的resolve, reject
		try {
			executor(resolve, reject);
		} catch(e) {
			console.log('catch错误', e);
			reject(e); //如果内部出错 直接将error手动调用reject向下传递
		}
	}
	then(onfulfilled, onrejected) {
		if (this.status === RESOLVED) {
			onfulfilled(this.value);
		}
		if (this.status === REJECTED) {
			onrejected(this.reason);
		}
	}
}
module.exports = Promise;

```

## 处理异步(发布订阅者模式)

```javascript
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class Promise {
	constructor(executor) {
		this.status = PENDING; // 宏变量, 默认是等待态
		this.value = undefined; // then方法要访问到所以放到this上
		this.reason = undefined; // then方法要访问到所以放到this上
		this.onResolvedCallbacks = [];// 专门存放成功的回调函数
		this.onRejectedCallbacks = [];// 专门存放成功的回调函数
		let resolve = (value) => {
			if (this.status === PENDING) {// 保证只有状态是等待态的时候才能更改状态
				this.value = value;
				this.status = RESOLVED;
				// 需要让成功的方法依次执行
				this.onResolvedCallbacks.forEach(fn => fn());
			}
		};
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED;
				// 需要让失败的方法依次执行
				this.onRejectedCallbacks.forEach(fn => fn());
			}
		};
		// 执行executor传入我们定义的成功和失败函数:把内部的resolve和reject传入executor中用户写的resolve, reject
		try {
			executor(resolve, reject);
		} catch(e) {
			console.log('catch错误', e);
			reject(e); //如果内部出错 直接将error手动调用reject向下传递
		}
	}
	then(onfulfilled, onrejected) {
		if (this.status === RESOLVED) {
			onfulfilled(this.value);
		}
		if (this.status === REJECTED) {
			onrejected(this.reason);
		}
		// 处理异步的情况
		if (this.status === PENDING) {
			// this.onResolvedCallbacks.push(onfulfilled); 这种写法可以换成下面的写法，多包了一层，这叫面向切片编程，可以加上自己的逻辑
			this.onResolvedCallbacks.push(() => {
				// TODO ... 自己的逻辑
				onfulfilled(this.value);
			});
			this.onRejectedCallbacks.push(() => {
				// TODO ... 自己的逻辑
				onrejected(this.reason);
			});
		}
	}
}
module.exports = Promise;
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('xxx');
  }, 1000);
});
// 发布订阅模式应对异步 支持一个promise可以then多次
promise.then((res) => {
  console.log('成功的结果1', res);
}, (error) => {
  console.log(error);
});

promise.then((res) => {
  console.log('成功的结果2', res);
}, (error) => {
  console.log(error);
});
console.log(promise)
console.log(55)
```

## 让resolvePromise符合规范

上面曾问到resolvePromise第一个参数promise2到底有什么用？其实很简单就是为了符合promise a+ 规范。下面我们来完善resolvePromise

```
function resolvePromise(promise2, x, resolve, reject) {
	// 1)不能引用同一个对象 可能会造成死循环
	if (promise2 === x) {
		return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]----'));
	}
	let called;// promise的实现可能有多个，但都要遵循promise a+规范，我们自己写的这个promise用不上called,但是为了遵循规范才加上这个控制的，因为别人写的promise可能会有多次调用的情况。
	// 2)判断x的类型，如果x是对象或者函数，说明x有可能是一个promise，否则就不可能是promise
	if((typeof x === 'object' && x != null) || typeof x === 'function') {
		// 有可能是promise promise要有then方法
		try {
			// 因为then方法有可能是getter来定义的, 取then时有风险，所以要放在try...catch...中
			// 别人写的promise可能是这样的
			// Object.defineProperty(promise, 'then', {
			// 	get() {
			// 		throw new Error();
			// 	}
			// })
			let then = x.then; 
			if (typeof then === 'function') { // 只能认为他是promise了
				// x.then(()=>{}, ()=>{}); 不要这么写，以防以下写法造成报错， 而且也可以防止多次取值
				// let obj = {
				// 	a: 1,
				// 	get then() {
				// 		if (this.a++ == 2) {
				// 			throw new Error();
				// 		}
				// 		console.log(1);
				// 	}
				// }
				// obj.then;
				// obj.then

				// 如果x是一个promise那么在new的时候executor就立即执行了，就会执行他的resolve，那么数据就会传递到他的then中
				then.call(x, y => {// 当前promise解析出来的结果可能还是一个promise, 直到解析到他是一个普通值
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject);// resolve, reject都是promise2的
				}, r => {
					if (called) return;
					called = true;
					reject(r);
				});
			} else {
				// {a: 1, then: 1} 
				resolve(x);
			}
		} catch(e) {// 取then出错了 有可能在错误中又调用了该promise的成功或则失败
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}
复制代码
```

对于1）不能引用同一个对象 可能会造成死循环，我们举个例子：

```
let promise = new Promise((resolve, reject) => {
	resolve('hello');
});
let promise2 = promise.then(() => {
	return promise2;
});
promise2.then(() => {}, (err) => {
	console.log(err);
});
复制代码
```

就会报下面的错

```
[TypeError: Chaining cycle detected for promise #<Promise>]
复制代码
```

因为promise的then方法执行的时候创建了promise2，这个时候promise2状态是pending， 而成功回调里又返回promise2,既然返回的结果是一个promise那就继续解析尝试在它的then方法中拿到这个promise的结果，此时promise2的状态依然是pending，那么执行promise2.then方法只会添加订阅，而一直得不到resolve, 于是自己等待自己就死循环了。

## resolve的也是promise

有这么一种情况比如

```
new Promise((resolve, reject) => {
	resolve(new Promise((resolve, reject) => {
		resolve('hello');
	}));
});
复制代码
```

我们上面实现的代码就无法完成这么一个操作了，修改很简单

```
let resolve = (value) => {
	// 判断value的值
	if (value instanceof Promise) {
		value.then(resolve, reject);//resolve和reject都是当前promise的， 递归解析直到是普通值, 这里的resolve,reject都取的到，因为resolve的执行是在这两个函数执行之后，这里递归是防止value也是一个promise
		return;
	}
	if (this.status === PENDING) { // 保证只有状态是等待态的时候才能更改状态
		this.value = value;
		this.status = RESOLVED;
		// 需要让成功的方法一次执行
		this.onResolvedCallbacks.forEach(fn => fn());
	}
};
复制代码
```

下面给出完整代码

```
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]----'));
	}
	let called;
	if((typeof x === 'object' && x != null) || typeof x === 'function') {
		try {
			let then = x.then; 
			if (typeof then === 'function') { 
				then.call(x, y => {
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject);
				}, r => {
					if (called) return;
					called = true;
					reject(r);
				});
			} else {
				resolve(x);
			}
		} catch(e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING; 
		this.value = undefined; 
		this.reason = undefined; 
		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];
		let resolve = (value) => {
			if (value instanceof Promise) {
				value.then(resolve, reject);
				return;
			}
			if (this.status === PENDING) { 
				this.value = value;
				this.status = RESOLVED;
				this.onResolvedCallbacks.forEach(fn => fn());
			}
		};
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason;
				this.status = REJECTED;
				this.onRejectedCallbacks.forEach(fn => fn());
			}
		};
		try {
			executor(resolve, reject); 
		} catch (e) {
			reject(e);
		}
	}
	then(onfulfilled, onrejected) {
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v;
		onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error };
		let promise2 = new Promise((resolve, reject) => {
			if (this.status === RESOLVED) {
				setTimeout(() => {
					try {
						let x = onfulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) { 
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
			if (this.status === PENDING) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onfulfilled(this.value);
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
	catch(errCallback) {
		return this.then(null, errCallback);
	}
}

module.exports = Promise;
```


