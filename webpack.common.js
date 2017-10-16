const path = require('path');

const ENTRY_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    '10dartsSDK': ['whatwg-fetch', path.resolve(ENTRY_PATH, 'index.js')],
    '10dartsServiceWorker': path.resolve(ENTRY_PATH, 'ServiceWorker/sw.js'),
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
