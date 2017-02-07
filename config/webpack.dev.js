var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackHotMiddleScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=12000&reload=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
   devtool: 'cheap-module-eval-source-map',

   entry: {
      'polyfills': ['./client/polyfill.ts', webpackHotMiddleScript],
      'vendor': ['./client/vendor.ts', webpackHotMiddleScript],
      'app': ['./client/main.ts', webpackHotMiddleScript]
   },

   output: {
      path: __dirname,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
   },

   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('[name].css')
   ],

   devServer: {
      historyApiFallback: true,
      stats: 'minimal'
   }
});
