+++
date = "2019-12-23"
title = "Comment brancher le Cloud Magento 2 sur un repo Gitlab ?"
description = ""
draft = false
slug = "adobecloud-gitlab"
+++

Comment brancher le Cloud Magento/Adobe sur un repo Gitlab ?

## Etape 1 : créer un token sur un utilisateur Gitlab

On va sur notre instance Gitlab, Profil => Settings => Access Tokens => Add a personal access token

![créer un token sur un utilisateur Gitlab](/images/25/1-creer-token.png)

Ce qui donne :

![résultat création token gitlab](/images/25/2-affichage-token.png)

## Etape 2 : installer le phar magento-cloud

https://devdocs.magento.com/cloud/before/before-workspace-magento-prereqs.html#cloud-ssh-cli-cli-install

## Etape 3 : faire le lien dans Magento Cloud

Tout est dans la commande **magento-cloud integration:add**, il y a une GUI qui permets de faire la suite. Voici les options que j'ai utilisé :

```
magento-cloud integration:add --type=gitlab --project=1234 --base-url=https://gitlab.com --token=567 --server-project=lavoweb/example.com --build-merge-requests=Y --merge-requests-clone-parent-data=Y --fetch-branches=Y --prune-branches=n
```

Pour connaitre le "project" :

```
magento-cloud
+---------------+-------------------+---------------------------------------------------+
| ID            | Title             | URL                                               |
+---------------+-------------------+---------------------------------------------------+
| 1234          | Lumao        SASU | https://eu-1.magento.cloud/projects/1234          |
+---------------+-------------------+---------------------------------------------------+
```

Le "base-url" correspond à l'url d'installation de votre Gitlab. Celui en SaaS pour moi.

Le "token" correspond à ce qu'on a récupèrer dans l'étape 1.

Le "server-project" correspond au path de votre projet dans Gitlab.

Pour le reste c'est assez clair.

Voici ce qu'on est censé obtenir :

```
Checking webhook configuration on the repository: https://gitlab.com/lavoweb/example.com
  Creating new webhook
  Webhook created successfully
Created integration 89 (type: gitlab)
+----------------------------------+---------------------------------------------------------------------------------------+
| Property                         | Value                                                                                 |
+----------------------------------+---------------------------------------------------------------------------------------+
| id                               | 89                                                                                    |
| type                             | gitlab                                                                                |
| token                            | ******                                                                                |
| base_url                         | https://gitlab.com                                                                    |
| project                          | lavoweb/example.com                                                                   |
| fetch_branches                   | true                                                                                  |
| prune_branches                   | false                                                                                 |
| build_merge_requests             | true                                                                                  |
| merge_requests_clone_parent_data | true                                                                                  |
| hook_url                         | https://eu-1.magento.cloud/api/projects/1234/integrations/89/hook                     |
+----------------------------------+---------------------------------------------------------------------------------------+
```

On garde précieusement le hook_url.

## Etape 4 : Hook

Pour que Gitlab prévienne Magento des changements de code on utilise des hooks, si on a été bon, ils devraient avoir été créés.

Pour vérifier cela, on va sur notre projet dans Gitlab, Settings => Integrations => Project Hooks

![vérification hook gitlab](/images/25/3-hook.png)

## Changer l'access token

Pour mettre à jour le token si besoin voici comment faire :

```
magento-cloud integration:update --token=new-token
```