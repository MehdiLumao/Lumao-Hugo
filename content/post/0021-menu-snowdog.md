+++
date = "2019-04-30T12:11:14+01:00"
title = "Créer un menu riche avec Snowdog Menu"
description = "Découvrez comment créer un menu riche avec le module Magento 2 Snowdog Menu. Rendez-vous sur le Site de l'Agence Magento Lumao"
draft = false
slug = "menu-snowdog"
+++

Tuto rapide expliquant comment utiliser le module de menu Snowdog Menu sous Magento 2

## Front

Le menu est composé de 3 parties :

1) Menu principal, toujours visible, au clic on affiche les parties 2/3.

2) La liste des sous-catégories.

3) Le contenu mis en avant.

3) 1) Bannière promo optionnelle

3) 2) Liste de produits optionnelle


![Affichage front menu](/images/21/1-front.png)

## Back

### Menu

On utilise 3 composants du menu :

- Category : un lien vers une catégorie Magento
- Category child : la liste des enfants, activé, inclus dans le menu d'une catégorie
- Cms Block : intégration d'un block CMS Magento

![Configuration back menu](/images/21/2-menu.png)

### Bannière

On utilise le WYSIWYG pour télécharger une image.

![Configuration de la bannière de promo](/images/21/3-banniere.png)

### Liste de produits

On utilise le widget Magento "Catalog Products List" pour afficher une liste de produits. Le widget s'ouvre au double clic.

![Configuration de la liste de produits mis en avant](/images/21/4-liste-produit.png)

### Règle promo widget

Ici, on utilise les règles de prix paniers pour changer dynamiquement la liste des produits à afficher.

![Règle de l'affichage produit](/images/21/5-configuration-widget.png)