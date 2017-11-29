const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    inline: true,
    // https: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'index.html',
      chunks: [
        '10dartsSDK',
      ],
    }),
  ],
});
