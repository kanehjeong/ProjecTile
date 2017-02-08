var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
   devtool: 'inline-source-map',

   entry: {
      'polyfills': ['./client/polyfill.ts'],
      'vendor': ['./client/vendor.ts'],
      'app': ['./client/main.ts'],
      'style': ['./client/styles.scss']
   },

   output: {
      path: __dirname,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
   },

   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin()
   ]
});
