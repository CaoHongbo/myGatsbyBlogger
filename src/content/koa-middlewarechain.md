---
layout: post
title: Koa.js 学习笔记：了解中间件的运行机制
image: img/node-js-api.png
author: 曹某某
date: 2019-05-20 11:12:31
tags: 
  - Node.js
---

#### koa中间件的运行机制

- 首先我们要知道，本文研究的是 koa 应用程序中间件，而不是路由中间件
- 该机制我们称之为 _middleware chain_，网上称之为“洋葱”模型
- 执行过程是按照代码书写的顺序从上到下执行：第一个中间件先执行到`await next()`，然后执行第二个中间件，以此类推，执行到第三个没有其他的中间件可以执行后，再执行第二个中间件的`await next()`后的代码，同理再执行第一个，类似于一个堆栈，最先执行的中间件最晚执行`await next()`后的代码
