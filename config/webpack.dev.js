var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackHotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=12000&reload=true';
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
   devtool: 'cheap-module-eval-source-map',

   entry: {
      'polyfills': ['./client/polyfill.ts', webpackHotMiddlewareScript],
      'vendor': ['./client/vendor.ts', webpackHotMiddlewareScript],
      'app': ['./client/main.ts', webpackHotMiddlewareScript],
      'style': ['./client/styles.scss', webpackHotMiddlewareScript]
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
      new webpack.NamedModulesPlugin(),
      //new ExtractTextPlugin('[name].css'),
      new webpack.optimize.CommonsChunkPlugin({name: ['styles', 'app', 'vendor', 'polyfills']})
   ]
});
