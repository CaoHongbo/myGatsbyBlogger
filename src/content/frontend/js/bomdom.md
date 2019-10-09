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
  
---
  
#### 更新 DOM

- `innerHTML` 修改内部内容，可以是文本，也可以是 HTML 标签，所以要小心 XSS 攻击
- `innerText` 和 `textContent` 修改内部内容，如果是 HTML 标签的话，会进行转义；`textContent` 要注意有些浏览器版本不支持
- `style` 修改样式

```javascript
// HTML
<div id="node"></div>

// JS
// innerHTML
const d = document.getElementById('node');
d.innerHTML = 'Hello Mr';

// innerText textContent
if(d.textContent){ // 浏览器兼容
  d.textContent = 'Bye';
} else {
  d.innerText = 'Bye';
}

// css
d.style.color = 'red'
d.style.fontSize = '2em';
```

---

#### 插入 DOM
如果是空的 DOM 节点，可以使用 `innerHTML`；如果不是空的，一定要先找到**父节点**，然后可以使用 `insertBefore()` 和 `appendChild()`，注意：即将插入的节点如果已经存在于 DOM 文档中，则会先把这个节点从 DOM 中删除，然后再插入，可以看下面这个例子，明明插入了两次，但是只有最后插入的有实际效果
  
```javascript
// HTML
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>

// JS
// 如果要在 scheme 后面加一个节点
var list = document.getElementById('list');
var haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);

// 如果要在 java 前面加一个节点
var java = document.getElementById('java');
list.insertBefore(haskell, java);
```

---

#### 删除 DOM

先找到这个要删除的节点，然后用其父节点删除它

```javascript
// HTML
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>

// JS

// 删除 java
const java = document.getElementById('java');
const parent = java.parentElement;
parent.removeChild(java);
```

如果要遍历删除，可以先找父节点，然后通过父节点的 `children` 属性进行删除，但一定要注意，删除的同时 `children` 也是在不停的变化的

```javascript
// 删除第一、第二子节点，注意，因为 children 属性在删除时会变化，所以下面都是 [0]
const parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[0]);
```

删除只是在 DOM 中删除，内存中不会删除
