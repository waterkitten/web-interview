1. 前端是个发展迅速的领域，前端请求自然也发展迅速，从原生的 XHR 到 jquery ajax，再到现在的 axios 和 fetch。
   jquery ajax
   \$.ajax({
   type: 'POST',
   url: url,
   data: data,
   dataType: dataType,
   success: function() {},
   error: function() {}
   })
   复制代码它是对原生 XHR 的封装，还支持 JSONP，非常方便；真的是用过的都说好。但是随着 react，vue 等前端框架的兴起，jquery 早已不复当年之勇。很多情况下我们只需要使用 ajax，但是却需要引入整个 jquery，这非常的不合理，于是便有了 fetch 的解决方案。
   fetch
2. fetch 号称是 ajax 的替代品，它的 API 是基于 Promise 设计的，旧版本的浏览器不支持 Promise，需要使用 polyfill es6-promise
   举个例子：
   // 原生 XHR
   var xhr = new XMLHttpRequest();
   xhr.open('GET', url);
   xhr.onreadystatechange = function() {
   if (xhr.readyState === 4 && xhr.status === 200) {
   console.log(xhr.responseText) // 从服务器获取数据
   }
   }
   xhr.send()
   // fetch
   fetch(url)
   .then(response => {
   if (response.ok) {
   return response.json();
   }
   })
   .then(data => console.log(data))
   .catch(err => console.log(err))
   复制代码看起来好像是方便点，then 链就像之前熟悉的 callback。
   在 MDN 上，讲到它跟 jquery ajax 的区别，这也是 fetch 很奇怪的地方：

当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ）， 仅当网络故障时或请求被阻止时，才会标记为 reject。
默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

突然感觉这还不如 jquery ajax 好用呢？别急，再搭配上 async/await 将会让我们的异步代码更加优雅：
async function test() {
let response = await fetch(url);
let data = await response.json();
console.log(data)
}
复制代码看起来是不是像同步代码一样？简直完美！好吧，其实并不完美，async/await 是 ES7 的 API，目前还在试验阶段，还需要我们使用 babel 进行转译成 ES5 代码。
还要提一下的是，fetch 是比较底层的 API，很多情况下都需要我们再次封装。
比如：
// jquery ajax
\$.post(url, {name: 'test'})
// fetch
fetch(url, {
method: 'POST',
body: Object.keys({name: 'test'}).map((key) => {
return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&')
})
复制代码由于 fetch 是比较底层的 API，所以需要我们手动将参数拼接成'name=test'的格式，而 jquery ajax 已经封装好了。所以 fetch 并不是开箱即用的。
另外，fetch 还不支持超时控制。
哎呀，感觉 fetch 好垃圾啊，，还需要继续成长。。
axios
axios 是尤雨溪大神推荐使用的，它也是对原生 XHR 的封装。它有以下几大特性：

可以在 node.js 中使用
提供了并发请求的接口
支持 Promise API

简单使用

3. axios({
   method: 'GET',
   url: url,
   })
   .then(res => {console.log(res)})
   .catch(err => {console.log(err)})
   复制代码写法有很多种，自行查看文档
   并发请求
   function getUserAccount() {
   return axios.get('/user/12345');
   }

function getUserPermissions() {
return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
.then(axios.spread(function (acct, perms) {
// Both requests are now complete
}));
复制代码这是官方的并发案例，好像是挺厉害的样子。不过感觉它的 all 方法应该是基于 Promise.all()的
axios 体积比较小，也没有上面 fetch 的各种问题，我认为是当前最好的请求方式

最后，这都是些基础用法，还没有深入了解，还是要在实战中踩过坑才能运用的更加自如。

4. xmlhttprequest 对象
   请介绍一下 XMLhttprequest 对象
   Ajax 的核心是 JavaScript 对象 XmlHttpRequest。该对象在 Internet Explorer 5 中首次引入，它是一种支持异步请求的技术。简而言之，XmlHttpRequest 使您可以使用 JavaScript 向服务器提出请求并处理响应，而不阻塞用户。通过 XMLHttpRequest 对象，Web 开发人员可以在页面加载以后进行页面的局部更新
5. ajax
   一、什么是 Ajax
   Ajax(Asynchronous JavaScript and XML) 异步 JavaScript 和 XML

   Ajax 实际上是下面这几种技术的融合：

   (1)XHTML 和 CSS 的基于标准的表示技术

   (2)DOM 进行动态显示和交互

   (3)XML 和 XSLT 进行数据交换和处理

   (4)XMLHttpRequest 进行异步数据检索

   (5)Javascript 将以上技术融合在一起

   客户端与服务器，可以在【不必刷新整个浏览器】的情况下，与服务器进行异步通讯的技术
   二、https://github.com/ZhongFuCheng3y/3y#ribbonajax

   三、原生 Ajax 请求过程

   1. 创建全平台兼容的 XMLHttpRequest 对象：

   function getXHR(){
   var xhr = null;
   if(window.XMLHttpRequest) {// 兼容 IE7+, Firefox, Chrome, Opera, Safari
   xhr = new XMLHttpRequest();
   } else if (window.ActiveXObject) {
   try {
   xhr = new ActiveXObject("Msxml2.XMLHTTP");// 即 MSXML3
   } catch (e) {
   try {
   xhr = new ActiveXObject("Microsoft.XMLHTTP");// // 兼容 IE6, IE5，很老的 api,虽然浏览器支持,功能可能不完善,故不建议使用
   } catch (e) {
   alert("您的浏览器暂不支持 Ajax!");
   }
   }
   }
   return xhr;
   }

   2. Ajax 请求数据的过程：

   var xhr = getXHR();
   xhr.open('GET', url/file,true); //设置请求方式，url，以及是否异步
   xhr.onreadystatechange = function() { //设置回调监听函数
   if(xhr.readyState==4){
   if(xhr.status==200){
   var data=xhr.responseText;
   console.log(data);
   }
   };
   xhr.onerror = function() {
   console.log("Oh, error");
   };
   xhr.send(); //发送请求
