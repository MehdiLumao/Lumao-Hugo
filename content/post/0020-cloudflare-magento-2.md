+++
date = "2019-04-01T16:11:14+01:00"
title = "Récupérer l'adresse IP des visiteurs avec CloudFlare"
description = "Découvrez comment récupérer la véritable adresse IP des visiteurs avec CloudFlare. Rendez-vous sur le Site de l'Agence Lumao"
draft = false
slug = "cloudflare-magento-2"
+++

Si vous utilisez le CDN CloudFlare et que vous souhaitez mettre votre e-commerce en mode maintenance, vous avez surement
remarqué que la liste blanche ne fonctionne plus, c'est normal, CloudFlare est un Reverse Proxy, vous voyez son IP et plus celle du visiteur.

## Comment récupérer la véritable adresse IP des visiteurs avec CloudFlare ?

C'est simple, il suffit de changer l'injection de dépendance pour récupérer le header **HTTP_CF_CONNECTING_IP** au lieu de **REMOTE_ADDR**.

__app/code/Namespace/Module/etc/di.xml__

```
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <!-- Restore original visitor IP from CloudFlare header -->
    <type name="Magento\Framework\HTTP\PhpEnvironment\RemoteAddress">
        <arguments>
            <argument name="alternativeHeaders" xsi:type="array">
                <item name="http_cf_connecting_ip" xsi:type="string">HTTP_CF_CONNECTING_IP</item>
            </argument>
        </arguments>
    </type>
</config>
```