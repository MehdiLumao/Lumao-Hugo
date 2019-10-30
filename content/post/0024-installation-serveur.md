+++
date = "2019-10-16"
title = "Installation serveur"
description = ""
draft = true
slug = "installation-serveur"
+++

useradd aurelien

apt install htop sudo apt-transport-https  ca-certificates curl gnupg2 software-properties-common libnet-amazon-s3-perl
cpan Net::Amazon::S3::Client
# add aurelien to /etc/sudoers

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

apt update

apt-get install docker-ce docker-ce-cli containerd.io docker-compose

/etc/default/docker

ufw enable

ufw default deny incoming

/etc/ssh/sshd_config
X11Forwarding no
IgnoreRhosts
PasswordAuthentication
ufw allow 22195

port > 22000
mkdir /data/dockercd /data/dockermkdir {acme,compose,ssl}nano docker-compose.ymlversion: "2"services:  traefik:    image: traefik:alpine    ports:      - "80:80"      - "443:443"      - "8080:8080"    volumes:      - /var/run/docker.sock:/var/run/docker.sock      - /dev/null:/traefik.toml      - ./ssl:/etc/traefik/ssl      - ./acme:/etc/traefik/acme    command: --web -c /dev/null  --docker --logLevel=ERROR --docker.watch --api.dashboard=false --acme --acme.OnHostRule=true --acme.storage=/etc/traefik/acme/acme.json --acme.email=contact@lumao.eu --acme.entryPoint=https --entryPoints='Name:http Address::80' --entryPoints='Name:https Address::443 TLS' --defaultentrypoints=http,https --acme.domains="ns3105998.lavoweb.net"    restart: always    environment:      - "affinity:container!=traefik*"    networks:      - webnetworks:  web:    external:      name: web
docker network create webdocker-compose up -d
usermod -aG docker newman-deploy

sysctl -w vm.max_map_count=262144sysctl -w fs.aio-max-nr=2097152
