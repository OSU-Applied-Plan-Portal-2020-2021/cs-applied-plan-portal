#!/bin/bash
git checkout master
git pull
./install.sh
npm run build
