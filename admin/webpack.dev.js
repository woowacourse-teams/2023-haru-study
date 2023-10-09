const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common(), {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
});
