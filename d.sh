#!/bin/bash

npx prisma migrate deploy
# git pull
git add .
git commit -m 'fueracors'
git push
# Este es un comentario en bash  ./d.sh
 