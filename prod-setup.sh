#!/bin/bash
# scp -r /var/lib/jenkins/workspace/prodtrace-frontend jenkins@45.76.214.70:/home/jenkins
rsync -av --exclude=.git /var/lib/jenkins/workspace/prodtrace-frontend jenkins@45.76.214.70:/home/jenkins

CURRENT_FOLDER=~/prodtrace-frontend/deployment/current
DOCKER_COMPOSE=$CURRENT_FOLDER/docker-compose-prod.yml
PREVIOUS_FOLDER=~/prodtrace-frontend/deployment/previous

if [ -d "$CURRENT_FOLDER" ]; then
    docker-compose -f $DOCKER_COMPOSE down
    mkdir -p $PREVIOUS_FOLDER
    mv $DOCKER_COMPOSE $PREVIOUS_FOLDER
    docker rmi -f 45.32.22.181:5000/prodtrace_frontend:latest

else
  mkdir -p $CURRENT_FOLDER
fi
