#!/usr/bin/env bash
export IMAGE=$1

docker-compose -f docker-compose-prod.yml down  
docker image rm -f hazem06/ncsc_backend:node-app-release-1.0 
docker-compose -f docker-compose-prod.yml up --scale app=2  --detach 
echo "success"