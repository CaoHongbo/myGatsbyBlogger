---
layout: post
title: Promise 掏心掏肺教程
image: ../../img/promise.jpg
author: 曹某某
date: 2019-09-20 18:27:00
draft: true
tags:  
  - JavaScript
---

#### 什么是 Promise ?
Promise 是 js 处理异步的一种主流方式，主要是改善变态的**回调地狱**式的开发，这篇文章不是基础教程，主要是介绍一些心得和注意事项，大部分都是干货；Promise 有 3 种状态：`pending`、`fullfilled` 和 `rejected`，状态只能由 `pending` 变成 `fullfilled/rejected`，一旦状态改变就不会再变，而且不受外部影响，下面结合 Node.js 有一个很简单的例子

```javascript
const fs = require('fs');
const promise = new Promise((resolve, reject) => { // promise一旦创建会立即执行
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

请看下面这个例子，`p2 resolve()` 参数是 promise 实例时

1. 若 `p1` 的状态是 `pending`，则会等待其状态改变，然后执行下面的逻辑
2. 若 `p1` 状态是 `fullfilled/rejected`，则 `p2` 状态会跟 `p1` 一样，并执行 `then/catch`

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

`resolve` 或者 `reject` 不代表 promise 执行完毕，因为其回调会在当前事件循环阶段最末执行
```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(v => {
  console.log(v);
});
// 2
// 1
```

---

#### Promise 可以处理同步写法吗？
答案是：**Promise 本身是不可以的**，请看下面的例子

```javascript
const promise = new Promise((resolve) => {
  console.log('No.1');
  resolve('No.2');
});

promise.then((v) => {
  console.log(v);
})

console.log('No.3');

/**
 * 结果：
 * No.1
 * No.3
 * No.2
 **/
```
虽然上面没有任何异步的方法，都是同步的写法，但是 `resolve()` 是异步最后执行的，所以它不能处理同步的写法。这样有什么好处呢？举个例子，我们在写 Node.js 的时候可能会有大量计算的逻辑，为了不阻塞事件循环，可以使用 Promise 使同步变异步，让这个逻辑在事件循环的<s>下一阶段</s>当前阶段最后执行，这样就可以达到我们的目的了

那如何处理同步呢，或者说我们要控制同步的执行呢？我们可以使用一些特殊的技巧

```javascript
// 使用 async 处理同步的逻辑，因为其会马上执行
const f = async (v) => {
  console.log(v);
}

const promise = new Promise((resolve) => {
  console.log('No.1');
  resolve('No.3');
});

promise.then(f)

console.log('No.2');
/**
 * 结果：
 * No.1
 * No.2
 * No.3
 **/
```

---

#### Promise.prototype.finally
很好理解，不管 promise 实例的状态变成什么，都会执行

---

#### Promise 静态方法
Promise.resolve()：把参数变成 Promise 实例
- 无参数
- 参数是常量
- promise 对象
- thenable 对象 含有 `then` 方法的对象

```javascript
// Promise.resolve() 相当于
new Promise((resolve, reject) => {
  resolve();
})
```

Promise.reject()
- 参数是啥，则 `then/catch` 里面函数的参数就是啥

```javascript
// Promise.reject() 相当于
new Promise((resolve, reject) => {
  reject();
})
```

---

#### Promise.prototype.catch
用 `catch` 捕获异常或错误，而不要用 `then` 来处理，因为 `then` 只能处理上一个 promise 的异常，不能处理当前 `then` 的异常，而且链式调用中，每个 `then` 里面都写错误处理的话也增加了很多代码量，所以说在链式调用的最后加上 `catch` 来捕获错误方便又安全

```javascript
const promise = Promise.resolve();
promise.then(() => {
  throw new Error('reject');
}, (e) => {
  console.log(e); // 这里面不会捕获到上面的 Error
})
```

---

#### Promise.all 和 Promise.race
- `Promise.all`：分两种情况，一种是 promise 实例对象都变成 `fullfilled` 时，等待全部异步执行完成，才会继续执行；另一种是只要有一个变成 `rejected` 时，马上继续执行
- `Promise.race`：任何一个 promise 实例对象（不管是 `resolve` 还是 `reject`）只要状态变化，就会继续执行

#### 敬请期待
- 链式调用
- Promise.try

