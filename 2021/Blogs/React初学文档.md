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

![image-20210208174012502](https://raw.githubusercontent.com/waterkitten/PicGo/master/img/image-20210208174012502.png)

>   合并的意思替换，保留然后又完全替换的意思是修改其中一个值不会影响另外一个，比如我修改了obj{1，2，3}中的a，b的值不会改，只修改一个，所以叫浅合并也

### 5.数据是向下流动的

组件可以选择把state作为props向下传递给子组件

```
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的：

```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

# 5.事件处理

### 0.语法差别以及Js函数机制补充

- html 是 “event”  在react 是用{event}

- 阻止默认事件在react 是要显性阻止，e.preventDefalut()

- react一般不需要 **addEventListener**为已创建的Dom元素添加监听器，只需要在元素初始渲染的时候添加监听器   

  > - 在使用Es6语法定义组件时候，为了在回调中使用this，要写 this.eventHandle=this.handleClick.bind（this) 而且是在constructor里面定义好

  > - class的方法中不会默认不会绑定this，如果忘记在绑定this.handleEventLister，那你调用这个函数时候就会undefined这里可以关注一下 **JavaScript函数工作原理** 如果没有方法后面添加（） 那就要绑定this
  > - 如果感觉bind绑定麻烦，两种方式解决：**public class fields语法**或者回调中使用 **箭头函数**

  > 补充：JavaScript的函数工作原理之关于this的绑定
  >
  > - 方法一：用self或者that存储this变量指向
  >
  >   ```javascript
  >   var myObj={
  >   render: function () {
  >           var that = this;
  >           this.getAsyncData(function () {
  >               that.specialFunction();
  >               that.anotherSpecialFunction();
  >           });
  >       }
  >   }
  >   
  >   ```
  >
  > - 方法二：巧用bind
  >
  >   ```react
  >   render: function () {
  >   this.getAsyncData(function () {
  >   
  >       this.specialFunction();
  >   
  >       this.anotherSpecialFunction();
  >   
  >   }.bind(this));
  >   //调用时候把所需上下文this传入使用
  >   //以下是使用的例子
  >   
  >   var foo = {
  >       x: 3
  >   }
  >   
  >   var bar = function(){
  >       console.log(this.x);
  >   }
  >   
  >   bar(); // undefined
  >   
  >   var boundFunc = bar.bind(foo);
  >   
  >   boundFunc(); // 3
  >   
  >   }
  >   ```
  >
  >   - 方法三:public class fields
  >
  >   ```react
  >   class login extends React.Component{
  >   	handleClick=()=>{
  >   		console.log(this)
  >   	}
  >   	render(){
  >   		return(
  >   		<button onClick={this.handleClick}>
  >   		click me
  >   		</button>
  >   		)
  >   	}
  >   }
  >   ```

  > - 方法四：箭头函数
  >
  >   ```react
  >   class login extends React.Component{
  >   	handleClick=()=>{
  >   		log(this)
  >   	}
  >   	render(){
  >   		<button onClick={()=>this.hanleClick()}>
  >   		 Click me
  >         	</button>
  >   	}
  >   }
  >   //这种语法官方不推荐 以为每次渲染都会创建新的不同回调函数，浪费空间是一方面；但如果该回调作为props传入子组件。这些组件可能会进行额外的重新渲染，因此官方是推荐方法3
  >   ```

###      1.向事件处理程序传参	

```react
<button onClick={(e)=>this.delete(id,e)}>Delete ROW</button>
<button onClick={(e)=>this.delete.bind(id,e)}>Delete ROW</button>
//两种用法的区别在于事件是否是显性传递
```

# 6.条件渲染

### 根据对应状态渲染

这个一般会整个组件都渲染进去

```react
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {  
      return <UserGreeting />;  
  }  return <GuestGreeting />;}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
   document.getElementById('root'));
```

### 元素变量

使用变量来贮存元素，有条件渲染组件一部分，而其他的渲染部分不会变化

