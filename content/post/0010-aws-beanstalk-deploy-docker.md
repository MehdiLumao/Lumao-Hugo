+++
date = "2018-02-22T11:11:14+01:00"
title = "Elastic Beanstalk déployer containeur Docker"
description = "Comment déployer vos containers Docker pour votre site Magento ? Retrouvez la Réponse Détaillée avec Lumao, Agence Experte Magento"
draft = false
slug = "aws-docker-deploy"
+++
On a vu comment [déployer automatiquement du code quand on push sur une branche](https://lumao.eu/post/gitlab-aws/).
Maintenant, il est temps de customiser le déploiement pour mettre nos containeurs.

<h2 class="post-title">Configuration Beanstalk (EB)</h2>
Pas grand chose à faire, si vous avez ceci dans votre tableau de bord, c'est bon :

![AWS EB Docker](/images/10/beanstalk.png)

<h2 class="post-title">Dockerfile</h2>
Au déploiement, EB va lire les fichiers **Dockerfile** et **Dockerrun.aws.json**,
on va rester sur le premier vu qu'on connait déjà.

Dans le principe, EB va éxecuter le containeur et le publier une fois qu'il aura fini.

Il faut donc penser à ajouter les sources. Sinon rien de fou :

**Dockerfile**
```
FROM lavoweb/php-7.0

COPY . /var/www/html/
RUN sed -ie s#/var/www/html#/var/www/html/public#g /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
```
On prend l'image **lavoweb/php-7.0**, on copie notre code dans le répertoire **/var/www/html/**
On remplace le vhost pour qu'il écoute sur le dossier **public**
Et c'est tout.

A chaque push, on prendra la dernière version du containeur, ou mieux, celle qu'on tag dans notre Dockerfile
avec la dernière version du code (de la branche en cours).
