#!/bin/bash

#
# This file should be used to prepare and run your WebProxy after set up your .env file
# Source: https://github.com/evertramos/docker-compose-letsencrypt-nginx-proxy-companion
#

# 1. Check if .env file exists
if [ -e .env ]; then
    source .env
else 
    echo "Please set up your .env file before starting your environment."
    exit 1
fi

# 2. Create docker network
docker network create $NETWORK

# 3. Verify if second network is configured
if [ ! -z ${SERVICE_NETWORK+X} ]; then
    docker network create $SERVICE_NETWORK
fi

# 4. Download the latest version of nginx.tmpl
curl https://raw.githubusercontent.com/jwilder/nginx-proxy/master/nginx.tmpl > templates/nginx.tmpl
# cp templates/nginx.tmpl /opt/containers/nginx/templates/
scp templates/nginx.tmpl podnoms.com:$NGINX_FILES_PATH/templates/

# 5. Update local images
docker-compose pull

# 6. Add any special configuration if it's set in .env file

# Check if user set to use Special Conf Files
if [ ! -z ${USE_NGINX_CONF_FILES+X} ] && [ "$USE_NGINX_CONF_FILES" = true ]; then
    echo "Creating custom configuration files"

    scp ./conf.d/* podnoms.com:$NGINX_FILES_PATH/conf.d/

    # If there was any errors inform the user
    if [ $? -ne 0 ]; then
        echo
        echo "#######################################################"
        echo
        echo "There was an error trying to copy the nginx conf files."
        echo "The webproxy will still work, your custom configuration"
        echo "will not be loaded."
        echo 
        echo "#######################################################"
    fi
fi 

# 7. Start proxy

# Check if you have multiple network
if [ -z ${SERVICE_NETWORK+X} ]; then
    docker-compose up -d
else
    docker-compose -f docker-compose-multiple-networks.yml up -d
fi

exit 0