```77react
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
//创建有状态的组件LoginControl
//它将根据当前的状态来渲染 <LoginButton /> 或者 <LogoutButton />。
//同时它还会渲染上一个示例中的 <Greeting />。
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

### 与运算符&&   三目运算符

- 通过花括号嵌入代码，jsx里面可以写任何表达式
- condition？true：false

### 阻止组件渲染

直接return  null就vans

# 7.列表渲染

- key基础列表组件

- key提取组件·

  ```react
  function ListItem(props) {
    // 正确！这里不需要指定 key：  return <li>{props.value}</li>;}
  
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      // 正确！key 应该在数组的上下文中被指定   
                        <ListItem key={number.toString()}
                            value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
   //好的方法是在map（）方法中的元素需要设置key属性
  ```

- key只是兄弟节点之间唯一

- map循环的两种写法

- 在上面的例子中，我们声明了一个单独的 `listItems` 变量并将其包含在 JSX 中：

  ```react
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>    <ListItem key={number.toString()}        
    value={number} />  );  
    return (
      <ul>
        {listItems}
      </ul>	
    );
  }
  ```

  JSX 允许在大括号中[嵌入任何表达式](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 `map()` 返回的结果：

  ```react
  function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>  
        <ListItem key={number.toString()} 
        value={number} />   
        )}   
       </ul>
    );
  }
  ```

  [**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

  这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个 `map()` 嵌套了太多层级，那可能就是你[提取组件](https://react.docschina.org/docs/components-and-props.html#extracting-components)的一个好时机。

  Is this page useful?[编辑此页面](https://github.com/reactjs/zh-hans.reactjs.org/tree/master/content/docs/lists-and-keys.md)

# 8.婊单

JavaScript函数可以方便处理表单的提交同时还可以访问用户填写的表单数据，实现这种效果的标准方式是是使用“受控组件”

### 受控组件

HTML 表单元素（<input><select>)通常自己维护state,并根据用户输入进行更新。而在React中，可变状态（mutable state)维护自己state，并根据用户输入来更新

我们可以两者结合让react的state成为唯一的数据源，渲染表单的react组件还控制用户输入过程中表单发生的操作。

> ```react
> class nameForm extends React.component{
> constructor(props){
>   super(props)
> 	 this.state={value:''}
> 	 this.ValueChange=this.ValueChange.bind(this)
>   this.ValueSubmit=this.ValueChange.bind(this)
> }
>  ValueChange(e){
>      this.setState({value:e.target.value})
>  }
>  ValueSumbmit(e){
>      console.log(this.state.value)
>      e.preventDefault()
>  }
>  render(){
>      return(
>       <form onSubmit={this.ValueChange}>
>      <label>
>        Name:
>        <input type="text" value={this.state.value} onChange={this.ValueChange} />
>      </label>
>      <input type="submit" value="Submit" />
>    </form>
>      )
>  }
> }
> ```

控件的值是放在react state的，好处是你可以把值可以传到其他UI元素组件

### 处理多个输入

补充学习：

只要给每个input设置name属性就好了  然后再让事件处理判断

这里使用了 ES6 [计算属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)的语法更新给定输入名称对应的 state 值：

例如：

```
this.setState({
  [name]: value});
  //[]里面可以写变量
```

等同 ES5:

```
var partialState = {};
partialState[name] = value;this.setState(partialState);
```

另外，由于 `setState()` 自动[将部分 state 合并到当前 state](https://react.docschina.org/docs/state-and-lifecycle.html#state-updates-are-merged), 只需调用它更改部分 state 即可。

### 受控组件弊端

还没体验过先不写

### 表单的业务方案

Formik

一个库 还没用过

# 9.状态提升

```react
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    //传入值和转换公式
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
    //判断公式
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      //处理变化
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={pariv>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

```





```react
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    //传入值和转换公式
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
    //判断公式
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      //处理变化
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={pariv>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
//这个处理方式很精妙，他没有去保留不同的cels和fahre 而是只保留了最后修改的temperature和scale，这是因为另外一个输入框的值可以通过另外两个值以及组件的render获取  这使得我能够清除输入框内容
```

# 10.组合VS继承

### 组件无法知晓子组件的具体内容

> - 具体是在sidebar和dialog 这种业务场景中  官方建议这些组件用一个特殊的children prop来把子组件传递到渲染结果去 这个prop是把子组件传过去  渲染在一个div中
>
> - 但在部分情况下  我需要在一个组件中预留几个洞，这种情况把所需要的传入props，并去使用
> - <contacts/><chat/>这类react元素本质其实是对象object，所以你可以把他们当作props，像其他数据一类传递。这种可以类比去 **槽** 概念的限制，可以作为props进行传递

```react
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}    
      </div>
      <div className="SplitPane-right">
        {props.right}    
      </div>
    </div>
  );
}
//这是一种判断的方式

