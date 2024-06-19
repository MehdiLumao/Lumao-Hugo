+++
date = "2017-02-24T14:03:14+01:00"
title = "PHPUnit QuickStart - Agence Ecommerce Magento TPE PME LUMAO"
h1 = "PHPUnit QuickStart"
description = "Découvrez des informations sur PHPUnit QuickStart, pour la solution de boutique en ligne Magento. Rendez-vous sur le site Lumao, Agence Experte Magento"
draft = false

+++

## Installation
````
composer require phpunit/phpunit
````

## Lancement
### Tout
````
php vendor/phpunit/phpunit/phpunit
````

### Un groupe
````
php vendor/phpunit/phpunit/phpunit --group critical
````

### Un fichier
````
php vendor/phpunit/phpunit/phpunit app/code/community/Namespace/Module/Test/Model/Cms/CustomerTest.php
````

### Une méthode
````
php vendor/phpunit/phpunit/phpunit --filter getGroupIdFromRole app/code/community/Namespace/Module/Test/Model/Cms/CustomerTest.php
````
