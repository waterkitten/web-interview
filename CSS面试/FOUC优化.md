1. 第一次听，敲一遍增加记忆， FOUC 指的是先展示节点，css 后加载，原因是 采用了 @import 活着 style 放在 body 中，解决方案 使用 link 链接 css 并放在 head 中。优先加载

2. FOUC：加载时样式突然变化
   原因：由于在渲染 HTML 时，遇到 CSS 样式表会重新渲染 HTML

3. 样式表没有放到 head 里面
   使用了@import 导入样式
   解决：尽量把样式表放到 body 标签上面
