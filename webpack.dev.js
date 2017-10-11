const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_URL: JSON.stringify('http://localhost:8888'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: 'index.html',
      chunks: [],
    }),
  ],
});
