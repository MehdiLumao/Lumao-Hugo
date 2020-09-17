+++
date = "2018-06-22"
title = "Configurer OpenVPN avec Docker"
draft = false
slug = "openvpn-docker"
+++
Un article très court aujourd'hui pour monter un VPN sur un serveur avec docker-compose en quelques minutes.

## Serveur OpenVPN

Très simple, on crée un répertoire *openvpn* et on met le fichier *docker-compose.yml* :

```
openvpn:
  image: 'kylemanna/openvpn'
  volumes:
    - './data:/etc/openvpn'
  ports:
    - "1194:1194/udp"
  cap_add:
    - NET_ADMIN
  restart: always
```

Pour ajouter le support ipv6, il faut malheureusement lancer le containeur en root :

```
  privileged: true
```

On fait la configuration :

```
docker run --name openvpn_openvpn_1 -v /etc/openvpn busybox
docker run --volumes-from openvpn_openvpn_1 --rm kylemanna/openvpn ovpn_genconfig -u udp://VPN.SERVERNAME.COM
docker run --volumes-from openvpn_openvpn_1 --rm -it kylemanna/openvpn ovpn_initpki
```

On crée un utilisateur :
```
docker run --volumes-from openvpn_openvpn_1 --rm -it kylemanna/openvpn easyrsa build-client-full client-bureau nopass
docker run --volumes-from openvpn_openvpn_1 --rm kylemanna/openvpn ovpn_getclient client-bureau > client-bureau.ovpn
```

On télécharge cette clé sur notre client

## Client OpenVPN

On va intégrer le VPN dans les paramètres de réseau pour pouvoir l'activer/désactiver facilement.
```
sudo apt-get install network-manager-openvpn network-manager-openvpn-gnome
```

On va dans les paramètres réseaux et on clic sur le +.

![Ajouter un VPN gnome](/images/14/1-ajouter-vpn.png)

On choisit l'import, on mets le fichier précédemment téléchargé.

![Modifier les informations du VPN gnome](/images/14/2-modifier-information.png)

Activer le VPN gnome

![Activer le VPN gnome](/images/14/3-vpn-desactive.png)

Désactiver le VPN gnome

![Désactiver le VPN gnome](/images/14/4-vpn-active.png)

## Merci

https://memo-linux.com/un-serveur-openvpn-en-moins-de-5-minutes-avec-docker/
