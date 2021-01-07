是 CSS 中的一个渲染机制，BFC 就相当于一个盒子，内部的元素与外界的元素互不干扰。它不会影响外部的布局，外部的布局也不会影响到它。

BFC 全称“块级格式化上下文”(Block Formatting Context)，对应的还有 IFC。BFC 类似一个“结界”，如果一个 DOM 元素具有 BFC，那么它内部的子元素不会影响外面的元素；外面的元素也不会影响到其内部元素。

最常见的例子就是清除 float 的 overflow: hidden; 属性。overflow: hidden; 会触发元素的 BFC，因此其内部的 float 元素不会影响到外部元素的布局。

形成条件（任意一条）

> 1.  float 的值不是 none
> 2.  position 的值不是 static 或者 relative
> 3.  display 的值是 inline-block,table-cell,flex,table-caption 或者 inline-flex
> 4.  overflow 的值不是 visible

特性

> 1.  内部的盒子会在垂直方向上一个接一个的放置 对于同一个 BFC 的俩个相邻的盒子的 margin 会发生重叠，与方向无关。
>
> 2.  每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此 BFC 的区域不会与 float 的元素区域重叠
>
> 3.  计算 BFC 的高度时，浮动子元素也参与计算 BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
