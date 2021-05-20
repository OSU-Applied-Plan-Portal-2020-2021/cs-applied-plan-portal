#!/bin/bash
git checkout master
git pull
npm run stop
./install.sh
npm run build
npm start