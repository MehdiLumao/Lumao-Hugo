+++
date = "2018-02-22T11:11:14+01:00"
title = "Connexion SFTP avec Docker"
draft = false
slug = "sftp-docker"
+++
Comment accéder au contenu sur vos containeurs Docker ?

Comme sur les autres, via sftp. 

<h2 class="post-title">Pourquoi faire ça</h2>
Dans la logique **DevOps**, on ne va pas utiliser la connexion sftp pour modifier
le code directement en prod, non on a le déploiement automatique et ça sera écrasé.

Par contre, les webmasteurs ont surement besoin de modifier ou d'ajouter régulièrement
des médias au site. Il ne faut pas les versionner, c'est pour cet usecase qu'on va
faire un containeur sftp.

<h2 class="post-title">Docker compose</h2>
__docker-compose.yml__
```
version: "2"
services:
  sftp:
    image: atmoz/sftp
    volumes:
        - ./sftp-users.conf:/etc/sftp-users.conf
        - ./ssh/sshd_config:/etc/ssh/sshd_config
        - ./ssh/ssh_host_ed25519_key:/etc/ssh/ssh_host_ed25519_key
        - ./ssh/ssh_host_rsa_key:/etc/ssh/ssh_host_rsa_key
        - ../example.com/src:/home/example/data
    ports:
        - "2233:22"
    restart: always
```
On utilise l'image **atmoz/sftp**, on va mapper plusieurs fichiers. 
On expose le port **2233** de l'hôte. C'est sur celui-là qu'on se connectera.

__sftp-users.conf__
```
example:example_password:33:33:/data
```
La liste des utilisateurs sous cette forme :
nom utilisateur:mot de passe utilisateur:id_utilisateur (ici apache):groupe utilisateur:répertoire de montage

Quand l'utilisateur se connectera, il verra le répertoire data en premier.
C'est le montage **/home/example/data** dans le __docker-compose.yml__ qui exposera les fichiers.

__ssh/sshd_config__
```
# Secure defaults
# See: https://stribika.github.io/2015/01/04/secure-secure-shell.html
Protocol 2
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key

# Faster connection
# See: https://github.com/atmoz/sftp/issues/11
UseDNS no

# Limited access
PermitRootLogin no
X11Forwarding no
AllowTcpForwarding no

# Force sftp and chroot jail
Subsystem sftp internal-sftp
ForceCommand internal-sftp
ChrootDirectory %h

# Enable this for more logs
#LogLevel VERBOSE
```
C'est dans ce fichier qu'on récupère le nom des clés à mapper.

__ssh/ssh_host_ed25519_key__

SSH Key #1. On la récupère avec cette commande :
```
docker cp sftp_container:/etc/ssh/ssh_host_ed25519_key ssh/ssh_host_ed25519_key
```

__ssh/ssh_host_rsa_key__

SSH Key #2. On la récupère avec cette commande :
```
docker cp sftp_container:/etc/ssh/ssh_host_rsa_key ssh/ssh_host_rsa_key
```