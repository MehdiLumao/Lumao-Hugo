+++
date = "2013-02-06T11:07:14+01:00"
title = "Reverse proxy automatique pour Docker"
draft = false

+++
Dans cet article, on va voir comment faire un reverse proxy qui détecte l'ajout d'un site,
génère un certificat SSL SAN pour les noms associés sans aucune action de notre part :)

## Docker-compose
Pour avoir un exemple plus parlant, on partira sur un site WordPress, créé avec *docker-compose*.

## Træfɪk
L'outil magique qui nous servira de reverse proxy.

## Structure 
````
.
|-- acme
|   `-- acme.json
|-- compose
|   `-- soins-naturels.net
|       |-- data
|       |   |-- mysql
|       |   `-- wp-content
|       `-- docker-compose.yml
`-- docker-compose.yml
````

### Acme
C'est le doux nom pour [Let’s Encrypt](https://letsencrypt.org/), vous aurez la liste de vos domaines ainsi que les clés associés dans le fichier json.
 
### Compose
Contient tous les sites, le _docker-compose_ ainsi que les données du site : la base de donnée ainsi que les fichiers.

### docker-compose.yml
La configuration du reverse proxy.

## Configuration

### Network
On va créer un network pour avoir chaque configuration dans son propre dossier et ne pas tout mélanger.
````
docker network create web
````

### Træfɪk
_./docker-compose.yml_
````
version: "2"
services:
  traefik:
    image: traefik:v1.1.2-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /dev/null:/traefik.toml
      - ./ssl:/etc/traefik/ssl
      - ./acme:/etc/traefik/acme
    command: --web -c /dev/null  --docker --logLevel=INFO --docker.watch --acme --acme.OnHostRule=true --acme.storage=/etc/traefik/acme/acme.json --acme.email=aurelien@lavoweb.net --acme.entryPoint=https --entryPoints='Name:http Address::80' --entryPoints='Name:https Address::443 TLS' --defaultentrypoints=http,https --acme.domains="unstickers.com"
    restart: always
    environment:
      - "affinity:container!=traefik*"
    networks:
      - web
networks:
  web:
    external:
      name: web
````
Træfɪk est mappé avec les ports _80/443_ de l'host.

Il est lancé en mode _docker_ avec rechargement automatique de la configuration à chaque changement d'état des containeurs.

On active la génération des certificats SSLs et la génération se fera directement depuis la configuration des clients.
L'email associé pour les relances est le miens.

### WordPress
_./compose/soins-naturels.net/docker-compose.yml_
````
version: "2"
services:
  soinsnaturels:
    image: wordpress
    expose: 
     - 80
     - 443
    volumes:
     - ./data/wp-content/:/var/www/html/wp-content
    labels:
     - "traefik.port=80"
     - "traefik.backend=soinsnaturels"
     - "traefik.frontend.rule=Host:soins-naturels.net,www.soins-naturels.net,dev.soins-naturels.net"
     - "traefik.docker.network=web"
    environment:
     - WORDPRESS_DB_PASSWORD=*******
     - WORDPRESS_DB_HOST=*******
    networks:
     - web
     - internal
    links:
     - mysql
    depends_on:
     - mysql
    restart: always
  mysql:
    image: mysql:5.7
    volumes:
     - ./data/mysql/:/var/lib/mysql
    environment:
     - MYSQL_ROOT_PASSWORD=*******
     - MYSQL_DATABASE=*******
    networks:
     - internal
    restart: always
networks:
  web:
    external:
      name: web
  internal:
    driver: bridge
````

On expose les ports 80 et 443 du container.

*traefik.port=80*
Træfɪk route le trafic sur le port _80_.

*traefik.backend=soinsnaturels*
Træfɪk utilise le backend _soinsnaturels_, on prendra soin d'avoir un backend unique pour chaque site.

*traefik.frontend.rule=Host:soins-naturels.net,www.soins-naturels.net,dev.soins-naturels.net*
On déclare les noms de domaines qu'on utilisera. Un certificat SSL SAN sera généré content tous ces domaines.

*traefik.docker.network=web*
Træfɪk utilise le network _web_ pour communiquer avec ce container.

## Merci
Des articles qui m'ont bien aidé à mettre en place cette configuration :

https://techan.fr/traefik-et-docker-le-couple-ultime/
https://blog.osones.com/traefik-un-reverse-proxy-pour-vos-conteneurs.html
https://github.com/mikeifomin