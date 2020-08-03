之前有讲过 JS 数据类型，但是怎么判断到底是某个数据是什么数据类型？今天就来讲一下。JS 数据类型检测常用的主要有四种方法：

1.typeof
对于基本数据类型检测，我们可以使用 typeof 操作符来判断他的数据类型，typeof 有两种写法：typeof(xxx) 和 typeof xxx

    console.log(typeof(123));       //"number"
    console.log(typeof('hello'));       //"string"
    console.log(typeof(true));      //"boolean"
    console.log(typeof(undefined));   //"undefined"
    console.log(typeof(null));    //"object"
    console.log(typeof({}));      //"object"
    console.log(typeof([]));      //"object"
    console.log(typeof(function () {}));      //"function"

typeof 操作符只可以对除 null 以外的基本类型做出正确的判断，但是对于引用数据类型，检测出来都是 object ，无法判断具体属于那种对象，显然这不是我们想要的结果。

2.instanceof
instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B ，如果 A 属于 B 的实例，则返回 true ，否则返回 false 。作为一个前端工作者，我们不就要知其然，更要知其所以然，instanceof 的实现原理是什么样的，如何自己实现一个 instanceof 。下面我们用一段伪代码来模拟其内部执行过程：

    //手动实现一个instanceof
    function instance_of (A,B) {    // A 表示左表达式，B 表示右表达式
        var l = A.__proto__
            ,r = B.prototype;
        if(l === r) {    // A的内部属性 __proto__ 指向 B 的原型对象
            return true;
        }
        return false;
    }

从上述过程可以看出，当 A 的 **proto** 指向 B 的 prototype 时，就认为 A 就是 B 的实例。

    console.log([] instanceof Array);       //true
    console.log({} instanceof Object);       //true
    console.log(new Date() instanceof Date);       //true
    console.log([] instanceof Object);       //true
    console.log(new Date() instanceof Object);       //true
    console.log("123" instanceof String);       //false

由上我们可以看到由于原项链的关系，所有的对象实例都是可以间接的指向 Object 这个类的。因此，instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型，而且 instanceof 对于引用类型的支持很好，但他是无法对原始类型进行判断，所以一般都是在 typeof 判断为 object 时才使用 instanceof。
原项链.png
3.constructor
constructor 可以打印出实例所属的类，表达式为：实例.constructor 。那么判断各种类型的方法就是:

    console.log([].constructor == Array);       //true
    console.log({}.constructor == Object);      //true
    console.log("string".constructor == String);        //true
    console.log((123).constructor == Number);       //true
    console.log(true.constructor == Boolean);       //true

由此我们可以得出一个是否为数组的严谨的判断方法 isArray()：

function isArray(object){
return object && typeof object==='object' &&
Array == object.constructor;
}
有需要注意的两点是：
1.null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。

2. 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object

4.Object.prototype.toString.call()
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

    console.log(Object.prototype.toString.call('')) ;       // [object String]
    console.log(Object.prototype.toString.call(1)) ;        // [object Number]
    console.log(Object.prototype.toString.call(true)) ;     // [object Boolean]
    console.log(Object.prototype.toString.call(undefined)) ;     // [object Undefined]
    console.log(Object.prototype.toString.call(null)) ;     // [object Null]
    console.log(Object.prototype.toString.call(new Function())) ;     // [object Function]
    console.log(Object.prototype.toString.call(new Date())) ;     // [object Date]
    console.log(Object.prototype.toString.call([])) ;     // [object Array]
    console.log(Object.prototype.toString.call(new RegExp())) ;     // [object RegExp]
    console.log(Object.prototype.toString.call(new Error())) ;     // [object Error]
    console.log(Object.prototype.toString.call(document)) ;     // [object HTMLDocument]
    console.log(Object.prototype.toString.call(window)) ;     //[object global] window 是全局对象 global 的引用

所以我们的 isArray()方法还可以这样写：

function isArray(value){
return Object.prototype.toString.call(value) == "[object Array]";
}
相同的我们判断是否为字符串，是否为布尔值，是否为对象等等都可以这样实现，换汤不换药。

作者：哎呦\_連啓
链接：https://www.jianshu.com/p/842d1d9269fd
