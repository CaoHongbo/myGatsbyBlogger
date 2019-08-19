---
layout: post
title: NPM 二三事
image: ../img/nodeyellow.png
author: 曹某某
date: 2018-03-14 11:43:58
tags: 
  - Node.js
---

NPM(Node Package Manager) 是 Node.js 形影不离的包管理工具，跟随 Node.js 一起安装在您的电脑上，通过 *package.json* 来进行配置，此外，NPM 市场提供了数以万计的第三方开源包，开发者们可以自由的使用，大大地提高了开发效率。这篇文章主要介绍了作者使用 NPM 的一些经验以及一些坑。

#### Can't find Python executable "python", you can set the PYTHON env variable 解决办法
我们在安装一些包的时候经常会遇到这样的问题，解决办法：首先安装 Python，然后设置环境变量即可；但是可能还是会报错，下面以 Windows 平台为例，解决这个问题，执行下面的命令即可：

```
npm install --global --production windows-build-tools
```

其他平台遇到这个问题请访问 https://github.com/nodejs/node-gyp

---

#### 常用命令

- `npm view moudleName homepage`：查看包的主页
- `npm list`：查看当前目录下已安装的node包
- `npm rebuild moduleName`：用于更改包内容后进行重建
- `npm outdated`：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
- `npm update moduleName`：更新node模块
- `npm uninstall moudleName`：卸载node模块
- `npm help json`：查看package.json
- `npm search packageName`：搜索相关的包
- `npm root`：查看当前包的安装路径
- `npm root -g`：查看全局的包的安装路径
- `npm audit fix`：但是不要用`npm audit fix --force`，这样会导致代码不好用


