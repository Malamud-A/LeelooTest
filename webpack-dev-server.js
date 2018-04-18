/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

console.log(process.env.NODE_ENV);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // quiet: true,
}).listen(8000, () => {
    console.log('Webpack Dev Server listening on port 8000');
});