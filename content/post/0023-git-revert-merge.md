+++
date = "2019-10-16"
title = "Git revert merge - Consultant Freelance Magento LUMAO"
h1 = "Git revert merge"
description = "Un développeur merge par erreur la branche de préproduction dans sa branche ? Pour résoudre ce souci, découvrez la solution sur le site Lumao "
draft = false
slug = "git-revert-merge"
+++

Parfois, le pire arrive, quelqu'un merge la branche de préproduction dans sa branche. Plutôt que de recréer la branche
et faire du cherry pick en priant pour ne pas se tromper on peut faire plus simple.

Voici l'état de départ :

![Git revert merge](/images/23/git-log.png)

Ici le commit fautif est le **709b89fd**.

Pour l'annuler, c'est simple :

```
git revert -m 1 709b89fd
```

L'historique sera pourrit mais vous aurez les bons fichiers.
