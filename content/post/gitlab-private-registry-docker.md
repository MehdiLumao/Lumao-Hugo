+++
date = "2016-12-30T11:07:14+01:00"
title = "Un registry Docker privé avec GitLab"
draft = false

+++
Aller sur Gitlab.com

Créer un repo privé

Editer le projet :
edition-projet-gitlab.png

Vérifier que l'option "Container Registry" est activé puis sauvegarder le projet.

Vous devriez avoir un nouvel onglet dans le projet : 
gitlab-onglet-registry.png

docker login registry.gitlab.com
docker build -t registry.gitlab.com/amersports/magento .
docker push registry.gitlab.com/amersports/magento

A cette étape, on a une ligne dans notre repo :
registry-prive-gitlab-premier-push.png

docker tag registry.gitlab.com/amersports/magento:latest registry.gitlab.com/amersports/magento:v5.4.1
docker push registry.gitlab.com/amersports/magento

Maintenant on a également un tag :
registry-prive-gitlab-tag.png

On peut donc pull un tag spécifique
docker pull registry.gitlab.com/amersports/magento:v5.4.1
Tous les développeurs d'une équipe auront donc les mêmes paquets installés

Et dans un docker compose :
version: '2'
services:
  php:
    image: registry.gitlab.com/amersports/magento:v5.4.1