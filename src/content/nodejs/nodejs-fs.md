---
layout: post
title: Node.js File System 玩转文件系统
image: ../img/nodeyellow.png
author: 曹某某
date: 2018-04-18 08:22:58
tags: 
  - Node.js
---

File System 模块，字面翻译就是文件系统，用于处理文件和文件流的，比如读写文件、创建文件或文件夹、删除文件、获取文件信息等只要是涉及文件的操作，用它就可以满足一切需求。

---

#### File System API 风格
使用 fs（下同 File System）首先要在代码中引用它：`require('fs')`。fs 提供了丰富的功能性方法，且都可以通过异步或同步的方式来实现，同步 API 的方法名一般都带有 `Sync`，请看下面的例子：
```javascript
// 例子，删除一个文件
// 首先 require
const fs = require('fs');

try {
  // 我是同步API，参数中没有回调函数，同步API如果出错了，需要用 try / catch 捕获异常
  fs.unlinkSync('/tmp/hello');
  console.log('successfully deleted /tmp/hello');
} catch (error) {
  console.log(error);
}

// 我是异步API，参数中一般都有回调函数
fs.unlink('/tmp/hello', (err) => {
  if (err) console.log(error);
  else console.log('successfully deleted /tmp/hello');
});
```

---

#### 文件的可读流和可写流

<span style="text-decoration:none;border-bottom:2px solid">当我们打开文件时，其实是打开了文件流，我们可以把它想象成一条河流，控制它流向其他地方；</span>举个例子，当我们用编辑器打开一个 *.txt* 文件并在屏幕上看到文本内容时，其实就是一个流的过程，从这个文本的文件流（可读流）流向屏幕的标准输出流（可写流），请看下面的例子：

```javascript
// 模拟流的过程，把当前文件的内容输出到屏幕
const fs = require('fs');
// 创建当前文件的可读流
const readFile = fs.createReadStream(__filename);
// 通过管道 pipe，文件的可读流 -> 标准输出
readFile.pipe(process.stdout);
```

把上述代码保存到某一个文件中如 *copy.js*，然后执行命令 `node copy.js` 就会看到我们期望的效果了。我们把难度提高，实现一个复制文件的功能：

```javascript
// 实现功能：把当前文件复制一份到当前目录
const fs = require('fs');

const readFile = fs.createReadStream(__filename); // 创建当前文件的可读流
const writeFile = fs.createWriteStream(`${__dirname}/newcopy.js`); // 创建新复制文件的可写流

// readFile 打开时触发，fd是文件描述符
readFile.on('open', fd => {
  console.log(' >>> readFile 文件流已经打开！');
});
// readFile 关闭时触发
readFile.on('close', () => {
  console.log(' >>> readFile 文件流已经关闭！');
});
// readFile 出错时触发
readFile.on('error', (err) => {
  console.dir(err);
  console.log('readFile 出错啦！');
})

// 注释同上
writeFile.on('open', fd => {
  console.log(' >>> writeFile 文件流已经打开！');
});
// 注释同上
writeFile.on('close', () => {
  console.log(' >>> writeFile 文件流已经关闭！');
});
// 注释同上
writeFile.on('error', (err) => {
  console.dir(err);
  console.log('writeFile 出错啦！');
})

// 文件复制，流：旧文件 -> 新文件
readFile.pipe(writeFile);
```

---

#### 如何学习并使用相关的 API

fs 模块提供了太多太多的 API，我们不可能耗费大量的时间一个一个地学习，但我们有个小技巧可以猜出每个接口大概都是什么作用，并快速找到我们所需要的 API，下面举一些例子，让大家不用看文档说明就可以猜出这些 API 的功能：

- `fs.fchmod()` ：字面上看，这个方法应该跟 linux 的 `chmod` 命令一样，所以这个方法肯定是处理文件权限的
- `fs.exsits()` ：肯定是判断文件是否存在的
- `fs.mkdir()`、`fs.rmdir()` ：肯定是创建和删除文件夹的
- `fs.rename()` ：肯定是修改文件名称的

通过<del>上面的判断方法</del> <span style="text-decoration:none;border-bottom:2px solid">API 名字</span>，我们就可以快速知道哪些 API 可以为我们所用。

---

#### 实战

接下来给大家一个实战的项目，需求是这样：根据文件夹的路径参数，我们的程序显示出该文件夹下有哪些文件或文件夹，并列出他们的名字：

```javascript
const fs = require('fs');
const path = require('path');

// 获取参数
const { argv } = process;
const param = argv[2] || '';

// 处理没有参数得情况
if (!param) {
  console.warn('请传参数，例如：node fs.js C:\\Windows');
  process.exit();
}

// 读取文件夹
// files 是文件名
fs.readdir(param, (err, files) => {
  if (err) console.dir(err); // 处理错误
  else {
    for (const f of files) {
      const filePath = path.join(param, f); // 文件绝对路径

      try {
        const fileStat = fs.statSync(filePath); // 文件状态信息 stat
        if (fileStat.isFile()) { // 文件
          console.log('文件：', f);
        } else if (fileStat.isDirectory()) { // 文件夹
          console.log('文件夹:', f);
        } else { // 其他格式
          console.log('其他文件类型：', f);
        }
      } catch (error) { // 无法访问的文件
        console.log('该文件无法访问：', f);
      }
    }
  }
});
```
我们将上述代码保存到文件中，如 *fs.js*，如果我们想查看 *C:\Windows* 目录下的文件，直接执行即可：

![alt 运行结果](https://i.loli.net/2019/08/18/kLb2cMU7pOsKRyf.gif)

---

- [Node.js File System 官方文档](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html)
- Node.js 文档版本为： v8.11.1
