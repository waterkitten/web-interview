# Vue源码

## 认识元编程

### property accesor

### proxy

### decorator

defineProperty

## 内容整理

1. 响应式原理
2. 虚拟DOM
3. 模板编译原理
4. 整体架构
5. 生命周期
6. 各种API内容
7. 指令的实现愿你
8. 过滤器的实现原理
9. 最佳实践

## 0.vue介绍

- 何为渐进式 

如果有一个现成的服务端应用，也就是非单页应用，vue可以嵌入其中带来丰富体验（？）

- vue的定位变化
  - 视图层 只有一个库 放页面就能用（view layer library
  - 官方辅助工具，router vuex cli（progressive Framework ）其层级（view layer—component—router—vuex—cli）
  - 引入虚拟Dom（原理

## 1.响应式原理

> 变化侦测的作用就是检测数据变化， 变化检测是有两种方式，拉和推，react是拉，vue是推
>
> 拉是说 当状态改变  会发送信号给框架  框架会暴力比对Dom哪些要渲染 react是虚拟Dom
>
> 推是说，状态发送变化时候，向这个状态的所有依赖发通知，进行Dom操作，后面为了解决开销问题，状态绑定的依赖不再是dom节点，而是组件，通知到组件后 组件内部再用虚拟Dom比对，降低了依赖数量子

### 如何追踪变化

> js中追踪对象的变化，两种方法：objec.defineProperty和proxy

- object和array的变化侦测都是采用不同的处理方式
- 