function App() {
  return (
    <SplitPane
      left={
        <Contacts />      
      }
      right={
        <Chat />    
      } />
  );
}
```

### 特例关系

welcomeDialog可以是Dialog特殊实例

在react中，我们可以通过组合实现，“特殊”组件可以通过props定制并渲染“一般”组件

```react

//方法一：
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
//方法二：
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

组合也同样适用于以 class 形式定义的组件。

```react
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}               onChange={this.handleChange} />        <button onClick={this.handleSignUp}>          Sign Me Up!        </button>      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

### 继承呢

#官方说不用

# 11.react最佳实践

## 一.TodoList

### 0.UI分层级

![Component diagram](img/thinking-in-react-components.png)

1. **`FilterableProductTable` (橙色):** 是整个示例应用的整体
2. **`SearchBar` (蓝色):** 接受所有的*用户输入*
3. **`ProductTable` (绿色):** 展示*数据内容*并根据*用户输入*筛选结果
4. **`ProductCategoryRow` (天蓝色):** 为每一个*产品类别*展示标题
5. **`ProductRow` (红色):** 每一行展示一个*产品*

### 1.React创建一个静态版本

渲染UI和交互最好分开，不要用state构建静态版本

### 2.UI state最小表示

最好保留所需的state最小集合，其他数据由他计算产生

state排除以下三种情况

- 不是父组件props传递来
- 随时间推移会变化
- 不能给其他state或者props 计算的来

### 3.确定state的位置

分析组件的共同父亲组件，如果找不到个合适的位置存放state，直接创建一个新组件存放state，并把新租件放在共同所有这组件层级位置

### 4.添加反向数据流



```react
<body>
  <div id="root"></div>
  <script type="text/babel">
    const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    //
    const scale = this.props.scale;
    console.log(temperature)
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

    </script>
</body>
```

## 二.井字棋

```react
  <div id="errors" style="
  background: #c00;
  color: #fff;
  display: none;
  margin: -20px -20px 20px;
  padding: 20px;
  white-space: pre-wrap;
"></div>
  <div id="root"></div>
  <script>
    window.addEventListener('mousedown', function (e) {
      document.body.classList.add('mouse-navigation');
      document.body.classList.remove('kbd-navigation');
    });
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 9) {
        document.body.classList.add('kbd-navigation');
        document.body.classList.remove('mouse-navigation');
      }
    });
    window.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
    window.onerror = function (message, source, line, col, error) {
      var text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
      errors.textContent += text + '\n';
      errors.style.display = '';
    };
    console.error = (function (old) {
      return function error() {
        errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
        errors.style.display = '';
        old.apply(this, arguments);
      }
    })(console.error);
  </script>
  <script type="text/babel">

    function Square(props){
    return(
        /*
      注意：此处使用了 onClick={() => alert('click')} 的方式向 onClick 这个 prop 传入一个函数。
      React 将在单击时调用此函数。但很多人经常忘记编写 () =>，
      而写成了 onClick={alert('click')}，
      这种常见的错误会导致每次这个组件渲染的时候都会触发弹出框。
      （1）把两个this.props替换成了props
      （2）我们把 Square 修改成函数组件时，我们同时也把 onClick={() => this.props.onClick()}
      改成了更短的 onClick={props.onClick}（注意两侧都没有括号）。
      */
      <button className="square" onClick={props.onClick}>
      {props.value}
        </button>
      )
  }
  class Board extends React.Component{
    renderSquare(i){
      return(
        <Square
          value={this.props.squares[i]}
          onClick={()=>this.props.onClick(i)}
        />
      )
    }
    render(){
      return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
      )
    }
  }
  class Game extends React.Component{
    constructor(props){
      super(props)
      this.state={
        history:[{
          squares:Array(9).fill(null)
        }],
        stepNumber:0,
        xIsNext:true
      }
    } 
    handleClick(i){
      const history=this.state.history.slice(0,this.state.stepNumber+1)
      const current=history[history.length-1]
      const squares=current.squares.slice()
      if(calculateWinner(squares)||squares[i])
        return     
      squares[i]=this.state.xIsNext?'x':'0'
      this.setState({
        history:history.concat([{
          squares:squares
        }]),
        stepNumber:history.length,
        xIsNext:!this.state.xIsNext
      })
      /*
      slice方法创建了squares数组副本，而不是直接在现有的数组上进行修改
      修改数据的两种方式，一种直接修变量，一种新数组代替旧数据（不可变性）
      var player = {score: 1, name: 'Jeff'};
      （1）player.score=2
       (2)var newPlayer = Object.assign({}, player, {score: 2})
       采用方法（2）是为了跟踪游戏进度，可以回退之前的版本
       不可变性最大优势是可以创建pure component 可以确定何时对组件重新渲染，提高性能
      */
    }
    jumpTo(step){
      this.setState({
        stepNumber:step,
        xIsNext:(step%2)===0
      })
    }
    render(){
      const history=this.state.history
      const current=history[this.state.stepNumber]
      const winner=calculateWinner(current.squares)
        const moves=history.map((step,move)=>{
          const desc=move?
          'go to move #'+move:'go to game start'
        return(
          <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
          </li>
        )
        })
        let status;
        if(winner){
          status="Winner"+winner
        }else{
          status='Next player'+(this.state.xIsNext?'x':'0')
        }
      return(
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      )
    }
  }
  ReactDOM.render(
    <Game/>,
    document.getElementById('root')
  )
  //胜者判断
  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

  </script>

