# pigeon

Why is the pigeon so big

http://aksdj4.am0200.com/

## Install

```bash
$ npm i @acyort/pigeon -S
```

## Usage

**Configuration**

more: https://acyort.js.org/docs/configuration/

```yml
# config.yml

# required
template: '@acyort/pigeon'
plugin:
  - '@acyort/pigeon'

# optional
favicon: # website favicon
keyword: # website keyword
description: # website description
title: # website title
perpage: 10 # pagination, default 10
menu: # website menu
  archives: /archives/

source: # markdown content path, default `source`
```

**Writing**

page

```md
---
type: page
title: About
---

page contents ...
```

post

```md
---
title: 中文
date: 2018-02-14
category: chinese
tags:
  - tt
---

我年幼时就非常爱好读书。（因为）家里贫穷，（所以）没有办法买书来阅读，常常向藏书的人家去借，亲自抄录，计算着日期按时送还。冬天非常寒冷，砚台里的墨汁像冰一样坚硬，手指（冻得）不能弯曲伸直，也不敢懈怠。

<!-- more -->

抄完后，便马上跑去还书，不敢稍微超过约定的期限。因此有很多人都愿意把书借给我，于是我能够遍观群书。到了成年以后，我更加仰慕古代圣贤的学说，又担心没有才学渊博
```

**Build**

```bash
$ acyort flow

# width acyort-server
$ acyort server
```
