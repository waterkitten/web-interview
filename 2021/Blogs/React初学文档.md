# 0.[ReactDOM]()

# 1.JSX 

1. jsx实现关注点分离

2. 自动插入分号陷阱

   1. 为了便于阅读，我们会将 JSX 拆分为多行。同时，我们建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到[自动插入分号](http://stackoverflow.com/q/2846283)陷阱。

      ### ![image-20210204230831286](C:\Users\DLX02\AppData\Roaming\Typora\typora-user-images\image-20210204230831286.png)

3. className

4. 防jsx注入

5. jsx表示对象

   1. 

   

```react
// 以下两种示例代码完全等效
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

# 2.元素渲染

元素是构成 React 应用的最小砖块。和组件不同

元素描述了你在屏幕上想看到的内容。

```
const element = <h1>Hello, world</h1>;
```

与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。	

### 	把元素渲染成DOM

1. root 仅使用react的话只有一个root
2. 如果是react集成进一个已有应用 那需传入reactDrom.render
3. 
4. 

### 更新已渲染元素

React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)。

考虑一个计时器的例子：

```react
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));}

setInterval(tick, 1000);
```

在实践中 render只会调用一次  详细参考后面的**状态组件**

### React 只更新它需要更新的部分

# 3.组件&Props

### 概念：

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 分类（函数/class组件）

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 渲染组件

#### pros是啥

> 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

### 组合组件（组件引用组件）

通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 `Button` 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />      <Welcome name="Cahal" />      <Welcome name="Edite" />    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### 提取组件（组件中封装组件）

```react
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

首先，我们将提取 `Avatar` 组件：

```
function Avatar(props) {
  return (
    <img className="Avatar"      src={props.user.avatarUrl}      alt={props.user.name}    />  );
}
```

`Avatar` 不需知道它在 `Comment` 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：`user`，而不是 `author`。

我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。

我们现在针对 `Comment` 做些微小调整：

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

### Props 的只读性

#### 纯函数

```
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

#### react的原则

相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

```
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它也有一个严格的规则：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

react组件如果是要动态更改参数，那就要用state 有点像vuex哈哈

# 4.State & 生命周期

### 0.将函数组件转换成 class 组件

### 1.向 class 组件中添加局部的 state

### 2.将生命周期方法添加到 Class 中

### 3.state的更新可能是异步的

### 4.state更新可能被合并（难）

（文档看的不是很懂，或者就完全不懂，这里查阅了一下其他解释）

