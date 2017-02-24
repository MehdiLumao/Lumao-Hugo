+++
date = "2017-02-24T14:03:14+01:00"
title = "PHPUnit QuickStart"
draft = false

+++

# PHPUnit
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