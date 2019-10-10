---
layout: post
title: Node.js 介绍
image: ../img/nodeyellow.png
author: 曹某某
date: 2019-10-10 10:22:58
draft: true
tags: 
  - Node.js
---

#### Node.js 是什么？
官方的解释是：<u>Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.</u>

- Chrome's V8 engine：处理 JS 速度非常快，专注网络功能，在 HTTP、DNS、TCP 等方面更加成熟
- runtime：可以简单理解成类 JAVA 虚拟机，提供运行环境
- Node.js 于 2009 年写成，其原始作者是瑞安·达尔（Ryan Dahl），2009 年 11 月 8 日，他在欧洲 JSConf 大会上展示了 Node.js 项目，并受到了观众赞赏

> 在演讲中，达尔针对 Apache HTTP Server 和顺序编程方式给出了建议，认为 Apache 处理大量并发连接（10,000甚至更多）的可能性有限，而且顺序编程方式在多连接情况下会造成阻塞，或者消耗更多资源；而 Node.js 提供了基于事件驱动和非阻塞的接口，可用于编写高并发状态下的程序，而且 JavaScript 的匿名函数、闭包、回调函数等特性就是为事件驱动而设计的

---

#### Node.js 工作原理
三个关键词：单线程、非阻塞、事件循环
![事件循环](https://pic4.zhimg.com/v2-0b35a3df0b2e2712839ce551062e6d7f_1200x500.jpg)

---

#### Node.js 的优势
- 适合 IO 密集型编程，可以开发高性能 web 服务器
- 非常适合全栈开发，前后端技术栈统一，简单易用，敏捷开发，且节约成本
- 驱动前端生态快速发展
- 给 JavaScript 带来了质的飞越，万物皆可 JS
- NPM 仓库提供很多开源的模块供开发者使用

```javascript
/**
 * 没有使用任何的服务器，没有用任何的框架，没有用任何的线程进程
 * 核心代码不到 10 行就可以实现一个高性能高并发的服务器
 * */
const http = require('http'); // node.js 原生模块

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

#### Node.js 的不足
- 不太适合做 CPU 密集型开发（相对的）
- Node.js 刚刚 10 周年，没有像 JAVA 那样成熟的体系
- NPM 第三方仓库有很多漏洞风险
- JavaScript 语言缺陷

---
