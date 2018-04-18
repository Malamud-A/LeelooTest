/* eslint-disable prefer-template*/
const webpack = require('webpack');

const webpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    './client.js',
      'webpack/hot/only-dev-server'
  ],
  output: {
    path: __dirname + '/build/js',
    publicPath: '/build/js',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(|js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          require.resolve('babel-loader'),
        ],
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.woff$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  node: {
    setImmediate: false,
    console: true,
    fs: 'empty',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devtool: 'sourcemap',
};

module.exports = webpackConfig;