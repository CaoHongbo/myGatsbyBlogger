---
layout: post
title: Promise
image: ../img/promise.jpg
author: 曹某某
date: 2018-03-14 11:43:58
draft: true
tags: 
  - JavaScript
---

#### 什么是 Promise
Promise 是 js 处理异步的一种主流方式，主要是改善变态的回调地狱式的开发，今天介绍一下 Promise 的使用方法和一些注意事项，它是一个状态机，有 3 种状态：`pending`、`fullfilled` 和 `rejected`，下面结合 Node.js 有一个例子
```
const fs = require('fs');
const promise = new Promise((resolve, reject) => {
  fs.readFile('./main.js', (err, data) => {
    if(!err) resolve(data);
    else reject(err);
  });
})
```

---

#### 代码示例

```javascript
const os = require('os');
const G = 1024 * 1024 * 1024;
const system = {
  uptime: os.uptime(),
  platform: os.platform(),
  hostname: os.hostname(),
  release: os.release(),
  type: os.type(),
  arch: os.arch(),
  eol: os.EOL, // 换行符
  endianness: os.endianness(), // 字节次序
  loadavg: os.loadavg(), // 平均负载
  network: os.networkInterfaces() // 网络
};
const memory = {
  freemem: os.freemem(),
  totalmem: os.totalmem()
};
const dir = {
  homedir: os.homedir(),
  tmpdir: os.tmpdir()
};
const cpus = os.cpus();
const userInfo = os.userInfo();
const constants = os.constants;

console.log('系统版本：%s %s %s', system.type, system.release, system.arch);
console.log('主机名称：%s', system.hostname);
console.log('开机时长：%sh', (system.uptime/3600).toFixed(1));
console.log('总内存：%sG', (memory.totalmem / G).toFixed(2));
console.log('可用内存：%sG', (memory.freemem / G).toFixed(2));
console.log('HOME目录：%s', dir.homedir);
console.log('TEMP目录：%s', dir.tmpdir);
console.log('CPU：%s %s核处理器', cpus[0].model, cpus.length);
console.log(`用户名：${userInfo.username}`);
```

- [Node.js OS 官方文档](https://nodejs.org/dist/latest-v8.x/docs/api/os.html)
- Node.js 文档版本为： v8.9.1
