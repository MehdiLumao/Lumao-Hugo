#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

git config --global user.email "aurelien@lavoweb.net"
git config --global user.name "Aurélien Lavorel"

git clone https://${GH_REPO}
cp -R public/* ${REPO}
cd ${REPO}
git remote
git add -A :/
git commit -a -m "latest via travis"
git push "https://${GH_TOKEN}@${GH_REPO}" master > /dev/null 2>&1