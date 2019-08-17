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

#### 回滚文件到指定版本
在我们使用git时，可能会遇到这种问题：一次提交了多个文件，但是提交后发现有一个文件不应该提交，这时应该怎么办呢？如果把这次提交的commit回滚是不可行的，因为正确提交的文件也会被回滚，这时我们就需要回滚一部分文件，下面介绍回滚部分文件到指定版本的教程

<img src="https://i.loli.net/2019/08/17/2EGus7d9PTyekQS.png" alt="git log hash">

比如我们要回滚 _main.js_ 文件

- `git log main.js` 首先要找到要回滚的版本的 hash 值，图中hash值是 `2d1ed0e066fd9fde6aef913c102fd808e86161fa`
- `git checkout 2d1ed0 main.js` 利用 hash 回滚特定文件，注意，这里为了方便操作，使用前六位 hash 就可以
- `git commit -m '回滚main.js'` 回滚后需要提交

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

#### Git 错误：git filename too long

解决方案：`git config --global core.longpaths true`

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

<img src="https://i.loli.net/2019/08/17/m2bRMdWr378VigB.png" style="width:100%" alt="git clean">

以上介绍的是个人最常用到的 `git clean` 方法，如果您想详细的了解该命令，请参考 [Git git-clean 文档](https://www.git-scm.com/docs/git-clean)

---

#### 常用命令
* 如果您的 commit 很多，你想查找固定提交信息（比如：你好）的 commit，可以使用 `git log --grep=你好`
* 有的时候在本地无法及时更新远程分支，可以使用 `git remote update origin --prune`
* 查看缓冲区文件改动 `git diff app.js`
* 修改最近一次 commit 的描述信息 `git commit --amend`
* 删除远程分支（比如：test）`git push origin :test`
* clone 的时候默认克隆的是 master 分支，如果想克隆其他分支（比如：dev），可以使用 `git clone -b dev [地址]`
* clone 的时候如果想改文件夹的名字（比如改成：loli），可以使用 `git clone [地址] loli`
* 如果想根据现有的分支（比如：dev）创建一个新的远程分支（比如：dev-test），可以使用 `git push origin dev:dev-test`，然后把这个分支拉到本地使用 `git checkout -b dev-test origin/dev-test`

--- 

#### 总结
以上就是作者在工作中经常用到的一些命令，其实上面的种种不需要死记硬背，只要理解了 Git 的工作流原理，很多命令可以理解性地去记忆，你会发现这些东西其实都是很 easy 的，加油，共勉！