```

# 12.高级指引

## 0.无障碍

#### 内容解释

Web无障碍是指设计和开发网站、工具和技术，使残疾人能够使用它们。更具体地说，人们可以:

- 感知、理解、导航和与Web交互
- 为Web做贡献

Web无障碍包括所有影响浏览网页的障碍，包括:

- 听觉
- 认知能力
- 神经损伤
- 身体上的
- 语言
- 视觉

Web无障碍对*无*残疾人士亦有好处，例如:

- 人们使用手机、智能手表、智能电视等具有小屏幕、不同输入模式的设备等
- 随着年龄的增长能力发生变化的老年人
- 有“暂时性残疾”的人，如手臂骨折或眼镜丢失
- 有“情境限制”的人，例如在明亮的阳光下或在无法听音频的环境中
- 使用慢速互联网连接，或带宽有限或昂贵的人

## 1.fragments

碎片的意思，react模式是一个组件返回多个元素。fragment允许讲子列表分组而无需dom额外添加节点

主要还是方便技术这边去看，fragment是可以设置key的，但相比较之下，短语法就没办法

## 2.context

### 注意

这个part有点晦涩，api也多 需要后面结合项目慢慢看

### 解释以及方法

context提供了一个无需为每层组件手动添加props就能组件树间进行数据传递的方法

算是除了props以外的另外一种解决方案

原本的props传值是唯一的方法，因为单向数据流处理

但context的好处是让我们避免通过中间元素传递props

使用方法如下：😂

```react
//定义
const ThemeContext=React.createContext('light')
//这里的light是defaultvalue 没传入值就用defaultvalue
//provide传入 以下的组件都能接受到
render(){
    <ThemeContext.Provider value="dark">
    	<Toolbar></Toolbar>
    </ThemeContext.Provider>
}
//下面直接使用就好了
<某非常深的组件/>
static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
```

### 应用场景

如果只是为了避免层层传递属性，component composition 有时候更好

```react
/*
*原本的应用场景
*/
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
/*
*现在，我们有这样的解决方法
*/
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

这种变化下，只有最顶部的 Page 组件需要知道 `Link` 和 `Avatar` 组件是如何使用 `user` 和 `avatarSize` 的。

这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的

```react
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

### class.contextType

```react
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 [`React.createContext()`](https://react.docschina.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

> 注意：
>
> 你只通过该 API 订阅单一 context。如果你想订阅多个，阅读[使用多个 Context](https://react.docschina.org/docs/context.html#consuming-multiple-contexts) 章节
>
> 如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 `static` 这个类属性来初始化你的 `contextType`。

### context.consumer

```react
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

一个 React 组件可以订阅 context 的变更，这让你在[函数式组件](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)中可以订阅 context。

这种方法需要一个[函数作为子元素（function as a child）](https://react.docschina.org/docs/render-props.html#using-props-other-than-render)。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 `value` 值等价于组件树上方离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

返回的是一个react节点