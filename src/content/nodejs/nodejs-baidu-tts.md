---
layout: post
title: Node.js 结合百度 TTS 接口实现文字转语音功能
image: ../img/node-js.png
author: 曹某某
date: 2017-07-18 14:22:58
tags: 
  - Node.js
---

今天工作的时候偶然发现了百度的 TTS Restful 接口（TTS 是 TextToSpeech，说白了就是文本转语音的功能）
该接口如下，浏览器中可以直接访问：[http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=你要转换的文字](http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=你要转换的文字)
今天突发奇想，要用 Node.js 写一些表白撩妹的话，通过百度的接口转换成语音，并把该语音保存到电脑里。那如何访问该接口呢？下面是我们的主角登场：`http` 模块，首先，引入我们需要的模块：

```javascript
var http = require('http');        // 通过http模块访问百度的接口
var querystring = require('querystring');    // 处理请求参数的querystring模块
var fs = require('fs');      // fs模块，用来保存语音文件
var path = require('path');    // path模块，处理路径
```

然后准备 `http` 请求的一些参数：

```javascript
var postData = querystring.stringify({
  "lan": "zh",    // zh表示中文
  "ie": "UTF-8",  // 字符编码
  "spd": 2,       // 表示朗读的语速，9代表最快，1是最慢（撩妹请用2，绕口令请用9）
  "text": "小花，我爱你！"   // 这句话就是要转换为语音的，可以表白一下，XXX我爱你
});

var options = {
  "method": "GET",
  "hostname": "tts.baidu.com",
  "path": "/text2audio?" + postData
};
```

准备好后开始利用 `http` 模块进行请求：

```javascript
// 调用http模块的request方法请求百度接口
var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);   // 获取到的音频文件数据暂存到chunks里面
  });

  res.on("end", function () {
    // 这里用到了Buffer模块，大概意思就是把获取到的语音文件流存入到body里面，body是一个Buffer
    var body = Buffer.concat(chunks);
    // 生成的mp3文件存储的路径，文件名叫做iloveu.mp3
    var filePath = path.normalize('./iloveu.mp3');
    // fs模块写文件    
    fs.writeFileSync(filePath, body);
  });

});

req.end();
```

OK，有关注释已经说的很明白了，一切准备就绪，把以上代码放到桌面新建文件 *main.js* 中并运行，运行程序后发现，作者的桌面上出现了 *iloveu.mp3* ，运行一下，甜美的声音就会粗来啦！！

大家可以把喜欢的话写进去，然后运行测试一下哦！最后，请原谅我污了一把，贱贱地用这个功能来听绕口令，请设置 spd 等于 9（最快语速），然后文本设置成下面的最污绕口令，试试你和机器谁读的好哦！

>钓鱼要到岛上钓，不到岛上钓不到。
钓鱼要到岛上钓，不到岛上钓不到。
红公鸡尾巴灰，灰公鸡尾巴红。
红公鸡尾巴灰，灰公鸡尾巴红。
糍粑鸡蛋我也吃，鸡蛋糍粑我也吃。
糍粑鸡蛋我也吃，鸡蛋糍粑我也吃。

本文是根据 Node.js 目前稳定版本的文档 Node.js v4.4.4 Documentation 进行总结的，如您在阅读的过程中发现问题，请联系作者，最后感谢您的支持！
