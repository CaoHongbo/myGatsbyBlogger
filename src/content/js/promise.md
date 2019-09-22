---
layout: post
title: Promise 掏心掏肺教程
image: ../img/promise.jpg
author: 曹某某
date: 2019-09-20 18:27:00
draft: true
tags:  
  - JavaScript
---

#### 什么是 Promise?
Promise 是 js 处理异步的一种主流方式，主要是改善变态的回调地狱式的开发，今天介绍一下 Promise 的使用方法和一些注意事项，它是一个状态机，有 3 种状态：`pending`、`fullfilled` 和 `rejected`，状态只能由 `pending` 变成 `fullfilled` 或者 `rejected`，下面结合 Node.js 有一个例子

```javascript
const fs = require('fs');
const promise = new Promise((resolve, reject) => {
  fs.readFile('./main.js', (err, data) => {
    if(!err) resolve(data); // resolve: pending -> fullfilled
    else reject(err); // reject: pending -> rejected
  });
})

promise.then((data) => {
  // resolve(data) --> data
}, (err) => {
  // reject(err) --> err
})
```

---

#### Promise 可以处理同步写法吗？
答案是：**不可以**，请看下面的例子
```javascript
const promise = new Promise((resolve) => {
  console.log('No.1');
  resolve('No.3');
});

promise.then((v) => {
  console.log(v);
})

console.log('No.2');

/**
 * 结果：
 * No.1
 * No.2
 * No.3
 **/
```
虽然上面没有任何异步的方法，都是同步的写法，但是 `resolve()` 是异步最后执行的，所以它不能处理同步的写法。这样有什么好处呢？举个例子，我们在写 Node.js 的时候可能会有大量计算的逻辑，为了不阻塞事件循环，可以使用 Promise 使同步变异步，让这个逻辑在事件循环的下一阶段执行，这样就可以达到我们的目的了

---

#### Promise 静态方法
Promise.resolve()

```javascript
// Promise.resolve() 相当于
new Promise((resolve, reject) => {
  resolve();
})
```

Promise.reject()

```javascript
// Promise.reject() 相当于
new Promise((resolve, reject) => {
  reject();
})
```

---

#### 链式调用

---

#### catch

---

#### Promise.all 和 Promise.race
- `Promise.all`：分两种情况，一种是 promise 实例对象都变成 `fullfilled` 时，等待全部异步执行完成，才会继续执行；另一种是只要有一个变成 `rejected` 时，马上继续执行
- `Promise.race`：任何一个 promise 实例对象（不管是 `resolve` 还是 `reject`）只要状态变化，就会继续执行

