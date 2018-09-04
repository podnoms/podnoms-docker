sudo rm -rf /opt/containers/nginx/* && \
    sudo mkdir /opt/containers/nginx/templates && \
    sudo chmod 777 /opt/containers/nginx/templates && \
    docker kill $(docker ps -q) && \
    docker system prune -a -f
