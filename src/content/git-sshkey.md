---
layout: post
title: Git教程：设置ssh-key
image: img/git.jpg
author: Ghost
date: 2019-03-14 14:37:07
tags: 
  - Git
---

很多初次使用 Git Bash 的同学都会有这样的烦恼，每次 pull 或者 push 的时候，都需要输入账户密码才可以进行操作（不考虑一些客户端程序），这样的话每次操作都要输入相同的信息，很麻烦，最主要的是心好累！！！所以，今天给大家分享一篇设置 ssh-key 的文章，设置后就可以有效的解决这个问题了。

#### 如果你是第一次使用git，请设置邮箱和用户名

首先打开 _Git Bash_ 或者 _Terminal_，执行以下命令
```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱地址"
```

--- 

#### 生成密钥
```bash
ssh-keygen -t rsa -C "你的邮箱"
```
执行完此命令后按 3 次回车即可，如中途提示你是否 overwrite ，输入 y 即可，然后会在你的 HOME 目录生成两个文件 _id\_rsa_ 和 _id\_rsa.pub_

---

#### 添加密钥
```bash
ssh-add ~/.ssh/id_rsa
```
如果系统提示 `Could not open a connection to your authentication agent`，请依次执行下面两个命令，然后再执行上面的命令：
```bash
ssh-agent
eval `ssh-agent`
```

---

#### GitLab上添加ssh

登录到GitLab（GitHub什么的同理），把 id_rsa.pub 里面的内容添加到 SSH 的 key 中，然后点击 AddKey 
<img src="https://i.loli.net/2019/08/17/27uLMhPCOzFxwp9.jpg" style="width:100%">

--- 

#### 验证


```bash
ssh -T git@192.168.92.3    # 192.168.92.3替换成您的git服务器地址，成功了会显示 "Welcome to xxx, xxx"
```

---

#### 更改项目的config

修改您项目中的 _.git/config_ 文件，如果其中的 url 是 http 协议的，如下图：

![修改前](https://i.loli.net/2019/08/17/FpP6jnI7MXVhULi.png)

则需要改成：

![修改后](https://i.loli.net/2019/08/17/jnNoVXp3DPeTHBA.png)

OK！大功告成了，您可以随意的操作git而不需要输入用户名密码了，是不是很爽！
