1, 改用图片
2, 使用 -webkit-text-size-adjust:none; 但是不支持 chrome 27.0 以上版本
3, 使用 transform: scale( )缩小

使用 transform: scale(0.5, 0.5)，但使用 transform 需要注意下面几点：
1.transform 对行内元素无效，因此要么使用 display: block; 要么使用 display: inline-block;
2.transform 即使进行了缩放，原来元素还是会占据对应的位置。因此需要做调整，最好是在外面再包一层元素，以免影响其他元素。
