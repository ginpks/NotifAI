# Quick shell script to start frontend app, uses webpack as defined in build and start commands in package.json

echo STARTING WEB APPLICATION

cp .env ./client

npm --prefix ./client run build
npm --prefix ./client run start