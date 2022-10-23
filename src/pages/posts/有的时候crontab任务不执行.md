--- 
date: 2022-05-19 14:27:10
title: 有的时候crontab任务不执行
toc: true 
layout: post 
--- 
检查权限，检查环境，有的不能用root运行。

例如jekyll属于ruby程序，不支持用root运行，自动任务就无法执行。此时就在运行之前首先运行环境命令。

例如

`*/5 * * * * /bin/bash /root/.bashrc && /bin/bash  /root/blog/hugo-p/sh/ssn.sh`  
或者

`2 * * * * export PATH=:some/path/:another/path && /bin/bash /home/username/jek.sh`  
或者添加到相应的批处理

测试发现，直接在sh文件头部添加路径 更有效

    #!/bin/bash
    export GEM_HOME="$HOME/gems"
    export PATH="$HOME/gems/bin:$PATH"
<!--more-->