const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_URL: JSON.stringify('http://localhost:8888'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: [],
    }),
  ],
});
