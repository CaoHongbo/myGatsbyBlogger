---
layout: post
title: Koa.js 学习笔记
image: img/node-js-api.png
author: 曹某某
date: 2019-05-20 11:12:31
tags: 
  - Node.js
---

#### koa 中间件的运行机制

- 首先我们要知道，本文研究的是 koa 应用程序中间件，而不是路由中间件
- 该机制我们称之为 _middleware chain_，网上称之为“洋葱”模型
- 执行过程是按照代码书写的顺序从上到下执行：第一个中间件先执行到 `await next()`，然后执行第二个中间件，以此类推，执行到第三个没有其他的中间件可以执行后，再执行第二个中间件的 `await next()` 后的代码，同理再执行第一个，类似于一个堆栈，最先执行的中间件最晚执行 `await next()` 后的代码

![koa 中间件](./img/middleware.gif)

---

#### Koa 脚手架 koa-generator
我们使用 koa-generator，其特点如下：

- 集成了一些 express 风格的中间件，不需要手动去写，省时省力，开发效率高
- nodemon + runkoa，支持 ES6+ 语法，热重启

如何使用：

1. 安装 `npm install -g koa-generator`
2. <del>因为 Koa 分为两个版本，所以生成不同版本 Koa，项目的命令是不同的，比如在当前目录下创建一个名为 *test* 的项目，生成 koa v1  的命令是：`koa test && cd test && npm install`；</del>生成 Koa 最新版的命令是：`koa test && cd test && npm install`，然后 `npm start` 启动服务器，大功告成

当然，你也可以通过命令行参数来自定义 koa-generator 生成的项目，通过 `-h`  或 `--help`  来查看。 <u>其实 Node.js 对 ES6+ 语法的兼容性已经越来越高，再加上前端的更新换代特别快，这个脚手架已经慢慢的被淘汰了</u>

---

[koa](https://github.com/koajs/koa#readme)
[koa-generator](https://github.com/17koa/koa-generator#readme)
[koa2-demo](https://github.com/17koa/koa2-demo)

