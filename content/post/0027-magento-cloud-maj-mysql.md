+++
date = "2020-10-09"
title = "Comment mettre à jour MySQL sur Magento Cloud ?"
description = "Tutoriel pour mettre à jour MySQL sur Magento Cloud"
draft = false
slug = "magento-cloud-maj-mysql"
+++

Vous venez de changer la version de MySQL dans le fichier de configuration de [Magento Cloud](/ecommerce/hebergement/)
et vous avez une erreur ? Pas de panique, c'est une "fonctionnalité" ;)

En effet, MySQL est lancé dans un containeur, si on change la version, il faut habituellement lancer un `mysql_upgrade`.
Sauf que, bien entendu, on a pas accès au containeur.

Voici l'erreur qu'on a sur la CI :

```
Error: Environment redeployment failed
Please contact support for more information, specifying event ids: 1234
```

Ce qui donne :

```
2020-10-07 13:40:57 0 [ERROR] InnoDB: Upgrade after a crash is not supported. This redo log was created before MariaDB 10.2.2.
```

On va donc reprendre notre conf de base.

.magento/services.yaml

```
mysql:
    type: mysql:10.0
    disk: 9144
```

Déployer de nouveau, se connecter en ssh : `magento-cloud env:ssh -e Staging`

Lancer un dump de la base de données : `php vendor/magento/ece-tools/bin/ece-tools db-dump`
On note bien l'emplacement du fichier généré.

## Modification de la configuration

On va ensuite supprimer la base de données, donc tout perdre, on réfléchit avant de copier-coller.

![diff services](/images/27/diff.png)

.magento.app.yaml

![diff app](/images/27/diff-app.png)

```
relationships:
    database: "mysql:mysql"
    redis: "redis:redis"
    elasticsearch: "elasticsearch:elasticsearch"
```

=>

```
relationships:
    database: "mysqla:mysql"
    redis: "redis:redis"
    elasticsearch: "elasticsearch:elasticsearch"
```

.magento/services.yaml

![diff services](/images/27/diff-services.png)

```
mysql:
    type: mysql:10.0
    disk: 9144
```

=>

```
mysqla:
    type: mysql:10.4
    disk: 9144
```

On push ce qui va supprimer l'ancien containeur et en créer un nouveau.

Une fois que le déploiement est ok, on va en faire un nouveau en remplaçant `mysqla` par `mysql`.

A ce niveau on aura donc une base de données avec la bonne version mais plus de données, il nous suffit donc de remonter le dump :

```
gunzip /tmp/dump-main-1602246283.sql.gz
mysql -u user -h database.internal main < /tmp/dump-main-1602246283.sql
```

Le site est toujours cassé et c'est normal, il faut maintenant lancer un nouveau déploiement (le dernier) :

```
magento-cloud env:red -e Staging
```
