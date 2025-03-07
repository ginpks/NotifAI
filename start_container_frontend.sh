# Data Baes
# 3/1/2025 
# Shell script for starting docker containers for frontend
# NOTE: need Docker daemon running, can be done by having Docker Desktop app running

DEBUG_MODE=0
DEBUG_MODE="$1"
export DEBUG_MODE

echo STARTING FRONTEND
docker build -t frontend ./client
# docker run -it --rm backend
docker run -e BACKEND_USES_DOCKER=1 -e DEBUG_MODE -it --rm -p 9500:9500 frontend    # note: first 9500 is port on host machine (maybe macbook or windows), second 9500 is virtual port on Docker container, they map to each other