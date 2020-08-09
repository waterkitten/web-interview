arguments 是一个对象。

js 不能像 java 一样实现重载，arguments 对象可以模拟重载。

js 中每个函数都会有 arguments 这个实例，它引用着函数的实参，可以用数组下标的方式"[]"引用 arguments 的元素。arguments.length 为函数实参个数，arguments.callee 引用函数自身。

arguments 他的特性和使用方法

特性：

1.arguments 对象和 Function 是分不开的。

2.因为 arguments 这个对象不能显式创建。

3.arguments 对象只有函数开始时才可用。

使用方法：

虽然 arguments 对象并不是一个数组，但是访问单个参数的方式与访问数组元素的方式相同

例如：

arguments[0],arguments[1]...
arguments 不是数组，是类数组。
类数组 转 数组的方法有

1. [...arguments]
2. Array.from(arguments)
3. Array.prototype.slice.call(arguments)
