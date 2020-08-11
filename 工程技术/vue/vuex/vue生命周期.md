1. 描述一下生命周期
   生命周期就是 vue 从开始创建到销毁的过程，分为四大步（创建，挂载，更新，销毁），每一步又分为两小步，如 beforeCreate，created。

<!--  -->

beforeCreate 前，也就是 new Vue 的时候会初始化事件和生命周期；

<!--  -->

beforeCreate 和 created 之间会挂载 Data，绑定事件；

<!--  -->

接下来会根据 el 挂载页面元素，如果没有设置 el 则生命周期结束，直到手动挂载；

<!--  -->

el 挂载结束后，根据 templete/outerHTML(el)渲染页面；

<!--  -->

在 beforeMount 前虚拟 DOM 已经创建完成；

<!--  -->

之后在 mounted 前，将 vm.\$el 替换掉页面元素 el;mounted 将虚拟 dom 挂载到真实页面（此时页面已经全部渲染完成）；

<!--  -->

之后发生数据变化时触发 beforeUpdate 和 updated 进行一些操作；

<!--  -->

最后主动调用销毁函数或者组件自动销毁时 beforeDestroy，手动撤销监听事件，计时器等；

<!--  -->

destroyed 时仅存在 Dom 节点，其他所有东西已自动销毁。这就是我所理解的 vue 的一个完整的生命周期；

2. 组件进来请求接口时你是放在哪个生命周期？为什么？
   created => 因为在这个生命周期我们常用到的都已经初始化好了
   涉及到需要页面加载完成之后的话就用 mounted,可以操作 dom
3. 生命周期的阶段和作用
   准确地控制数据流和其对 DOM 的影响，给了用户在不同阶段添加自
   己的代码的机会

4. vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢？如何抓获错误
   1. 看实际情况，一般在 created（或 beforeRouter） 里面就可以，如果涉及到需要页面加载完成之后的话就用 mounted。
      在 created 的时候，视图中的 html 并没有渲染出来，所以此时如果直接去操作 html 的 dom 节点，一定找不到相关的元素
      而在 mounted 中，由于此时 html 已经渲染出来了，所以可以直接操作 dom 节点，（此时 document.getelementById 即可生效了）。
   2. errorCaptured,errorHandler
