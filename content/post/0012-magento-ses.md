+++
date = "2018-02-22T11:11:14+01:00"
title = "Envoyer des mails via Amazon SES sur Magento 2"
description = "Vous aussi vous cherchez comment envoyer des mails via Amazon SES sur le CMS Magento 2. Nous pouvons vous aider très rapidement."
draft = false
slug = "magento-ses"
+++
Comment envoyer des e-mails via Amazon **S**imple **E**mail **S**ervice pour un site sous Magento 2 ?

Il y a 3 étapes :

- Configurer le compte Amazon

- Changer les DNS

- Valider les e-mails

- Installer/Configurer une extension Magento

<h2 class="post-title">Amazon</h2>

Pour une fois, on ne peut pas utiliser le service depuis beaucoup de zones, en Europe
ce sera l'Irlande (eu-west-1 pour les intimes).

<h3 class="post-title">Ajouter un domaine</h3>

Il faut d'abord autoriser le domaine à envoyer les mails, ça se passe depuis la console.


<h4 class="post-title">Verify a New Domain</h4>

![AWS SES Ajouter un domaine](/images/12/ses-1.png)

![AWS SES Afficher les enregistrements DNS à ajouter](/images/12/ses-2.png)

Ajouter un domaine pour pouvoir le valider.

<h4 class="post-title">Email Addresses</h4>

![AWS SES Ajouter un e-mail](/images/12/ses-3.png)

Pour pouvoir envoyer des e-mails depuis cette adresse. 

Si c'est votre premier domaine, il faudra également faire un ticket pour lever les limites.

<h4 class="post-title">SMTP Settings</h4>

**Create My SMTP Credentials** et on garde ça bien au chaud.

![Gandi valider mail](/images/12/mail-1.png)

Il faut bien penser à valider le mail sous 24h.

<h2 class="post-title">DNS</h2>

![Cloudflare DNS](/images/12/cf_1.png)

Ici c'est via cloudflare, ça marche chez les autres également.

<h2 class="post-title">Magento 2</h2>
<h3 class="post-title">Installation du module</h3>
```
composer require wyomind/cronscheduler
php bin/magento module:enable Wyomind_CronScheduler
php bin/magento setup:upgrade
```
Et voilà !

<h3 class="post-title">Configuration du module</h3>

Store => Configuration => MagePlaza Extensions => SMTP
![Magento configuration smtp](/images/12/magento-1.png)