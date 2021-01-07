# 不熟悉的API/数据类型

## Map对象和map方法

- map方法

**`Map`** 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)) 都可以作为一个键或一个值。

​	比object好的地方是

![image-20201230234447856](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20201230234447856.png)

- map方法

  ​	用来创建一个新数组，结果是每次调用某个函数后返回的一个值

  ​	

  ```javascript
  const array1 = [1, 4, 9, 16];
  
  // pass a function to map
  const map1 = array1.map(x => x * 2);
  
  console.log(map1);
  // expected output: Array [2, 8, 18, 32]
  
  ```

## slice和splice的区别

`**slice()**` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。`原始数组不会被改变。`

**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。`此方法会改变原数组`。

## 网络请求的api

粗略理解：

- **ajax解决页面请求就要整体刷新问题问题**

  1. `XMLHttpRequest`（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 [AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX) 编程中被大量使用。

- **ajax可以实现局部刷新 xhr就是实现ajax的环节**

  1. AJAX允许只更新一个 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 页面的部分 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)，而无须重新加载整个页面。AJAX还允许异步工作，这意味着当网页的一部分正试图重新加载时，您的代码可以继续运行（相比之下，同步会阻止代码继续运行，直到这部分的网页完成重新加载）。

- **fetch的出现是用来替代ajax**

  - Fetch 提供了对 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 和 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) （以及其他与网络请求有关的）对象的通用定义。使之今后可以被使用到更多地应用场景中：无论是 service worker、Cache API、又或者是其他处理请求和响应的方式，甚至是任何一种需要你自己在程序中生成响应的方式。

  - 它同时还为有关联性的概念，例如CORS和HTTP原生头信息，提供一种新的定义，取代它们原来那种分离的定义。发送请求或者获取资源，需要使用 [`WindowOrWorkerGlobalScope.fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch) 方法。它在很多接口中都被实现了，更具体地说，是在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 和 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) 接口上。因此在几乎所有环境中都可以用这个方法获取到资源。

  -  `fetch()` 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 Promise 对象，resolve 对应请求的 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)。你也可以传一个可选的第二个参数 `init`（参见 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)）一旦[`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 被返回，就可以使用一些方法来定义内容的形式，以及应当如何处理内容（参见 [`Body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)）。

- **Promise解决回调地狱**

  - 一个 `Promise` 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 *promise*，以便在未来某个时候把值交给使用者。

- **asyc是解决链式调用问题，以同步的方式来写异步**

  async函数是使用`async`关键字声明的函数。 async函数是[`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)构造函数的实例， 并且其中允许使用`await`关键字。`async`和`await`关键字让我们可以用一种更简洁的方式写出基于[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的异步行为，而无需刻意地链式调用`promise`。async函数还可以被[作为表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function)来定义。

  ​	`var resolveAfter2Seconds = function() {`

    `console.log("starting slow promise");`

    `return new Promise(resolve => {`

     `setTimeout(function() {`

  ​    `//  异步处理 所以不会先返回`

  ​    `resolve("slow");`

  

  ​    `console.log("slow promise is done");`

     `}, 2000);`

    `});`

   `};`

  `` 

   `var resolveAfter1Second = function() {`

    `console.log("starting fast promise");`

    `return new Promise(resolve => {`

     `setTimeout(function() {`

  ​    `resolve("fast");`

  ​    `console.log("fast promise is done");`

     `}, 1000);`

    `});`

   `};`

  `` 

   `var sequentialStart = async function() {`

    `console.log('==SEQUENTIAL START==');`

  `` 

    `// 1. Execution gets here almost instantly`

    `const slow = await resolveAfter2Seconds();`

    `console.log(slow); // 2. this runs 2 seconds after 1.`

  `` 

    `const fast = await resolveAfter1Second();`

    `console.log(fast); // 3. this runs 3 seconds after 1.`

   `}`

  `` 

   `var concurrentStart = async function() {`

    `console.log('==CONCURRENT START with await==');`

    `const slow = resolveAfter2Seconds(); // starts timer immediately`

    `const fast = resolveAfter1Second(); // starts timer immediately`

  `` 

    `// 1. Execution gets here almost instantly`

    `console.log(await slow); // 2. this runs 2 seconds after 1.`

    `console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved`

   `}`

  `` 

   `var concurrentPromise = function() {`

    `console.log('==CONCURRENT START with Promise.all==');`

    `return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {`

     `console.log(messages[0]); // slow`

     `console.log(messages[1]); // fast`

    `});`

   `}`

  `` 

   `var parallel = async function() {`

    `console.log('==PARALLEL with await Promise.all==');`

  `` 

    `// Start 2 "jobs" in parallel and wait for both of them to complete`

    `await Promise.all([`

  ​    `(async()=>console.log(await resolveAfter2Seconds()))(),`

  ​    `(async()=>console.log(await resolveAfter1Second()))()`

    `]);`

   `}`

  `` 

   `// This function does not handle errors. See warning below!`

   `var parallelPromise = function() {`

    `console.log('==PARALLEL with Promise.then==');`

    `resolveAfter2Seconds().then((message)=>console.log(message));`

    `resolveAfter1Second().then((message)=>console.log(message));`

   `}`

  `` 

   `sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"`

  `` 

   `// wait above to finish`

   `setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"`

  `` 

   `// wait again`

   `setTimeout(concurrentPromise, 7000); // same as concurrentStart`

  `` 

   `// wait again`

   `setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"`

  `` 

   `// wait again`

   `setTimeout(parallelPromise, 13000); // same as parallel`

## symbol数据类型

Symbol 是 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 的 [原始数据类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) ，Symbol实例是唯一且不可改变的.  

在一些编程语言中 symbol也被称为原子(atoms).

在[JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript)中，Symbol 是 [基本数据类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 的一种，[`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 对象是 Symbol原始值的[封装](https://developer.mozilla.org/en-US/docs/Glossary/Wrapper) 。

Symbol 的描述是可选的，但仅用于调试目的。

Symbol 类型是 ECMAScript 2015 中新添加的特性，在ECMAScript 5中没有对应的类型。

```javascript
Symbol("foo") !== Symbol("foo")
const foo = Symbol()
const bar = Symbol()
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]
```

多用于键值对的键，因为唯一性