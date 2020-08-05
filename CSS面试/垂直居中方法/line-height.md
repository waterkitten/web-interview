line-height 行高，就是两行文字之间基线的距离，用来调整文字的行间距。

line-height 的高度单位建议使用 em、rem，这样就可以避免因为容器高度变化引起的行高差异。

行高属性，表示一行是字体的多大倍数，比如 line-height: 1, line-height: 1.5 就分表表示一行高度是当前字体大小的一倍，或 1.5 倍

line-height 在日常用的最多的是让单行文字垂直居中（其实不需要设置 height，一个 line-height 即可）。因为 line-height - font-size 为行距，一般会近似平分到文字的上下两边，使文字看上去垂直居中。如果需要多行文字的垂直居中，还需要加上 vertical-align: middle;。

line-height 可以不设置单位，表示 font-size 的倍数。

另外对于非替换元素的纯内联元素，其高度是由 line-height 所决定的。
