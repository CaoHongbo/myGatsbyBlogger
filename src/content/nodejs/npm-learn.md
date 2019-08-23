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
- `npm prune`: 清除无用的包

---

#### 发布自己的 NPM 包
首先去 [npm官网](https://www.npmjs.com/signup) 注册一个自己的账号，同时你也需要一个 [GitHub](https://github.com/) 账号，用来托管你的模块代码，当然还要安装 Node.js，然后执行命令：`npm init` 并填写相关的信息

- `name` 模块的名字，默认是你当前文件夹的名字
- `version` 版本号，默认是1.0.0
- `description` 描述
- `entry point` 入口文件，默认是`index.js`
- `test command` 测试命令
- `git repository` git仓库，填写项目的github仓库地址
- `keywords` 关键字
- `author` 作者
- `license` 许可证书，默认`ISC`

如果你什么也不想填写，一直敲回车就好，填写完信息后当前文件夹会生成`package.json`文件。当然，如果你信息填写错误或者想添加一些东西，直接修改`package.json`文件就好

然后执行命令：`npm adduser`，输入你的npm账号、密码、邮箱，如果输入正确会提示 NPM 登录成功

然后执行 `npm publish`，你的模块就发布到npm仓库了，版本号默认是 `package.json` 中的 `version`。
如果你以后不想发布此模块了就执行 `npm unpublish <pkg>@<version>`，`npm unpublish`最好带版本号，不然npm会认为你要删除远成仓库中的整个项目，提示你警告信息。命令执行成功后就可以在npm上看到发布的模块了

友情提示：
- 如果你想删除远程仓库，请执行 `npm unpublish <pkg> --force`
- 不推荐执行 `npm unpublish`，因为官方温馨提示：<u>It is generally considered bad behavior to remove versions of a library that others are depending on!</u>。仔细想想就后怕，如果一个公司使用了你的模块，但你丧心病狂的删除了所有模块，这。。。真是拉仇恨必备啊
- 如果你发布了一个版本，下一次执行 `npm publish` 的时候版本号一定要高于之前的版本号哦

---

#### 总结一些常用 NPM 包
- [Ant Design](https://ant.design/index-cn) ：蚂蚁金服的一款 UI 库，强烈推荐，也是作者正在用的，其基于前端三大框架 React、Vue、Angular，专注于用户体验，所有视图都是组件化；有了它，甚至不需要美工和设计人员，甚至不需要懂 HTML 和 CSS，只用 JavaScript 就可以写出的页面效果精美，效率高且简单实用，快速开发必备
- [Element-ui](http://element.eleme.io/#/zh-CN) ：饿了么的一款 UI 库，同样很强大
- [Moment](https://momentjs.com/) 、[Dayjs](https://github.com/iamkun/dayjs) ：时间计算、格式化就用它，可以满足您一切的需要
- [Axios](https://github.com/axios/axios) ：目前最完美，使用量最多的 HTTP Client 工具
- [ESLint](https://eslint.org/) ：让开发人员写出更规范、标准的代码，减少开发过程中的错误，提高效率
- [Apidoc](http://apidocjs.com/) ：让你的代码生成漂亮的文档
- [Mysql](https://github.com/mysqljs/mysql) ：使用 Mysql 数据库常用的包
- [AVA](https://github.com/avajs/ava) ：JavaScript 测试框架，可以想象成 Mocha 的豪华升级版，它含有丰富的 API、可用 ES6+ 语法、高效率并发测试等功能，Mocha 已经没有人维护了，不推荐大家使用
- [Lodash](https://lodash.com/) ：Node.js 开发必备工具包，高效易用
- [PM2](http://pm2.keymetrics.io/) ：非常强大的 Node.js App 管理工具
- [Signale](https://github.com/klauscfhq/signale) ：非常强大的 logger 记录工具
- [log4js](https://log4js-node.github.io/log4js-node/layouts.html) ：也是非常实用的 logger 记录器，但是配置比较繁琐，文档学习起来比较麻烦
- [React](https://reactjs.org/) ：用于构建用户界面的 JavaScript 前端开发库
- [Vue](https://github.com/vuejs/vue#readme) ：渐进式 JavaScript 开发框架，灵活简单易用
- [Koa](https://github.com/koajs) ：最火爆的 Node.js Web 开发框架
- [Express](http://expressjs.com/) ：使用量最多的 Node.js Web 开发框架
- [Babel](http://babeljs.io/) ：转码工具，使用 ES6+ 必用的工具
- [Webpack](https://webpack.js.org/) ：稳定高效的构建工具
- [archiver](https://github.com/archiverjs/node-archiver) ：压缩文件必备
- [node-xlsx](https://github.com/mgcrea/node-xlsx#readme)、[xlsx](http://sheetjs.com/opensource) ：处理 excel 类型文件必备
- [bignumber.js](https://github.com/MikeMcl/bignumber.js) ：处理 JavaScript 数字的运算，再也不用担心运算过程中精度发生变化的问题了
- [nodemailer](https://nodemailer.com/about/) ：发送邮件必备
- [Puppeteer](https://github.com/GoogleChrome/puppeteer) ：强大的无头浏览器，用它可以模拟 Chrome 浏览器任何的操作
- [power-assert](https://github.com/power-assert-js/power-assert#customization-api)：强大的断言库，测试的时候经常用到

--- 

#### dependecies 和 devDependecies 的区别
<del>其实，说实话，我认为一点区别都没有，</del>这里科普一下他们的区别，`--save` 一般规定把程序运行时需要的 NPM 包存入到 *package.json* 的 `dependencies` 中，而 `--save-dev` 则是将与运行时无关的的 NPM 包存入到`package.json`的 `devDependencies` 中，上面提到的 `mocha` 和 `power-assert` 就属于开发环境需要的依赖（他们只负责单体测试，是独立于项目应用运行的），所以作者用了 `--save-dev` 的参数，当然这里没有硬性的规定，用哪个方案程序都可以正确运行，只是方便开发者管理而已

---

#### 源
有一些包下载地很慢，我们可以使用淘宝源来加快安装速度
- 临时替换 `npm --registry https://registry.npm.taobao.org install`
- 永久替换 `npm config set registry https://registry.npm.taobao.org`
- 查看源地址 `npm config get registry`
- 或者使用 cnpm

---

结语：写这篇文章就是想对 NPM 知识点做一个整理，以后还会继续总结和完善新的模块，如果您有好用的模块的话也可以在下面给作者留言，我会加入到本片文章中去，方便大家查阅和学习

