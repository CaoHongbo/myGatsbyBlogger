---
layout: post
title: 升级 Babel7 小计
image: img/babel.jpg
author: Ghost
date: 2019-05-14 12:13:10
tags: 
  - Babel
---

前一段时间，给公司的 web 项目做优化，babel 版本打算升级到 7，升级的过程中遇到了一些问题，所以在此写一下解决的过程，首先看一下 npm 包的处理：

<img src="https://i.loli.net/2019/08/06/STNqCAfIZzk8MmO.png" style="width:50%;height:650px">

我们可以看到，把之前 babel 相关的版本全部卸载了，然后安装 babel7 相关的包

```
npm install --save @babel/polyfills
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

优化前我们的 _.babelrc_ 是这样的：

```json
{
  "presets": ["es2015-loose", "stage-3"],
  "plugins": ["add-module-exports", "transform-runtime"],
  "sourceMaps": true,
  "retainLines": true
}
```

然后试一下编译

```
babel src/ --out-dir app/
```

会报错 <mark style="background-color:#ff8063">Error: Plugin/Preset files are not allowed to export objects, only functions ...</mark>，这应该是 babel 升级后，以前的包卸载了造成的，但是我们不想把旧的包再安装回来，所以我们先把 _.babelrc_ 改造成

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": true // 转成 node.js，会快，因为很多代码不会转，而且这样不需要 @babel/polyfill
        }
      }
    ]
  ]
  "sourceMaps": true
}
```

可以发现我们的编译过了，但是由于代码不规范，有一些源代码如 `export default xxx`，babel 会转换成 `module.exports.default = xxx`,运行的时候其他地方直接引用这个模块会报错，所以我们需要插件 `add-module-exports`，这个插件会把代码相关代码转化成类似 `module.exports = xxx`，然后改造 _.babelrc_ 添加如下配置：

```javascript
{
  // 之前的配置 ...
  "plugins": [
    "add-module-exports" // 这个包必须用，转换 export default xxx
  ]
}
```

然后安装这个插件`npm install babel-plugin-add-module-exports --save-dev`，然后发现编译过了，也可以正常运行了，大功告成

---

最后总结：

- 个人觉得，现在 Node.js 的 LTS 版本对 ES6 的支持已经很高了，其实没必要使用 babel
- 代码规范很重要，要么就用 Node.js 的 CommonJS Module，要么就用 ES6 Module, 不要两个一起用
- 为什么没在代码中引用 `require('@babel/polyfill')`，因为转码的过程中 `targets` 是 `node`，已经包含了 Node.js 所需的运行环境，所以不需要
- 为什么使用 `add-module-exports` 插件，请看下面转码后的代码

```javascript
'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = 'foo';
module.exports = exports['default'];
// 其实添加了上面这句转换，其他模块引用 const foo = require('./index.js') 即可
// 如果没有上面这句话，其他模块引用的写法 const foo = require('.index.js').default，所以会报错
```
