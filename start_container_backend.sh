# Data Baes
# 3/1/2025 
# Shell script for starting docker containers for backend
# NOTE: need Docker daemon running, can be done by having Docker Desktop app running

#!/bin/bash

export BACKEND_USES_DOCKER=1    # true

DEBUG_MODE=0
DEBUG_MODE="$1"
export DEBUG_MODE

echo STARTING BACKEND
docker build -t backend ./server

# note: first 3000 is port on host machine (maybe macbook or windows), second 3000 is virtual port on Docker container, they map to each other
# 5432 is for postgresql port
docker run -e BACKEND_USES_DOCKER=1 -e DEBUG_MODE -it --rm -p 3000:3000 backend    

# docker run --add-host=host.docker.internal:host-gateway -it --rm -p 3000:3000 -p 5432:5432 backend    
