new 的理解
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

new 步骤
模拟 new 操作前，要先知道 new 操作是发生了什么，就拿 new Object()举例:

1. 创建一个新对象
2. 把新对象的原型指向构造函数的 prototype
3. 把构造函数里的 this 指向新对象
4. 返回这个新对象
5. 构造函数：
   先准备一个构造函数来 new 使用。

function constructorFunction(name, age){
this.name = name;
this.age = age;
}
constructorFunction.prototype.say = function(){
return 'Hello '+ this.name
}
原生 new：
var obj = new constructorFunction('willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian
模拟 new
模拟的 new 暂称为 newNew （囡..囡 哈哈~）
使用：newNew(constructor, arg1, arg2, ..) 第 0 个参数传入构造函数，1~n 个参数是构造函数的形参。
使用上面的构造函数试一下：

function newNew(){
var newObj = {}
// 1. 创建一个新对象
var Con = [].shift.call(arguments)
// 得到构造函数
newObj.**proto** = Con.prototype;
// 2. 把新对象的原型指向构造函数的 prototype
var res = Con.apply(newObj, arguments)
// 3. 把构造函数里的 this 指向新对象
return typeof res === 'object' ? res : newObj;
// 4. 返回新对象
}
var obj = newNew(constructorFunction, 'willian', 18)
console.log(obj.name, obj.age);//'willian', 18
console.log(obj.say())//Hello willian
得到和 new 一样的答案，说明模拟成功。
