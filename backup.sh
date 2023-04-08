#!/bin/bash

cd ~

mkdir -p backups

cd backups

docker exec -t cosmic_strains pg_dumpall -c -U admin > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql

echo Postgresql DB backup completed