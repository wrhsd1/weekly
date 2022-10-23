--- 
date: 2022-05-13 01:39:44
title: 注册了一个GPC
toc: true 
layout: post 
--- 
账户 [w\_wenxing@outlook.com](mailto:w_wenxing@outlook.com)

注册时选择了美国，代理也用的美国，地址生成器 国内电话13119126740 wwx 浦发信用卡

    sudo -i 
    echo root:apassword |sudo chpasswd root
    sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
    sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config;
    sudo service sshd restart

一键添加ssh密码登录
<!--more-->