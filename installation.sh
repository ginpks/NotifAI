# Shell script to install everything needed for both frontend and backend

# install node, check with "node -v", "npm-v"
# note: npm i same as npm install

# Webpack
echo STARTING INSTALLATION WEBPACK
npm i --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin

# CORS
echo STARTING INSTALLATIONS CORS
npm install cors

# Babel
echo STARTING INSTALLATION BABEL
npm i --save-dev babel-loader @babel/preset-env @babel/core @babel/plugin-transform-runtime @babel/preset-react @babel/eslint-parser @babel/runtime @babel/cli

echo STARTING INSTALLATION PATH
npm i path

# Lint
# npm i --save-dev eslint eslint-config-airbnb-base eslint-plugin-jest eslint-config-prettier path

# React
echo STARTING INSTALLATION REACT
npm i react react-dom

# Express
echo STARTING INSTALLATION EXPRESS
npm install express

# pg
echo STARTING INSTALLATION PG
npm install pg

#dotenv environment variables
echo STARTING INSTALLATION DOTENV
npm install dotenv

echo REMOVING DEPRECATED PACKAGES
rm -r node_modules/inflight
rm -r node_modules/glob