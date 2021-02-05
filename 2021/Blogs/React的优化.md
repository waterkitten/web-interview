# pureComponent和memo组件

> 一个 React 组件，它包含两个子组件，分别是函数组件和 Class 组件。当这个 React 组件的 state 发生变化时，两个子组件的 props 并没有发生变化，此时是否会导致函数子组件和 Class 子组件发生重复渲染呢？

https://zhuanlan.zhihu.com/p/95865701

**App 组件：**

```
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ChildClass from './ChildClass.jsx';
import ChildFunc from './ChildFunc.jsx';

class App extends Component {
  state = {
    cnt: 1
  };

  componentDidMount() {
    setInterval(() => this.setState({ cnt: this.state.cnt + 1 }), 2000);
  }

  render() {
    return (
      <Fragment>
        <h2>疑问：</h2>
        <p>
          一个 React 组件，它包含两个子组件，分别是函数组件和 Class 组件。当这个 React 组件的 state
          发生变化时，两个子组件的 props 并没有发生变化，此时是否会导致函数子组件和 Class 子组件发生重复渲染呢？
        </p>
        <div>
          <h3>验证(性能优化前)：</h3>
          <ChildFunc />
          <ChildClass />
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

**Class 组件：**

```
import React, { Component } from 'react';

let cnt = 0;

class ChildClass extends Component {
  render() {
    cnt = cnt + 1;

    return <p>Class组件发生渲染次数: {cnt}</p>;
  }
}

export default ChildClass;
复制代码
```

**函数组件：**

```
import React from 'react';

let cnt = 0;

const ChildFunc = () => {
  cnt = cnt + 1;

  return <p>函数组件发生渲染次数: {cnt}</p>;
};

export default ChildFunc;
```

实际验证结果表明，如下图所示，无论是函数组件还是 Class 组件，只要父组件的 state 发生了变化，二者均会产生重复渲染。 而且由于传入的值props是没变化的，只是重复渲染而并没有影响值

![性能优化前](https://user-gold-cdn.xitu.io/2019/12/1/16ec0408dc83f0b4?imageslim)















#  setState 更新机制

## （一）值相同会不会重复渲染

> 给 React 组件的状态每次设置相同的值，如`setState({count: 1})`。React 组件是否会发生渲染？如果是，为什么？如果不是，那又为什么？

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 全局变量，用于记录组件渲染次数
let renderTimes = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  handleClick = () => {
    this.setState({ count: 1 });
  };

  render() {
    renderTimes += 1;

    return (
      <div>
        <h3>场景复现：</h3>
        <p>每次点击“设置”按钮，当前组件的状态都会被设置成相同的数值。</p>
        <p>当前组件的状态: {this.state.count}</p>
        <p>
          当前组件发生渲染的次数：
          <span style={{ color: 'red' }}>{renderTimes}</span>
        </p>
        <div>
          <button onClick={this.handleClick}>设置</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
//实践结果如下，每次点击按钮，组件都会重复渲染
```

![img](https://pic3.zhimg.com/v2-61266151cee710f7c01177670f2188aa_b.webp)

## （二）性能优化方法（pureComponent）

> 思路是：PureComponent，那pureComponent 是什么呢，在 [React 性能优化——浅谈 PureComponent 组件与 memo 组件](https://link.zhihu.com/?target=https%3A//juejin.im/post/5de364a4f265da05be3e5af3) 一文中，详细介绍了`PureComponent`的内部实现机制，此处可利用`PureComponent`组件来减少重复渲染。

