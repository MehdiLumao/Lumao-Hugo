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
C'est le doux nom pour [Let’s Encrypt](https://letsencrypt.org/), vous aurez la liste de vos domaines ainsi que les clés associés dedans.
 
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
  mysql:
    image: mysql:5.7
    volumes:
     - ./data/mysql/:/var/lib/mysql
    environment:
     - MYSQL_ROOT_PASSWORD=*******
     - MYSQL_DATABASE=*******
    networks:
     - internal
networks:
  web:
    external:
      name: web
  internal:
    driver: bridge
````

