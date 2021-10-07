#!/bin/bash

##
## script name: make_auth_config.sh
## author: Luke F. Lawson
## license: MIT
## 
## This script creates a auth_config.json file
## at build time using environment variables.
##

## first delete any existing file

if [[ -f auth_config.json ]] ; then rm auth_config.json ; fi

## then build the file one line at a time:

echo "{" >> auth_config.json
echo "  \"domain\": \"${AUTH_DOMAIN}\"," >> auth_config.json
echo "  \"clientId\": \"${AUTH_CLIENTID}\"," >> auth_config.json
echo "  \"audience\": \"${AUTH_AUDIENCE}\"" >> auth_config.json
echo "}" >> auth_config.json