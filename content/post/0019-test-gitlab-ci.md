+++
date = "2019-01-07T16:11:14+01:00"
title = "Tester un script Gitlab CI - Agence Boutique Magento LUMAO"
h1 = "Tester un script Gitlab CI"
description = "Comment tester un script de Gitlab CI en local pour un site Magento ? Retrouvez une Réponse Détaillée avec Lumao, Agence Experte Magento"
draft = false
slug = "test-gitlab-ci"
+++

Quand on fait des scripts de déploiement via Gitlab CI, on réussit rarement du premier coup. Pour éviter quelques commits,
c'est intéressant de tester le script de Gitlab CI en local.

Ca vous évitera la review et les moqueries des collègues.

Pour ça, il faut "juste" avoir Docker et Gitlab-Runner sur son pc.

##  Gitlab Runner

C'est ici : https://docs.gitlab.com/runner/install/

gitlab-runner install

gitlab-runner start

gitlab-runner exec docker deploy_preproduction --env SERVER_IP=1.2.3.4 --env SERVER_PASSWORD=password --env SERVER_PORT=22 --env SERVER_USER=deploy
