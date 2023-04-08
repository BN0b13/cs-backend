#!/bin/bash

cd ..

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

npm run destroy

npm run up

sleep 10

cd ~/backups

cat "$(ls -1rt | tail -n1)" | docker exec -i $PG_CONTAINER_NAME psql -U $PG_USERNAME $PG_DATABASE_NAME

#Prod
cd server/cs-backend

#local
# cd ~/webDev/express/cs-backend

npm start