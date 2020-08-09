一、概念理解：
1、事件：HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应。比如点击事件、鼠标移入/移出事件等。事件通常与函数配合使用，这样就可以通过发生的事件来驱动函数执行。
2、DOM 事件流：冒泡事件流、捕获事件流。
3、DOM 事件模型：捕获、目标、冒泡。

那什么是事件委托呢？

事件委托：即是，一个事件本来是要绑定到某个元素上，然而却绑定到了该元素的父（或祖先）元素上，利用事件冒泡原理，触发执行效果。

 

二、事件委托的优点：

那为什么要使用事件委托？事件委托有什么好处，以及使用时要注意什么？

事件委托大概有两个优点：
1、提高网页性能。
2、通过事件委托添加的事件，对后期生成的元素依然有效。

上面提到的第二点如何理解呢？

举个例子：现在页面上有个 ul，ul 里有三个 li，通过循环给每个 li 添加点击事件，发现三个 li 到可以正常触发点击事件了，然后通过 js 代码在 ul 里插入（append）两个 li，
再试着点击所有 li，发现前面三个 li 正常触发点击事件，后面新添加的两个 li 无法正常触发点击事件。

 

三、事件委托的使用方法：

使用上面 ul 的例子进行事件委托给每个 li 绑定事件，示例代码：

复制代码
var ul = document.querySelector("ul");

ul.onclick = function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;

    if(target.nodeName.toLowerCase() === "li"){
        alert("li");
    }
}
复制代码
 

从示例代码中可以看出，要使用事件委托就要利用 event 对象。此处也能很容易的看出事件委托可以提高性能，因为本来需要对每个 li 都进行事件绑定，而现在只需要对 ul 进行事件绑定，减少了对DOM的操作。

 

四、事件委托怎么获取元素下标（索引值）：

利用数组方法indexOf查询当前li的下标：

复制代码
var ul = document.querySelector("ul");

ul.onclick = function(e){
    var
    e = e || window.event,
    target = e.target || e.srcElement;

    if(target === li[i]){
       var
       li=this.querySelectorAll("li");
       index = Array.prototype.indexOf.call(li,target);
       alert("所点击 li 的下标是：" + index);
    }
}    
复制代码
 

上述代码中，为什么需要 “index = Array.prototype.indexOf.call(li,target);” 这样使用数组的indexOf方法呢，这是因为querySelectorAll方法获取到的元素列表不是数组，和函数的arguments一样是一种类数组类型，不可以直接使用数组的方法。

 

注意：事件代理可能带来的隐患，当页面非常复杂的情况下，非常容易引起混乱，特别是当多种（个）事件通过事件委托绑定到同一个元素上时。