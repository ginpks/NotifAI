# Quick shell script to start frontend app, uses webpack as defined in build and start commands in package.json

export BACKEND_USES_DOCKER=0    # true
echo STARTING BACKEND APPLICATION

DEBUG_MODE=0
DEBUG_MODE="$1"
export DEBUG_MODE

node ./server/server.js
