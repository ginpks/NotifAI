# Quick shell script to start frontend app, uses webpack as defined in build and start commands in package.json

echo STARTING WEB APPLICATION

DEBUG_MODE=0
DEBUG_MODE="$1"
export DEBUG_MODE

npm --prefix ./client run build
npm --prefix ./client run start