--- 
date: 2022-05-04 06:14:26
title: 转移calibre-web到wwxa1并改为rclone同步
toc: true 
layout: post 
--- 
lzj1的服务器运行此程序加dropbox同步有些力不从心，并且原来的镜像作者不在更新。

遂转移到wwxa1上，并改为rclone同步（arm不支持dropbox）

改用**linuxserver/calibre-web镜像**

    docker run -d \
      --name=calibre-web \
      -e PUID=0 \
      -e PGID=0 \
      -e TZ=Asia/Shanghai \
      -p 8083:8083 \
      -v /root/calibre-web/config:/config \
      -v /root/calibre-web/books:/books \
      --restart unless-stopped \
      lscr.io/linuxserver/calibre-web:latest

删掉了官方参数的可选项，修改了权限

用宝塔面板每三天备份一次`/root/calibre-web`，排除了books文件夹

用rclone命令，定时将books文件夹sync到rb的OD中

    rclone sync /root/calibre-web/books rb:bt_backup/books -P

新建一个book.sh的执行文件

    #!/bin/sh
    while true
    do
            pnmon=`ps aux | pgrep rclone | grep -v grep | wc -l`;
            cur_month=$(date +%Y%m%d)
    
            if [ "$pnmon" -lt 2 ]; then
                    sleep 1;
                    echo "no rclone process";
                    rclone sync /root/calibre-web/books rb:bt_backup/books --ignore-errors >> /root/rclone/$cur_month.log 2>&1;     
                    break;
            else
                    echo "process exsits";
                    break;
            fi
    done

添加cron任务 `*/15 * * * *  /bin/bash /root/backup.sh` 

域名hread.ml也转移到了dnspod上，cloudflare对免费域名很不友好

同时关掉了lzj1上的容器和dropbox

缺点是在线转换不支持，因为不支持arm架构，问题不大，自己的设备都是epub的

查询是否有方法跳过转换直接发送

有[issue1359](https://github.com/janeczku/calibre-web/issues/1359)、[issue1054](https://github.com/janeczku/calibre-web/issues/1054)和[issue1252](https://github.com/janeczku/calibre-web/issues/1252)，抽空慢慢研究 

已经搞定 [简单修改，使calibre-web支持多格式发送](%E7%AE%80%E5%8D%95%E4%BF%AE%E6%94%B9%EF%BC%8C%E4%BD%BFcalibre-web%E6%94%AF%E6%8C%81%E5%A4%9A%E6%A0%BC%E5%BC%8F%E5%8F%91%E9%80%81.md)

        if 'EPUB' in format:
            bookformats.append({'format': 'Epub',
                                 'convert': 0,
                                 'text': _('Send %(format)s to Kindle', 
                                           format='Epub')})
<!--more-->