---
layout: post
title: 每天学点前端：BOM 和 DOM 干货总结
image: ../../img/bomdom.png
author: 曹某某
date: 2019-09-20 18:27:00
draft: false
tags:
  - DOM
  - BOM
  - JavaScript
---

#### BOM 是什么？

BOM(Browser Object Model) 即浏览器对象模型：**它和浏览器密切相关，如果要通过 JavaScript 操作浏览器，就找它**
- BOM 没有相关标准，所以不同的浏览器实现的方式可能不同
- BOM 的根对象是 `window` 对象。它既表示当前页面的窗口，为 JavaScript 访问浏览器提供 API；同时也是全局 Global 对象，开发时 JavaScript 声明的全局函数和全局变量都是 `window` 的属性和方法
- 使用 `window` 方法或属性的时候可以简写，如 `window.document` 可以简写成 `document`
  
BOM 常用属性
- `navigator` 浏览器和操作系统等相关信息，但是其信息可以被修改，所以不准确，不要用它去做一些判断
- `screen` 屏幕信息
- `location` URL 信息
- `document` DOM 对象
- `history` 浏览器的历史记录
  
BOM 常用方法
- `alert()` 弹出警告框
- `setInterval()` 到期重复执行
- `setTimeout()` 到期执行

---

#### DOM 是什么？

DOM(Document Object Model) 即文档对象模型：**它和页面密切相关，如果要操作页面，就找它**
- DOM 是 W3C 标准
- DOM 的根对象是 `window.document`，它是既属于 BOM 又属于 DOM 的对象。DOM 和文档有关，这里的文档指的是网页，也就是 HTML 文档
  
更新 DOM

```javascript

```
