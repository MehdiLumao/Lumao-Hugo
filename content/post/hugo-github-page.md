+++
date = "2016-12-24T18:49:14+01:00"
title = "Hugo, GitHub Pages et Travis CI"
draft = false

+++

<h2 class="post-title">Introduction</h2>
### Hugo
[Hugo](https://gohugo.io/) est un générateur de site statique, il est rapide, compatible toute plateforme et est très simple à prendre en main.
Il est fourni avec un serveur intégré et l'extension live-reload, vous pouvez donc écrire un article en MarkDown et voir directement le résultat sans rafraîchir la page.

Faire des sites statiques permets de réduire les coûts d'hébergements et d'enlever le risque de failles applicatives. 

### GitHub Pages
GitHub permet d'héberger gratuitement (en cas pas projet open-source) des documentations ou encore un site web.

On peut même avoir un nom de domaine personnalisé, il suffit de faire un fichier CNAME à la racine du projet et de mettre votre nom de domaine dedans.

Ensuite, il suffit de configurer votre nom de domaine avec ces ips :

> 192.30.252.153

> 192.30.252.154

### Travis CI
Travis CI est un outil d'intégration continue, il est également gratuit pour les projets open-source et est intégrable en un clic avec Github.

<h2 class="post-title">Intérêt</h2>
Avoir un site web versionné, avec gestion de workflow et multi-utilisateur. On a les mêmes fonctionnalités que sous WordPress avec quelques plugins sauf que c'est rapide sans avoir à faire du développement poussé ou installer un module de cache.

C'est le top pour un blog, on peut même gérer les commentaires avec Disqus.

Pour écrire un nouvel article, il suffit de forker un projet sur GitHub, créer une branche et de créer le fichier .md correspondant. Un des administrateurs  du projet pourra faire ses commentaires directement sur la merge request.

<h2 class="post-title">Déploiement automatique</h2>
GitHub Pages gére uniquement les fichiers en html, Hugo génère les fichiers HTML dans un dossier "public", il faut donc avoir 2 repos git pour le projet, un qui contient Hugo et l'autre qui a uniquement le code HTML. Nous allons voir comment faire une synchronisation automatique.

<h2 class="post-title">Principe</h2>
A chaque push sur la branche master de notre repo Hugo, on push le répertoire public sur la branch contenant le code HTML.

C'est ici qu'intervient *Travis CI*.
 
<h2 class="post-title">Étapes</h2>
### Étape #1 : Lier le compte Travis CI à GitHub
Pour cela il suffit de s'enregistrer, aller sur la page *Accounts*, choisir le bon compte (entre le compte personnel et le compte entreprise) et de cliquer sur le repo Hugo. Ex:

![Ajouter un repo GitHub dans Travis CI](/images/hugo-github-page/ajouter-repo-travis-ci.png)

### Étape #2 : Créer un Token GitHub
Pour faire un push automatique. Il faut aller [ici](https://github.com/settings/tokens/new), taper votre mot-de-passe puis donner le droit "repo" :

![Créer un token GitHub pour push automatique](/images/hugo-github-page/creer-token-github.png)

Il faut ensuite copier le token, vous ne pourrez le voir qu'une seule fois.

### Étape #3 : Configurer Travis CI
Il faut maintenant renseigner quelques variables d'environnement au build Travis CI. Il faut d'abord être sur le bon repo puis cliquer sur le lien settings :

![Travis CI lien vers les options](/images/hugo-github-page/travis-ci-lien-options.png)

Voici les variables à renseigner :

>*GH_TOKEN* Token de l'étape #2, il permet de faire un push sans demande de mot de passe. Il faut bien penser à cacher l'affichage de cette variable en laissant l'option à *OFF* pour que n'importe qui ne puisse pas commit dans vos repos ;)

>*GH_REPO* Repositery git du code HTML (avec le .git à la fin). 

>*REPO* Nom du repo, ce qu'il y a entre le dernier / et le .git (Lumao dans mon cas)

![Travis CI configurer variables d'environnements](/images/hugo-github-page/variable-environnement-travis-ci.png)

### Étape #4 : Script de déploiement automatique
Il est disponible ici : https://github.com/LavoWeb/Lumao-Hugo/blob/master/deploy.sh, c'est un mix de celui de plusieurs sites, dont la doc officielle, à une différence près : il fonctionne.

### Étape #5 : Fichier de build
Si vous avez bien suivi, il ne nous manque plus que le fichier de build *.travis.yml*, voici celui que j'utilise :

```
language: go
install: go get github.com/spf13/hugo
script:
  - hugo
  - bash ./deploy.sh
notifications:
    email:
        on_failure: always
branches:
  only:
  - master
```

On installe Hugo, on le lance (il faut bien penser à avoir déclaré son thème dans le fichier de config *config.toml*) puis on lance le script fait plus haut.

En cas de problème, un mail est envoyé.

Et finalement on ne fait le déploiement que sur la branch master pour ne pas publier quelque chose qui serait sur la dev.
