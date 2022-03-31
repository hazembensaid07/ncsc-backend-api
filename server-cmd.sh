#!/usr/bin/env bash
export IMAGE=$1
docker image rm hazem06/ncsc_test:node-app-release-1.0 
docker-compose -f docker-compose.yml down  
docker-compose -f docker-compose.yml up --scale app=2  --detach 
echo "success"