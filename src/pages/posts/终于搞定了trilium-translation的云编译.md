--- 
date: 2022-05-14 00:55:10
title: 终于搞定了trilium-translation的云编译
toc: true 
layout: post 
--- 
云编译成功，自动获取原版最新tag，有更新的话自动编译仓库，汉化作者如果更新仓库也可以直接更新，所用文件都在自己仓库

几个要点是

运行路径

环境变量

bash里面的参数

文件都放到了仓库https://github.com/user1/files.git里面

jq -r 'map(select(.)) | first | .tag\_name' <<< $(curl --silent [https://api.github.com/repos/user1/trilium-translation/releases)](https://api.github.com/repos/user1/trilium-translation/releases))

`改两init.py个地方的requests.get(url, proxies=PROXIES, verify=not USE_PROXY)  为requests.get(url) 可以免除clash` [trilium中文 docker arm镜像](#root/qXv33XPLsxSs/UFHV6mLKp9YF)
<!--more-->