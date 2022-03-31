#!/usr/bin/env bash
export IMAGE=$1
docker-compose -f docker-compose.yml up --scale app=2  --detach --build
echo "success"