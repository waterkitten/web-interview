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

2. 自定义的生命周期函数

3. 生命周期的阶段和作用

4) vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢？
