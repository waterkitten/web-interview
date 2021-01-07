1. data-\* 属性用于存储页面或应用程序的私有自定义数据。

data-\* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。

存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

data-\* 属性包括两部分：

属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
属性值可以是任意字符串
注释：用户代理会完全忽略前缀为 "data-" 的自定义属性。

2. 1、块级元素可以包含内联元素或某些块级元素，但内联不能包含块级元素，它只能包含其它内联元素。
   2、块级元素不能放在 p 里面。
   3、有几个特殊的块级元素只能包含内联元素，不能包含块级元素。如 h1,h2,h3,h4,h5,h6,p,dt
   4、li 内可以包含 div
   5 a 标签可以包括任何元素，除了自身
3. Canvas

4. 不换行也不省略 ：
   word-break : keep-all;
   white-space : nowrap;  
   不换行，超出用省略号代替 :
   word-break : keep-all;
   white-space : nowrap;
   overflow : hidden;
   text-overflow : ellipsis;
