---
layout: post
title: Git 教程：常用技巧和错误处理
image: img/git.jpg
author: Ghost
date: 2019-03-14 20:21:13
tags: 
  - Git
---

#### Git 简化命令
举个例子，你现在要执行一个命令，命令很长，很难记：
```bash
git log --color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %C(bold blue)<%an>%Creset'
```
通过简化命令我们可以给这个命令起一个别名，例如叫 `git lg`，这样我们每次执行这个命令就相当于执行上面的命令了。简化命令非常简单方便快捷，所以对于我们实际的开发还是有很大的帮助的，下面介绍两种方法实现简化命令。假如我们现在想设置简化命令，把 `git status` 简化成 `git st`，可以直接执行：
```bash
git config --global alias.st status
```
除了上面的方法，我们还可以直接修改配置文件（_~/.gitconfig_）来设置简化命令：
```bash
[alias]
        st = status -s -b
        br = branch -a
        lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset ' --abbrev-commit
```

---

#### Git 错误：fatel:loose object XXX is corrupt 解决办法

错误描述：
```
error: object file .git/objects/9a/83e9c5b3d697d12a2e315e1777ceaf27ea1bab is empty
fatal: loose object 9a83e9c5b3d697d12a2e315e1777ceaf27ea1bab 
(stored in .git/objects/9a/83e9c5b3d697d12a2e315e1777ceaf27ea1bab) is corrupt
```

解决办法：
```bash
# 在出现上述错误的文件夹下执行以下命令
rm -fr .git  
git init  
git remote add origin your-git-remote-url  # your-git-remote-url 是远程 git 仓库的地址
git fetch  
git reset --hard origin/master  
git branch --set-upstream-to=origin/master master   
```

---

#### Git clean

该命令主要是清除 Git 中未跟踪的文件（_untracked files_），比如我们在开发的过程中经常会编译文件，这个时候会生成很多的无用文件，这些文件对于 Git 来说就是未跟踪的，这些无用的文件我们要经常性的清除，或者把他们加入 _.gitignore_ 文件中，下面会介绍一种简单快捷的方式清除这些文件，那就是 `git clean`

```bash
git clean -fd
```

上面就是快速清除全部的未跟踪的文件，`-f` 表示强制删除，`-d` 表示删除文件夹，如果没有它，只会删除文件。有的同学会问了，这个是删除全部的文件，那会不会有一种情况，只删除部分文件，当然可以：

```bash
git clean -fdi # 加上-i参数 --interactive
```
`-i` 表示进入交互界面，在里面可以选择要删除的文件进行删除，可以参考下图的操作，非常简单

![git clean](https://upload-images.jianshu.io/upload_images/3354595-e389a4d6d7768447.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以上介绍的是个人最常用到的 `git clean` 方法，如果您想详细的了解该命令，请参考 [Git git-clean 文档](https://www.git-scm.com/docs/git-clean)
