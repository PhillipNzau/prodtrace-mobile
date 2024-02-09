# if [ -d "/home/jenkins/prodtrace-frontend" ];
# then
#     rm -r prodtrace-frontend/
#     scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-frontend .
#     #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
# else
#     scp -r jenkins@192.168.1.22:/var/lib/jenkins/workspace/prodtrace-frontend .
#     #git clone http://stve11:xQPoYMpFPYyJWpgmCjnm@192.168.0.207/naiparq/naiparq-backend-pms.git
# fi

CURRENT_FOLDER=~/prodtrace-frontend/deployment/current
DOCKER_COMPOSE=$CURRENT_FOLDER/docker-compose-staging.yml
PREVIOUS_FOLDER=~/prodtrace-admin/deployment/previous

if [ -d "$CURRENT_FOLDER" ]; then
    docker-compose -f $DOCKER_COMPOSE down
    mkdir -p $PREVIOUS_FOLDER
    mv $DOCKER_COMPOSE $PREVIOUS_FOLDER
    docker rmi -f 192.168.1.23:5000/prodtrace_frontend:latest

else
  mkdir -p $CURRENT_FOLDER
fi