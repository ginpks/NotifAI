const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

dotenv.config(); // Load .env file

const frontendPort = process.env.FRONTEND_PORT || "9500";

const pluginList = [];

if(process.env.BACKEND_PORT != undefined){
  pluginList.push("BACKEND_PORT");
}
if(process.env.DEPLOYMENT_MODE != undefined){
  pluginList.push("DEPLOYMENT_MODE");
}
if(process.env.BACKEND_HOST != undefined){
  pluginList.push("BACKEND_HOST");
}

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports = {
  /** "mode"
   * the environment - development, production, none. tells webpack
   * to use its built-in optimizations accordingly. default is production
   */
  mode: "development",
  /** "entry"
   * the entry point
   */
  entry: "./index.js",
  output: {
    /** "path"
     * the folder path of the output file
     */
    path: path.resolve(__dirname, "public"),
    /** "filename"
     * the name of the output file
     */
    filename: "main.js",
  },
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is
   * for browser (client side). Default is "web"
   */
  target: "web",
  devServer: {
    /** "port"
     * port of dev server
     */
    port: frontendPort,
    /** "static"
     * This property tells Webpack what static file it should serve
     */
    static: ["./public"],
    /** "open"
     * opens the browser after server is successfully started
     */
    open: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only".
     * "only" is used if enable Hot Module Replacement without page
     * refresh as a fallback in case of build failures
     */
    hot: true,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
     */
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: [".js", ".jsx", ".json", ".css"],
    fallback: { 'process/browser': require.resolve('process/browser'), }
  },
  module: {
    /** "rules"
     * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
     * file inside of a require()/import statement, use the babel-loader to transform it before you
     * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
     * being searched"
     */

    rules: [
      {
        test: /\.(js|jsx)$/, //kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, //folder to be excluded
        use: "babel-loader", //loader which we are going to use
      },

      {
        test: /\.css$/i, // for loading css files
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.EnvironmentPlugin(pluginList) // adds these environment variables in .env file to process.env for react app
  ]
};
