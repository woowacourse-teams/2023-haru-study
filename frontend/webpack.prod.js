const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common(), {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
  ],
});
