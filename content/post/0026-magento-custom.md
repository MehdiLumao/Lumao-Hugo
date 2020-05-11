+++
date = "2020-05-09"
title = "Magento ou développement sur mesure ?"
description = "Comment choisir entre un CMS et un développement sur mesure"
draft = false
slug = "magento-ou-custom"
+++

Magento est un CMS e-commerce bien connu, il repose lui-même sur pleins de couches open-source, il y a du Zend Framework, du Symfony.

Un développement sur mesure repose en général sur un framework, souvent sur Laravel ou du Symfony.

## Solution

### Magento

Magento a, de base, une liste de fonctionnalité très étendu, voici une partie du [fonctionnel](/ecommerce/cms/magento/fonctionnel/).

Le projet est vieux, la première version est sortie en 2008. Sur la version 2, il y a plus de 100 000 commits, un commit étant une contribution d'un développeur. 
Environ 1500 développeurs ont fait des modifications sur le code. Cette solution est détenue financièrement par Adobe.

Des 10aines de milliers de projets sont en production sous Magento. Tous les projets ont besoin des mêmes fonctionnalités :

- connexion avec un ERP
- connexion avec la logistique
- connexion avec un CRM
- export comptable
- des champs custom sur les clients, commandes

Pour un projet B2B, on veut en plus :

- approuver un compte client
- avoir des rôles
- demander des devis
- calculer les frais de ports après avoir passé la commande

Si vous avez besoin d'une fonctionnalité, il y a de grandes chances que quelqu'un l'ai déjà développer. 
La structure étant très stricte, les modifications à faire sur votre projet seront bien moins coûteuse en temps de développer que du sur-mesure complet.

Magento a un rythme de mise à jour assez soutenu, que ce soit du code ou de l'infrastructure. Cela à un coût mais permets d'avoir un projet toujours sain techniquement.

Cela n'empêche pas d'avoir des projets Magento fortement customisé, on a déjà travaillé sur :

- réseau social
- système de cartographie
- plateforme de customisation de produits avec commande groupé

### Sur mesure

Ici, vous n'avez aucun fonctionnel, uniquement un socle technique. Ce socle permet de créer un site qui réponds exactement à vos besoins.
Cependant, si votre cahier des charges n'est pas assez précis, des décisions de développements pourront être prises ayant un impact fort plus tard dans le projet.

Les mises à jour sont compliquées à appliquer sur ce genre de structure, le budget technique passe souvent en dernier 
et on se retrouve avec des projets qui sont sur des technologies obsolète, on n'arrive plus à recruter des personnes ce
qui force à faire une refonte.

Il peut également y avoir des complications sur l'hébergement, si la solution n'évolue pas, vous ne pourrez pas changer de serveurs ce qui crée des problèmes à horizon de 5 ans.

Si vous avez un fort volume de commande (>10 0000 par heure), le sur mesure est "obligatoire".

De notre côté, on fait du 100% sur mesure uniquement quand on doit faire une interface à une API. Le dernier exemple en 
date est un système de paiement raccordé à du Salesforce, il y avait 5 écrans à faire, aucune logique métier à implémenter,
c'était une meilleure solution que de partir sur un CMS.

## Que choisir ?

Tout dépend de votre budget et de la contrainte temporelle. Si vous avez un gros budget et du temps, le développement sur mesure semble plus adapté à votre cas.
Dans le cas contraire, Magento sera un meilleur choix.

