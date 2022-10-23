--- 
date: 2022-05-04 02:19:34
title: 用systemctl配置开机自动启动
toc: true 
layout: post 
--- 
参考 [新建了个vps的监控探针](#root/qXv33XPLsxSs/sjpgMZ0r3KaN)

    cat > /etc/systemd/system/dropbox.service <<EOF
    
    [Unit]
    
    Description=dropbox
    
    After=network-online.target
    
    [Service]
    
    Type=simple
    
    ExecStart=nohup /usr/bin/python3 /root/dropbox.py start &
    
    Restart=on-abort
    
    User=root
    
    [Install]
    
    WantedBy=default.target
    
    EOF
    

    sudo chmod +x /etc/systemd/system/dropbox.service
    systemctl daemon-reload
    systemctl start dropbox.service
    systemctl enable dropbox.service

直接运行python可能无效，改成可执行文件sh测试

    cat > /root/dropboxstart.sh <<EOF
    
    #!/bin/bash
    nohup /usr/bin/python3 /root/dropbox.py start  &
    
    EOF

查看是否存在 cat /etc/rc.local 不存在就新建

存在的话就在

    cat > /etc/rc.local  <<EOF
    #!/bin/sh
    bash /root/ServerStatus.sh &
    #中间这一段就是脚本的内容
    exit 
    EOF

exit前添加 bash /root/dropboxstart.sh &
<!--more-->