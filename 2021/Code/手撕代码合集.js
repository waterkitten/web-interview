// 防抖
function denounce (fn) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, 500)
    }
}
// 节流
function throttle (fn) {
    let canRun = true
    return function () {
        if (!canRun) {
            return
        }
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, 500)
    }
}
// call bind apply手写
Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    context.fn = this //绑定this到context的fn
    const args = [...arguments].slice(1) //把this删除，取参数
    const result = context.fn(...args) //执行函数
    delete context.fn //删除fn
    return result
}
fn.call(this, 1, 2, 3)
// bind
Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    context.fn = this //绑定this到context的fn
    let result
    // 有数组
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
// bind
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
// 深拷贝
function deepClone (obj) {
    if (typeof obj != 'object' || obj == null) {
        return obj
    }
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key])
        }
    }
    return result
}
// 数组去重
function unique (arr) {
    return Array.from(new Set(arr))  // 缺点：无法去除{}
}
function unique (arr) {
    for (let i = 0;i < arr.length; i++) {
        for (let j = i + 1; j<arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1)  //删除第二个
                j--
            }
        }
    }
    return arr
}
function unique (arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let array = []
    for (let i = 0;i < arr.length; i++) {
        if (!arr.includes(arr[i])) {
            array.push(arr[i])
        }
    }
    return array
}
function unique (arr) {
    if (!Array.isArray(arr)) {
        return
    }
    let array = []
    for (let i = 0;i < arr.length; i++) {
        if (!arr.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array
}
// new的职责
function A() {
    this.a = 1;
}
A.prototype.b = 1;
var a = new A(); // {a: 1}
a.b; // 1
// 模拟new
function A(){ this.name = "test" } 
var a = _new(A)  // a.proto = A.prototype
a.name //test
function _new (F, ...args) {
    var obj = Object.create(F.prototype); // 相当于 ({}).__proto__ = F.prototype
    var result = F.call(obj, ...args)  //obj绑定到_new函数上
    return typeof result === "object" ? result : obj
}
function myNew (obj, ...args) {
    let newObj = {}
    newObj.__proto__ = obj.prototype //空对象的原型指向了构造函数的prototype
    // 上面的两步可以合为一步
    let newObj = Object.create(obj.prototype)
    let result = obj.apply(newObj, args)  // 将obj的this改为新创建对象
    // 判断类里面有返回值吗？返回值是对象吗?如果是的那就返回类中的返回值，如果不是的话那就返回新创建的对象
    return typeof result === 'object' ? result : newObj 
}
function mockNew() {
    // 创建一个空对象
    let resultObj = new Object();
    // 取传入的第一个参数，即构造函数，并删除第一个参数。
    let constructor =  Array.prototype.shift.call(arguments);
    // 类型判断，错误处理
    if (typeof constructor !== "function") {
        throw("构造函数第一个参数应为函数");
    }
    // 绑定 constructor 属性
    resultObj.constructor = constructor;
    // 关联 __proto__ 到 constructor.prototype
    resultObj.__proto__ = constructor.prototype;
    // 将构造函数的 this 指向返回的对象
    constructor.apply(resultObj, arguments);
    // 返回对象
    return resultObj;
}
function Person(name) {
    this.name = name;
}
var person = mockNew(Person, "jayChou");
console.log(person);
// constructor: ƒ Person(name)
// name: "jayChou"
// __proto__: Object

// 手写promise
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
// test resolve success
// test resolve success链式调用return

// 随机排序
// [1,2,3,4,5],从后往前,获取随机值当做下标,然后获取值,再跟第i个交换，第i个变为这个值
function shuffle (arr) {
    let res = [...arr]
    for (let i = arr.length - 1;i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1)) // 获取下标
        let randomitem = res[randomIndex] // 获取具体的值
        res[randomIndex] = res[i] // 交换具体的值
        res[i] = randomitem
    }
    return res
}
// 继承
// 冒泡排序
function bubbleSort (arr) {
    let len = arr.length
    for (let i = 0;i < len; ++i) {  // 循环次数
        for (let j = 0; j < len - i; ++j) { // 相邻元素比较
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
// 选择排序
// 遍历每个数据，每次最小的就放到前面
// [6,5,2,4,10,12,11]  
// 第一次：找到最小的为2，放到最前。
// 第二次：遍历[2,5,6,4,10,12,11]，最小为4，放到最前并交换为[2,4,6,5,10,12,11]
function sort (arr) {
    let len = arr.length
    let min
    for (let i = 0;i < len; i++) {
        min = arr[i]
        for(let j = i + 1;j<len;j++) {
            if (arr[j] < min) {
                min = arr[j]
            }
        }
        [arr[i], min] = [min, arr[i]]
    }
    return arr
}
// 快速排序
function quickSort (arr) {
    let len = arr.length
    if (len < 2) {
        return arr
    }
    let center = arr[0]
    let left = []
    let right = []
    for (let i = 1;i < len;i++) {
        if (arr[i] >= center) {
            right.push(arr[i])
        }
        if (arr[i] < center) {
            left.push(arr[i])
        }
    }
    return [...quickSort(left), center, ...quickSort(right)]
}
// 深搜广搜
// 数组对象扁平化
function flatten(arr, result = []) {
    for (let item of arr) {
        if (Array.isArray(item)) {
            flatten(item, result)
        } else {
            result.push(item)
        }
    }
    return result
}
// 二分查找
// 非递归算法
function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while (low <= high){
        var mid = parseInt((high + low) / 2);
        if(key == arr[mid]){
            return  mid;
        }else if(key > arr[mid]){
            low = mid + 1;
        }else if(key < arr[mid]){
            high = mid -1;
        }else{
            return -1;
        }
    }
};
var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result = binary_search(arr,10);
alert(result);       

// 递归算法
function binary_search(arr,low, high, key) {
    if (low > high){
        return -1;
    }
    var mid = parseInt((high + low) / 2);
    if (arr[mid] == key){
        return mid;
    }else if (arr[mid] > key){
        high = mid - 1;
        return binary_search(arr, low, high, key);
    }else if (arr[mid] < key){
        low = mid + 1;
        return binary_search(arr, low, high, key);
    }
};
var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result = binary_search(arr, 0, 13, 10);

// 函数柯里化
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [].slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function () {
        var _adder = function() {
            // [].push.apply(_args, [].slice.call(arguments));
            _args.push(...arguments);
            return _adder;
        };
        // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }
        return _adder;
    }
    // return adder.apply(null, _args);
    return adder(..._args);
}
// jsonp
// 创建script标签，然后添加属性
function ajax(url, callback){
    var jsonp=document.createElement('script');
    jsonp.type = 'text/javascript';
    jsonp.src=url+'?callback=jsonpcallback';
    jsonpcallback = function(response){
        callback(response);
    };
    document.getElementsByTagName('head')[0].appendChild(jsonp);
}
// reduce实现map
Array.prototype.fakeReduce = function fakeReduce(fn, base) {
    // let arr = base ? this.unshift(base) : this;// 首进,返回新数组的长度，影响原数组 故不能这么写
    let initialArr = this;
    let arr = initialArr.concat(); //得到副本
    if (base) arr.unshift(base); // 当存在归并基础值的参数时，将其从数组首部推入
    let index;
    while (arr.length > 2) {
      index = initialArr.length - arr.length + 1;
      let newValue = fn.call(null, arr[0], arr[1], index, initialArr);
      arr.splice(0, 2); // 删除前两项，影响原数组
      arr.unshift(newValue);// 把 fn(arr[0],arr[1]) 的结果从数组首部推入
    }
    index += 1;
    let result = fn.call(null, arr[0], arr[1], index, initialArr);
    return result;
};