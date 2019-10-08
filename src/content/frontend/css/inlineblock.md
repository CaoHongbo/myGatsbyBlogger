---
layout: post
title: 每天学点前端：行内元素和块级元素
image: ../../img/css3.jpg
author: 曹某某
date: 2019-09-09 17:51:41
tags: 
  - CSS
---

#### 块级元素特点
- `display: block`
- 通常占据其父元素的整个空间；块级元素后面另起一个新行；可以包含行内元素和块级元素
- 可以设置 `margin` 和 `padding`
- 可以设置宽高
- 如果没有设置宽高，则跟内容大小变化，如果设置了宽高，则要考虑 overflow
  
---

#### 行内元素特点
- `display: inline`
- 只占据它对应标签的边框所包含的空间；不会新起一行；只能包含内容和行内元素
- 可以设置 `margin` 和 `padding`，但 `margin` 只可以设置左右
- 不可设置宽高
- 如果设置了 `float: left/right`，则会变成块级元素，且具有浮动属性
- 如果设置了 `position: absolute/fixed`，则会变成块级元素

---

#### 注意点
- 可以把两者进行转换，也可以使用 `display: inline-block`
- 可变元素：如 `button` 等，是根据上下文语境决定该元素是行内元素还是块级元素


