一、全局属性 hidden
hidden：布尔属性表示元素尚未或不再相关。例如，它可以用于隐藏在登录过程完成之前无法使用的页面元素。浏览器不会渲染此类元素。不得使用此属性隐藏可以合法显示的内容。

也就是说这个方法隐藏的元素不会在页面中占据位置
<div class="box" hidden></div>
二、display: none;
这个属性会让元素在页面中消失，不占据实际的空间
三、visible:hidden
这个属性会让元素在页面中'隐身'，也就是说只是单纯的看不见了，但是原来的空间依然被该元素占据
四、使用定位（position）
通过z-index
position: absolute;：让元素脱标，不占实际的位置
z-index: -1;：使用层级隐藏在其他元素之下

.box {
  position: absolute;
  z-index: -1;
}
通过位置或者margin
left: -500%; 、margin-left: -500%;：让元素的位置在当前可是区域之外

.box {
  position: absolute;
  left: -500%;
}
.box {
  position: absolute;
  margin-left: -500%;
}
使用 transform
必须使用position配合，让元素脱标，不然还会占据空间
scale：缩放

.box {
  position: absolute;
  /* 1.缩放 */
  transform: scale(0);
  /* 2.位移 */
  transform: translateX(-200%);
  /* 3.旋转 */
  transform: rotateX(90deg);
}
使用透明度
.box {
  position: absolute;
  opacity: 0;
}