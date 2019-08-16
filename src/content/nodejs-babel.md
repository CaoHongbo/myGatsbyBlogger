---
layout: post
title: Node.js 使用 Babel6 完美配置 ES6+
image: img/nodeyellow.png
author: Ghost
date: 2018-04-14T14:28:10.149Z
tags: 
  - Tests
---

近年来，ES6+ 越来越热，各大浏览器和 node.js 对于该标准的支持度也越来越高，ES6+ 有很多新的特性，也提供了更多的 API，可以说它对 ES5 进行了很大的改善，使开发人员更好的使用 JavaScript。虽然现阶段 node.js 新版本支持大部分的 ES6+ 特性，但还是不能直接使用全部的 ES6+ 语法来编写程序直接运行，例如无法使用下面的代码：
```javascript
import axios from 'axios';
export default {
  a: 'Hello World'
};
```
所以我们使用目前最主流的转换工具 Babel 来帮助我们编写ES6语法的代码 ...

#### 0x1 Babel6
Babel 是目前最流行的转码工具，代码编译器，我们使用它来实现我们的需求，目前使用的是 Babel6
#### 0x2 准备工作
首先需要在你的项目中安装相关的包，执行下面的命令
```bash
npm install --save-dev babel-cli babel-preset-env # babel-cli 和 es6+ 最新语法 
npm install --save-dev babel-preset-stage-0 # es6+ 阶段性提案语法 stage-0 包含stage1,2,3
npm install --save-dev babel-register # 钩子，在程序入口文件引入即可实现转码
npm install --save babel-polyfill # babel转码时不能识别一些全局对象的API，例如Object.assign，使用它可以解决这个问题
```
#### 0x3 配置 .babelrc
在项目中新建 `.babelrc` 文件：
```javascript
{
  "presets": [
    "env",
    "stage-0"
  ]
}
```
#### 0x4 配置入口文件
加入您的项目的启动文件是 `app.js`，则我们可以新创建一个入口文件，例如在当前目录新建一个文件 `bin.js`：
```javascript
// bin.js
require('babel-polyfill');
require('babel-register');
require('./app.js'); // 这个地方引入您的项目的启动文件
```
大工告成，最后运行命令，即可完美转码并运行 ES6+：
```
node bin.js
```

#### 0x5 生产环境
**注意：因为使用了 `babel-register`，这套配置会在代码运行的过程中进行转码（内存中），所以只适用于开发环境，不可用于生产环境。**生产环境的思路是首先在 `bin.js` 中去掉 `babel-register`，然后使用 `babel-cli` 把代码编译成新的代码，然后运行新的代码即可

- Babel version：v6
- Node.js version：v8
