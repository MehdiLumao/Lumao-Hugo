+++
date = "2023-07-04"
title = "Tester un playbook ansible sur plusieurs OS"
description = "Tutoriel pour tester un playbook ansible sur plusieurs OS. Un article simple et clair rédigé par l'agence Ecommerce Magento LUMAO."
draft = false
slug = "test-ansible"
+++

On utilise ansible pour provisionner des serveurs et des laptops pour l'équipe.

Plus le temps avance et plus on a des os différents.

En général, la provision se fait en urgence : un pc de dev qui part au sav, besoin d'un serveur suplémentaire pour cause de charde.

Et quasiment à chaque fois, une version majeure de l'OS est sortit et on a parfois des adaptations à faire.

Le but ici sera donc de pouvoir tester notre playbook à chaque commit pour voir ce qui marche et ce qui ne marche pas.

Chez Lumao, on utilise Gitlab CI, voici une configuration pour exemple :

```
build image:
  stage: build
  image: lavoweb/ansible:2
  before_script:
    - ansible-galaxy install -r requirements.yml
  script:
    - ansible-playbook site.yml -i test_inventory -e "my_username=user"
  services:
    - name: lavoweb/ssh:$OS_VERSION
      alias: os
  variables:
    ANSIBLE_HOST_KEY_CHECKING: "False"
  parallel:
    matrix:
      - OS_VERSION: ['ubuntu-18.04', 'ubuntu-20.04', 'ubuntu-22.04', 'ubuntu-22.10', 'ubuntu-23.04']
```

Ansible est dans l'image Docker *lavoweb/ansible*, on installe les prérequis  avec *ansible-galaxy*.

On demande au Runner Gitlab de créer des services, qui seront l'image de l'OS qu'on souhaite tester.

Pour gagner du temps et éviter des erreurs de copier-coller, on va utiliser la fonction *matrix*, elle permets de lancer plusieurs jobs en parallèle  avec une variable.
Ici la variable sera l'OS.

L'affichage est plutôt sympa dans la pipeline :

![gitlab ci pipeline](/images/28/gitlab-ci.png)

Dans notre cas, notre playbook fonctionne à partir de la 22.10.
On essaie  d'avoir les 2 dernières LTS du coup il va falloir travailler un peu.

On aura besoin d'avoir des conditions sur les rôles, voici un ex :

```
when: (ansible_facts['distribution'] == "Ubuntu" and ansible_facts['distribution_major_version'] | int < 23)
```

Ici, on va chercher les versions d'Ubuntu < 23, ce qui va nous donner :

- OK
```
TASK [common : Install old php version] ****************************************
changed: [os]
```
- KO
```
TASK [common : Install old php version] ****************************************
skipping: [os]
```

On peut aussi vérifier des versions exacte comme ceci :

```
when: (ansible_facts['distribution'] == "Ubuntu" and (ansible_facts['distribution_version'] != "22.10" and ansible_facts['distribution_version'] != "23.04"))
```

Lancer une tâche uniquement si on est dans le CI :

```
when: (CI|default(False))
```

Ou à l'inverse, quand on est pas dedans :

```
when: (CI is undefined)
```

Les limitations viendront surtout de Docker si vous faites des actions "Linux capabilities".