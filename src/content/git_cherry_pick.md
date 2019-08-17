---
layout: post
title: Git教程：cherry-pick
image: img/cherry-picker.jpg
author: Ghost
date: 2018-07-14 14:37:41
tags: 
  - Git
---

今天给大家介绍一个非常实用的技能 `cherry-pick`：字面翻译就是捡樱桃（吃货们请自重），但在 Git 里，它的功能是把已经存在的 commit 进行挑选，然后重新提交。下面大家可以脑补一下这种情况，本地仓库有3个分支 master、test 和 normal，他们的提交记录如下：

![git commit log](https://i.loli.net/2019/08/17/BbVejr35fZhU4Xs.png)

在 master 的基础上， test 进行了2次提交， normal 进行了1次提交。现在想把 test 的第2次提交（仅仅是第2次提交，不包含第1次提交）和 normal 的第1次提交合并到master分支，直接merge分支是行不通的，这样会把两个分支的全部提交都合并到 master ，用 cherry-pick 即可完美的解决问题，   如果 normal 第一次提交的 SHA-1 值是 9b47dd ， test 第二次提交的值是 dd4e49 ，执行如下命令即可把这两个提交合并到 master 

```bash
git cherry-pick 9b47dd dd4e49
```

如果有冲突，则需要修改冲突文件，然后添加修改文件到暂存区，命令如下：

```bash
git add main.js
```

最后执行

```
git cherry-pick --continue
```

大功告成，此时作者项目的提交记录如下：

![git commit log](https://i.loli.net/2019/08/17/qLTExrg9yS5Qwo2.png)

最后要说明的是：
- 执行完 `git cherry-pick --continue` 后不需要 commit 了，该命令会自动提交
- `git cherry-pick --abort` 可以放弃已有操作
- `git cherry-pick 9b47dd dd4e49` 和 `git cherry-pick dd4e49 9b47dd` 这两个的结果可能会**不一样**，**顺序很重要**
- 重要的事情说三遍：不断地练习、练习、练习
