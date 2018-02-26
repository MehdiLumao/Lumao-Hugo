+++
date = "2018-02-22T11:11:14+01:00"
title = "Gitlab CI + AWS"
draft = false
slug = "gitlab-aws"
+++
Aujourd'hui, on va voir comment faire un déploiement automatique (**C**ontinuous **D**eployment, CD pour la suite)
au push sur une branche de Gitlab.

<h2 class="post-title">Alternatives à Gitlab</h2>
Tout d'abord quelques alternatives à Gitlab CI, il y en a beaucoup d'autres.

* Travis CI
* CircleCI
* Jenkins
* Bamboo
* ...

<h2 class="post-title">Alternatives à AWS</h2>
Vous pouvez brancher n'importe quoi comme système de déploiement, du moment que vous arrivez
à lancer le déploiement depuis un containeur Docker.

Vous ne savez pas faire du Docker ? Ce n'est pas grave, il y en a qui travaille pour vous : https://hub.docker.com

Il y a de toute les technos, Capistrano, Ansistrano, Deployer, Chef, Puppet, Ansible, Rsync, SSH...

Il n'y a pas votre techno ? Payez un presta pour vous le faire !

<h2 class="post-title">Projet de test</h2>
Rien de fou pour ça, on va installer un micro-framework : [Lumen](https://lumao.eu/post/developpement-laravel/), voici la [procédure d'installation](https://lumen.laravel.com/docs/5.6#installing-lumen).

```
composer create-project --prefer-dist laravel/lumen blog
cd blog
git init
git remote add origin git@gitlab.com:Lumao/blog.git
git add .
git commit -m "Initial commit"
git push -u origin master
```
Et voilà !

Pourquoi ne pas faire un simple fichier html ? Tout simplement pour faire plusieurs étapes dans notre déploiement.

<h2 class="post-title">Configuration AWS</h2>
La partie la plus complexe, l'interface n'est pas la plus simple à utiliser.

Voici l'url : https://aws.amazon.com/fr/console/

Je pars du principe que vous avez un compte et que vous connaissez un minimum le système.

**Avertissement** : AWS est un service **payant**, les actions à faire coûtent de l'argent, et la facture peut-être lourde. Réfléchissez avant de cliquer et couper les services quand vous n'en avez plus l'utilitée.

On va accéder à chaque service via la recherche.

<h3 class="post-title">S3</h3>
<h4 class="post-title">Créer un compartiment</h4>
On va créer un compartiment avec le nom **lumao-tuto-blog**.
![AWS S3 créer un compartiment](/images/9/s3-1.png)
![AWS S3 définir propriété](/images/9/s3-2.png)
![AWS S3 définir authorisations](/images/9/s3-3.png)
![AWS S3 vérification](/images/9/s3-4.png)
<h4 class="post-title">Ajouter un fichier dans le compartiment S3</h4>
Depuis la liste, on clic sur le nouveau compartiment créé,

On upload un fichier **app.zip**.
![AWS S3 upload fichier zip](/images/9/s3-5.png)
On clic dessus pour voir le détail
![AWS S3 détail fichier uploadé](/images/9/s3-6.png)
On copie-colle le lien, pour moi : **https://s3.eu-west-3.amazonaws.com/lumao-tuto-blog/app.zip**

On le garde dans un coin, on en aura besoin après.

<h3 class="post-title">Elastic Beanstalk</h3>
<h4 class="post-title">Créer un environnement</h4>
![AWS EB créer un environnement](/images/9/eb-1.png)
![AWS EB information de l'environnement](/images/9/eb-2.png)
On charge les sources
![AWS EB changer sources depuis S3](/images/9/eb-3.png)
On clic sur **Créer un environnement**

On attend quelques minutes puis l'environnement est dispo.
![AWS EB tableau de bord environnement](/images/9/eb-4.png)
En haut à droite, on voit l'url, ici : **http://lumao-tuto-blog.tuf69sshns.eu-west-3.elasticbeanstalk.com/**

<h4 class="post-title">IAM</h4>
![AWS IAM ajouter un utilisateur](/images/9/iam-1.png)
Ajouter les droits :

* AmazonS3FullAccess
* AWSElasticBeanstalkFullAccess

Ce n'est pas très sécurisé mais ça ira pour aujourd'hui. Tuto IAM sur Google pour la suite !
![AWS IAM droit utilisateurs](/images/9/iam-2.png)
![AWS IAM récapitulatif création utilisateur](/images/9/iam-3.png)
Vous avez maintenant vos clés d'accès.
![AWS IAM clé secrète](/images/9/iam-4.png)

* ID : **AKIAISWWDEGU67CCU6IQ**
* Password : **PB8OZq5k6aHjXfaaEs+ifr38GzIMFvuBj2k+7t4y**

Il ne faut pas partager ces clés, elles sont très importante. Je les ais bien sur désactivés avant de mettre en ligne ce tuto ;)

<h3 class="post-title">Récapitulatif Amazon</h3>
On a maintenant un environnement élastique, qui déploie un fichier zip quand on lui demande (via un clic sur un bouton ou via l'API).
Le déploiement se fait sur un environnement qui s'adapte tout seul à la charge en cours. Si vous avez "beaucoup" de trafic, au lieu d'avoir un serveur, vous pouvez en avoir 5,
la seule limite est votre portefeuille. Potentiellement sur plusieurs zones géographiques.

<h2 class="post-title">Gitlab CI</h2>
Je vais essayer de résumer quelques fonctions de Gitlab pour le CD.
Une "grosse" partie de l'interface la gestion de cluster Kubernetes, ça ne sera pas pour aujourd'hui.

<h3 class="post-title">Concept généraux</h3>
Une **pipeline** est un groupe de **job** exécutées par **stage** (étapes).
Toutes les tâches d'une étape sont exécutées en parallèle (si possible),
et si elles réussissent toutes, le pipeline passe à l'étape suivante.
Si l'un des **job** échoue, l'étape suivante n'est (habituellement) pas exécutée.

<h3 class="post-title">Pipelines</h3>
Voici ce qu'on va faire :
![CI pipelines](/images/9/pip-1.png)
Sur un projet un peu plus actif :
![CI pipelines](/images/9/pip-2.png)

On voit l'état de la pipeline, qui l'a lancé, sur quel commit et le status de chaque stage.
Il y en a certaines qui ne sont pas passé et si on va dessus, on verra le message d'erreur.

<h3 class="post-title">Jobs</h3>
![CI jobs](/images/9/job-1.png)
On voit le détail de chaque job.

<h3 class="post-title">Schedules</h3>
![CI schedules](/images/9/sch-1.png)
On peut déployer automatique suivant une crontab, ici une fois par semaine la branche master.

<h3 class="post-title">Environments</h3>
Liste des environnements avec url.
![CI environments](/images/9/env-1.png)
On voit la liste des pipelines qui ont été fait, on peut faire un rollback à une ancienne version ou re-deployer la version en cours.
![CI liste pipelines par environment](/images/9/env-2.png)

<h3 class="post-title">Charts</h3>
Je triche, c'est sur un autre projet qui est **légèrement** plus actif :)
![CI charts](/images/9/cha-1.png)

<h3 class="post-title">CI</h3>
La question que tout le monde se pose : comment on fait ça ?
Facile, il suffit d'un fichier...

**.gitlab-ci.yml**
```
stages:
  - build
  - deploy

composer:
  image: lavoweb/php-7.0
  stage: build
  script:
    - curl -s https://getcomposer.org/installer | php
    - php composer.phar install --no-ansi --no-dev --no-interaction --no-progress --no-scripts --optimize-autoloader

## Deployment - Production
deploy_production:
  image: lavoweb/aws-cli
  stage: deploy
#  when: manual
  script:
#    - rm -R .* *.md *.xml test/ composer.* 2>/dev/null
    - zip myapp.zip -r .
    - aws s3 cp ./myapp.zip s3://$AWS_BUCKET
    - aws elasticbeanstalk rebuild-environment --environment-id $ELASTICBEANSTALK_ENVIRONMENT
  environment:
    name: production
    url: https://api.blosshom.com
  only:
  - master

cache:
  untracked: true
  paths:
  - vendor/
```
Et voilà !

On a 2 étapes dans la CI :

* build. On crée tous les fichiers dont on a besoin
* deploy. On déploie sur AWS Beanstalk

La première (build) consiste à faire un **composer install**. On part de l'image docker **lavoweb/php-7.0**,
on télécharge le .phar de composer et on le lance.

La seconde étape (deploy) consiste à zipper les sources, copier le fichier sur S3 et enfin refaire notre environnement Beanstalk.
Pour ça, on utilise l'image docker **lavoweb/aws-cli**.

Comme vous le voyez, on utilise pas la même image, vous vous doûtez bien qu'il ne vas pas garder les fichiers.
Dans la CI, on peut jouer une analyse de code, puis lancer les tests unitaire et enfin lancer le déploiement.
Il faut activer une option pour garder les fichiers, c'est l'instruction **cache**.

Vous avez sûrement remarqué qu'il y a quelques variables dans le script.

Ce sont les accès aux différents services. Il ne faut surtout pas les mettre dans le code, n'importe qui pourrait y avoir accès.

Pour éviter ça, Gitlab dispose d'une gestion des secrets. C'est dans **Settings** => **CI / DI** => **Secret variables**.
![CI settings](/images/9/gse-1.png)
Vous pouvez avoir des configuration différentes par envirronement.

Et le mieux ? C'est que ça marche avec plein de techno, ce site est déployé via Travis CI + Hugo.
