---
layout: post
title: Node.js Querystring
image: ../img/nodeyellow.png
author: 曹某某
date: 2018-07-18 08:23:58
tags: 
  - Node.js
---

Querystring（稳定性：2 - Stable）模块是 Node.js 解析和格式化 URL 查询字符串的工具。在 Node.js 中，querystring 代表查询字符串，说白了就是 HTTP GET 方法请求服务器的查询参数，如果你还是不清楚这个概念，看了下图就明白了：

![黄色的框内就是查询字符串](https://i.loli.net/2019/08/18/pidjRJlobO6Bn9W.png)

#### 为什么要用 Querystring 工具
首先要了解URI为什么要编码，可以参考这篇文章[URI编码](http://www.cnblogs.com/leaven/archive/2012/07/12/2588746.html)
下文用**百分号编码**代表**URI编码**
- 使用安全的字符表示不安全的字符，如中文，某些特殊的字符等。这样的话不管是浏览器环境，或者服务器环境，传输的数据都是安全的，可以正确地使用，不会出现数据的丢失或显示错误的情况
- 消除一些有歧义的字符，举个例子，你想通过一个参数`data`传输`'&a=1&b=1&c=1'`这几个字符，如果这样写

```
data=&a=1&b=1&c=1 // 服务器解析的时候实际是四个参数：data，a，b，c
```

但如果通过 querystring 处理，它就是下面这种情况

```
data=%26a%3D1%26b%3D1%26c%3D1  // 安全传输data
```

所以在处理查询参数的时候使用`querystring`是很有必要的，使用之前首先要引用它：

```JavaScript
const querystring = require("querystring"); 
import querystring from "querystring"; // 或者 es6 的写法
```

---

#### querystring.escape(str)
- str `<String>` 
这个方法跟JavaScript原生的方法`encodeURIComponent`得到的结果是一样的，根据规则将不安全的字符转化为百分号编码。

```JavaScript
// 两个结果是一样的
encodeURIComponent('&a=1&b=1&c=1')
// returns '%26a%3D1%26b%3D1%26c%3D1'
querystring.escape('&a=1&b=1&c=1')
// returns '%26a%3D1%26b%3D1%26c%3D1'
```

**但请注意，这个方法是`querystring.stringify`所使用的，不要直接调用哦！！**

#### querystring.stringify(obj[, sep[, eq[, options]]])
- `obj` `<Object>` 把该对象序列化成URL的查询字符串
- `sep` `<String>` 划分`obj`每个键值对的符号，默认是`'&'`
- `eq` `<String>` 连接`obj`键和值的符号，默认是`'='`
- `options` `<Object>`
`encodeURIComponent` `<function>` 这个函数将不安全的字符转化为百分号编码，默认是`querystring.escape()`

一些例子：
```JavaScript
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })    
// corge的值替换成null，undefined，NaN结果是一样的
// returns 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
// returns 'foo:bar;baz:qux'

querystring.stringify({ data: '&a=1&b=1&c=1'})
// returns 'data=%26a%3D1%26b%3D1%26c%3D1'
```

以上的字符编码默认是 UTF-8，如果想用其他的编码方式，可以这样写

```JavaScript
// 假设gbkEncodeURIComponent方法已经存在
querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
  { encodeURIComponent: gbkEncodeURIComponent })
```

#### querystring.unescape(str)
- str `<String>` 
该方法是将百分号编码解码，与`querystring.escape()`的作用正好是相反的。它默认使用的是JavaScript内置的方法`decodeURIComponent()`，如果失败，将使用更安全的等价值（格式正确的URLs）。同样，**该函数是被`querystring.parse`所使用的，不要直接调用哦**

#### querystring.parse(str[, sep[, eq[, options]]]
- `str` `<String>` 需要解析的URL查询字符串
- `sep` `<String>` 划分键值对的符号，默认是`'&'`
- `eq` `<String>` 划分键和值的符号，默认是`'='`
- `options` `<Object>`
`decodeURIComponent` `<Function>` 将百分号编码解码， 默认是`querystring.unescape()`
`maxKeys` `<number>` 设置最大解析键值对的个数，默认是`1000`，如果是`0`则没有限制

```JavaScript
querystring.parse('data=%26a%3D1%26b%3D1%26c%3D1&foo=bar&abc=xyz&abc=123')
// returns { data: '&a=1&b=1&c=1', foo: 'bar', abc: [ 'xyz', '123' ] }

querystring.parse('data=%26a%3D1%26b%3D1%26c%3D1&foo=bar&abc=xyz&abc=123', null, null, {maxKeys:2})
// returns { data: '&a=1&b=1&c=1', foo: 'bar' }
```
通过 `querystring.parse()` 返回的对象，不是 JavaScript 原型 `Object` 的扩展，所以原型 `Object` 一些相关的方法无法使用，如`obj.toString()`，`obj.hasOwnProperty()` 等

```JavaScript
querystring.parse('foo=bar&abc=xyz').toString()    // 报错
{a: 1, b: 2}.toString()    // 不会报错
```

同样，这个方法的字符编码也是 UTF-8，如果想用其他的编码方式，可以参照下面的代码：

```JavaScript
// 假设 gbkDecodeURIComponent 方法已存在
querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
  { decodeURIComponent: gbkDecodeURIComponent })
```

本文档是根据 Node.js 目前稳定版本的文档`Node.js v6.10.0 Documentation`进行总结的，如您在阅读的过程中发现问题，请联系作者，最后感谢您的支持！
