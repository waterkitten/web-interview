# 神奇的Styled-components

> 网上二哲大佬的原话：
>
> 回到2013年，React凭空出世。但是在那时，我们会想，oh shit! 我们好不容易分离了HTML/CSS/JS, 为什么出现了JSX，我们又需要把HTML和JS耦合在一起？React 创造了 HTML in JS. 在React中，我们知道，一切即组件。那既然HTML能在js里写，为什么我们不把CSS也一起写呢？这样不才是一个真正的组件吗？
>
> Styled-components就是为React而生的，它是CSS in JS的下一代解决方案。以往我们想要做到css scope都需要在webpack中各种配置，或者使用js的解决方案。而styled-components你只需要`import styled from ‘styled-components‘;`即可。
>
> 甚至React完美的结合，不仅是从TagName上，还有Props上。使我们的代码有更好的语义化，可维护性更强，效率更高。当然我们无需考虑它的学习成本，只要你用过CSS或者SASS都可以立刻上手，因为它本身就是一种超集的存在。
>
> > 接下来，我会逐步的介绍一些这段时间以来，我非常喜欢的独有的特性。

## 长相初探

```react
export const HeaderWrapper = styled.div`
	z-index: 1;
	position: relative;
	height: 56px;
	border-bottom: 1px solid #f0f0f0;
`;
console.log(HeaderWrapper)//style component
new HeaderWrapper// react component

export default Header extends React.component{
	render(){
		return <HeaderWrapper {...props}/>
    }
}
//styled-components 用了tagged template语法，直接为我们编写样式创建组件。
```

## 应用场景（后面遇到其他场景我再来更新）

我们有时候要共用CSS，但又怕代码耦合相互扯皮，当然恶心的做法就是写一段同名代码覆盖咯  那有没有不恶心的做法呢

我们希望各个组件的样式是独立的  那我们styled-components依赖的应用场景就出来了

1. 我们让react兼容所有浏览器时候，可以用styled-compnets来处理这个事情

   - 我们先把index.css改成style.js

   - ```
     import {injectGlobal } from 'styled-components' 
     ```

   - 搜索 reset.css  把里面的代码塞进去（兼容所有浏览器）

   - ```
     injectGlobal`
     	${reset.css}
     `
     ```

2. 我们写页面时候，得去不停构想命名，很怕重复然后造成样式污染

   - 那在react可能不会有这种困扰 因为他们都是被裹着的 

     ```react
     export const NavItem = styled.div`
     	line-height: 56px;
     	padding: 0 15px;
     	font-size: 17px;
     	color: #333;
     `;
     ```

3. 我们有时候还想共用父样式，避免浪费 

   ```react
   export const NavItem = styled.div`
   	line-height: 56px;
   	padding: 0 15px;
   	font-size: 17px;
   	color: #333;
   	&.left {
   		float: left;
   	}
   	&.right {
   		float: right;
   		color: #969696;
   	}
   	&.active {
   		color: #ea6f5a;
   	}
   `;
   ```

4. 既然标签都被纳入js范畴了，那不能修改标签属性说不过去吧

   - ```
     export const NavSearch = styled.input.attrs({
     	placeholder: '搜索'
     })`
     `;
     ```

5. 但如果你是要处理类似URL时候，webpack是无法直接识别你的url，你可以借助嵌变量的写法

   - ```
     import logoPic from '../../statics/logo.png';
     export const Logo = styled.div`
     	position: absolute;
     	top: 0;
     	left: 0;
     	display: block;
     	width: 100px;
     	height: 56px;
     	background: url(${logoPic});
     	background-size: contain;
     `;
     ```

## 继承

```react
//方式一：会创建不一样的css rule
export const HeaderWrapper = styled.div`
	z-index: 1;
	position: relative;
	height: 56px;
	border-bottom: 1px solid #f0f0f0;
`;
const BigHeaderWrapper=styled(HeaderWrapper)``;
//方式二：这是一种有趣的继承方式  withComponent 继承方法  我们可以用此来改变渲染的标签
const Li=styled.li`
	color:#abcdef;
`
const A=li.withComponent('a')
//看起来像是高阶组件  会渲染a标签
//编译后使用不同的className，对于我们用同个样式，但不同标签十分有用


```

## 样式覆盖

这里说的样式覆盖，主要是交互行为（hover，active）覆盖，其实组件继承也算是覆盖的一种

以往我们的覆盖写法如下：

![image-20210219234426241](https://raw.githubusercontent.com/waterkitten/PicGo/master/img/image-20210219234426241.png)

而在styled中，我们可以使用styled-components 组件方式对我们的DOM进行引用，从而覆盖样式，如下

```react
const Icon=style.span`
	color:red
`;
const ListItem=styled.li`
	&:hover ${Icon}{
		color:green
	}
`
//这依旧是我们过去的思路来覆盖样式，只是我们把选择器直接使用styled组件引用罢了。
//拥有这样的接口，就更加让我们无需去思考需要给组件取什
//么className或者id，从而达到覆盖样式的做法。然而还有我最喜欢的另外一种写法。  
//TIPS：组件的引用必须是styled-components包装后的组件，直接是react的会报错
const ListItem = styled.li``;
const Icon = styled.span`
    color: red;
    
    ${ListItem}:hover & { // & 代表icon组件
        color: green;
    }
`;
//上面的两种写法是一样的，不过第二种更符合开放封闭原则，当不需要Icon组件直接删除就好了，不用去父组件寻找该组件有关样式

```

