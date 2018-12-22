#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

git config --global user.email "aurelien@lavoweb.net"
git config --global user.name "Aurélien Lavorel"

git clone https://${GH_REPO}
git clone https://${GH_REPO_CH}
cp -R public/* ${REPO}
hugo --config config.toml,configch.toml
cp -R public/* ${REPO_CH}
cd ${REPO}
git remote
git add -A :/
git commit -a -m "latest via travis"
git push "https://${GH_TOKEN}@${GH_REPO}" master > /dev/null 2>&1
cd ../${REPO_CH}
git remote
git add -A :/
git commit -a -m "latest via travis"
git push "https://${GH_TOKEN}@${GH_REPO_CH}" master > /dev/null 2>&1