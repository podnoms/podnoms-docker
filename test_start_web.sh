#!/bin/bash
NAME=test-web
if [ $# -eq 0 ]; then
    echo "Please inform your domain name to test your proxy."
    echo "./test_start_ssl.sh $1"
    exit 1
else
    DOMAIN=$1
fi
source .env
docker run -e VIRTUAL_HOST=$DOMAIN -e LETSENCRYPT_HOST=$DOMAIN --network=$NETWORK --name $NAME podnoms.azurecr.io/podnoms.web

exit 0
