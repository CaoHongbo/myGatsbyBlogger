---
layout: post
title: Hexo 博客搭建
image: ../img/alex-knight-326705-unsplash.jpg
author: Ghost
date: 2019-07-18 17:34:01
tags: 
  - Hexo
---

今天聊一聊 Hexo 博客的搭建，Hexo 有一个 *_config.yml* 文件，根据这个文件来决定你的页面应该怎么展示，本文先介绍 Hexo 的使用和配置文件，然后再介绍一个主题 Next，最后介绍 travisCI。随便也介绍一下作者在搭建的时候遇到的坑。

#### 准备
工欲善其事必先利其器，请先准备下面清单列表的事项，都很简单，如不会请百度，这里不详述了
- Node.js
- Git
- 注册 Github，并配置 ssh
- 弄一个自己的域名（非必需）

#### 安装 hexo
```
npm install hexo-cli -g # 安装 hexo
hexo init blog
cd blog
npm install # 安装 NPM
hexo server # 预览 localhost:4000
```

#### hexo 常用命令
```
hexo clean # 清除缓存
hexo new xxx # 新建 xxx 文章
hexo generate # 生成静态资源文件，也就是 html js css 等
hexo deploy # 部署
hexo server # 本地启动服务器 预览
hexo new page xxx # 创建新的 xxx page
hexo new post xxx # 创建新的 xxx post
```

#### hexo 各个文件、文件夹说明
- _source_ : 博客源代码
- _themes_ : 主题
- _scaffolds_ : 脚手架、模板
- _public_ : 生成静态资源文件夹
- _package.json_ : Node.js 包管理文件
- *_config.yml* : hexo 配置文件

---

#### Hexo _config.yml
```yml
# 网站的标题，描述，作者，标签等等，so easy
title: Mr.曹某某
subtitle: 这是一个神秘又有趣的地方.
description: 做你的月亮🌙星辰.
keywords: blog 博客 吐槽
author: 小爬子
language: zh-CN
timezone:

# URL
url: http://caohongbo.net # 你的域名
root: / # 如何没有子目录则不需要修改
permalink: :title.html # 设定url 重要 涉及到以后的分享，SEO
permalink_defaults:

# ... 其他配置

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # 首字母大写
external_link: true # 在新的选项卡中打开外链
filename_case: 0
render_drafts: false
post_asset_folder: true # 可以在source文件夹下面创建比如images文件夹，图片可以放在里面，使用的时候就用/images/xxx.png即可
relative_link: false
future: true
highlight: # 代码高亮
  enable: true # true 启用
  line_number: true # 行号
  auto_detect: true # 自动检测语法
  tab_replace:
  
# Home page setting
index_generator:
  path: '' # 默认是''，不需要更改
  per_page: 7 # 分页
  order_by: -date # 时间倒叙
  
# Category & Tag 不需要改
default_category: uncategorized
category_map:
tag_map:

# 时间格式 参考 moment.js
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# 分页
per_page: 15 # 每页15条数据
pagination_dir: page

theme: next # 使用next主题

# 部署到我的博客的git，这里面不需要了，因为以后要配置travis CI
# deploy:
#   type: git
#   repo: https://github.com/CaoHongbo/blog.git
#   branch: master
```

---

#### Next 主题
使用主题可以让我们的博客更美观，更人性化，更多功能，这里作者使用了 Next 主题，安装主题：

```bash
# 安装
git clone https://github.com/theme-next/hexo-theme-next themes/next
# 更新
cd themes/next
git pull
```

#### 配置文件合并
next主题也有一个配置文件在 *themes/next/_config.yml*，安装完主题后启动项目，我们的页面会很漂亮！虽然页面好看了，但是我们有了两个配置文件，以后开发的时候可能这两个文件都要改，很麻烦，如何将两个 *_config.yml* 文件合并成一个，以后只修改这一个配置文件呢？最好的办法就是：把 *themes/next/_config.yml* 文件里面的内容，复制到根目录下的 *_config.yml* 里面的 `theme_config:` 下面，并且**把复制的内容缩进一下**，就像下面这个样子

```yml
# ... ...
# 上面是根目录下的_config.yml代码

  theme_config:
    - 在这里粘贴next主题的_config.yml代码 # 注意，参照theme_config一定要缩进
```

---

#### Travis CI

为什么要用 CI：
- 自动化部署我们的博客，方便快捷，只要 push 了代码即可部署
- 任何时间地点都可以发布我们的博客，不会局限于PC端 hexo+nodejs 的开发环境
- 可以做比如打包，构建，编译，执行脚本，测试等很多的自动化任务
- 不仅我们的博客需要CI，搞IT的应该都学习一下CI，对以后的工作也有帮助，现在大部分公司的发版或多或少的都会使用CI
- 可以帮助开发人员节省时间成本，高效不易出错

首要准备：
1. 要用 [Github](https://github.com/) 账号，新建一个仓库来存放静态资源，注意，这个要跟你的 Hexo 项目区分开
2. [Travis官网](https://www.travis-ci.org) 通过 Github 登录
3. 管理您的项目，也就是您的 Hexo 代码，并配置环境变量

<img src="https://i.loli.net/2019/08/21/FNQ2MSueGrHTqAU.png" style="width:100%" alt="travis 选择项目">
<img src="https://i.loli.net/2019/08/21/RYh4zGoDAUrL8pK.png" style="width:100%" alt="travis 选择项目">

4. 在您的项目下添加 *.travis.yml*

```yml
dist: trusty
sudo: required

addons:
  ssh_known_hosts:
    - github.com
    - git.coding.net
  apt:
    packages:
      - nasm

env:
  global:
    - YOUR_REPO: YOUR_REPO # 注意，这个不是当前项目的地址，这个是存放博客静态文件的项目地址
    - TZ=Asia/Shanghai

language: node_js
node_js: node

branches:
  only:
    - master

git:
  depth: false
  submodules: false

cache:
  apt: true
  directories:
    - node_modules

install: npm install # npm 安装

script:
  - hexo clean
  - hexo g

after_script:
  - git clone https://${USERNAME}:${PASSWORD}@${YOUR_REPO} .deploy_git # GH_REF是最下面配置的仓库地址
  - mv .deploy_git/.git/ ./public/ # 这一步之前的操作是为了保留master分支的提交记录，不然每次git init的话只有1条commit
  - cd ./public
  - git config user.name "名字" #修改name
  - git config user.email "邮箱" #修改email
  - git add .
  - git commit -m "Travis CI Auto Builder at `date +"%Y-%m-%d %H:%M"`" # 提交记录包含时间 跟上面更改时区配合
  - git push "https://${USERNAME}:${PASSWORD}@${YOUR_REPO}" master:master # Travis里面配置用户名和密码

```

#### CI执行
当你的项目push以后，travis会自动执行相关命令

<img src="https://i.loli.net/2019/08/21/X65oL9JKZfOlFiC.png" style="width:100%" alt="自动执行">
<img src="https://i.loli.net/2019/08/21/aM16UT8dW4cE5YR.png" style="width:100%" alt="执行成功">

大功告成！！如果您有不懂的地方，可以查看官方文档，也可以联系我哦！

[Hexo文档](https://hexo.io/docs/index.html)&nbsp;&nbsp;
[Next主题](https://theme-next.org/)
