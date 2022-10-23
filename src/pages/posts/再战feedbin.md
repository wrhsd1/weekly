--- 
date: 2022-05-10 14:40:44
title: 再战feedbin
toc: true 
layout: post 
--- 
[AndreasSko/feedbin-docker](https://github.com/AndreasSko/feedbin-docker)

这是宝藏，五个编译第一个旧版的不能用，其他的都可以，略加修改，都支持编译为arm版的

同时提供的docker-compose更加简洁，但是要配合caddy和env [angristan](https://github.com/angristan)/[**feedbin-docker**](https://github.com/angristan/feedbin-docker) 

的更加方便[docker-compose.yml](#AsGdIddbeodD/3ZesXQkjHRKr), [.env](#AsGdIddbeodD/13gFWgpIMbQM), [Caddyfile](#AsGdIddbeodD/olasNNJ5aZqv)

三个版本

development.rb  production.rb   test.rb

注意

caddy的/etc/caddy/Caddyfile

和nginx的/etc/nginx/nginx.conf  

都是文件 不是目录，docker的时候要用文件挂载  可以用官方的docker新建一个，把自动创建的文件复制出来即可

终于搞定！！ [再次尝试feedbin](../07%20-%20%E5%91%A8%E5%85%AD/%E5%86%8D%E6%AC%A1%E5%B0%9D%E8%AF%95feedbin.md)

image: minio/minio  
container\_name: feedbin-minio  
environment:  
 - MINIO\_ACCESS\_KEY  
 - MINIO\_SECRET\_KEY  
volumes:  
 - ./feedbin\_minio/data:/data  
 - ./feedbin\_minio/config:/root/.minio  
command: server --console-address ':9001' /data  
ports:  
   - 127.0.0.1:9000:9000  
   - 127.0.0.1:9001:9001  
restart: unless-stopped

API: http://172.22.0.4:9000  http://127.0.0.1:9000 

    docker run -d \
     -p 9010:9000 \
      -p 9001:9001 \
       --name minio1 \
        -v /root/minio:/data \
         -e "MINIO_ROOT_USER=user" \
         -e "MINIO_ROOT_PASSWORD=aApassword" \
           server /data --console-address ":9001"
           minio/minio
<!--more-->