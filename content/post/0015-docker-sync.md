+++
date = "2018-11-26"
title = "Docker Sync - Agence Ecommerce Magento Grand Compte LUMAO"
h1 = "Docker Sync"
draft = false
slug = "docker-sync"
+++

Eviter facilement les problèmes de synchronisation de fichiers sur Windows/Mac.

## Docker Sync

http://docker-sync.io/

__docker-sync.yml__
```
version: '2'
options:
  compose-dev-file-path: 'docker-compose.yml'
  verbose: true
syncs:
  poc-magento2-sync:
    src: ./
    sync_userid: '33'
    sync_excludes: [
      '.idea',
      '.buildpath',
      '.project',
      '.settings',
      '.DS_Store',
      '.gitlab-ci.yml',
      'generated',
      'setup',
      'vendor',
      'var'
    ]
    watch_excludes: [
      '.idea',
      '.buildpath',
      '.project',
      '.settings',
      '.DS_Store',
      '.gitlab-ci.yml',
      'generated',
      'setup',
      'vendor',
      'var'
    ]
```

```
docker-sync start
```
__docker-compose.yml__
```
version: "2"
services:
  php:
    image: lavoweb/php-7.0:xdebug
    expose:
    - 80
    volumes:
    - app_sync:/var/www/html

volumes:
  app_sync:
    external:
      name: poc-magento2-sync

```

```
docker-compose up -d
```
