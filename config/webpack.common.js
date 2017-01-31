var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');

module.exports = {
   resolve: {
      extensions: ['.ts', '.js']
   },

   entry: {
      'polyfills': './client/polyfill.ts',
      'vendor': './client/vendor.ts',
      'app': './client/main.ts'
   },

   output: {
      path: './dist',
      filename: 'app.js'
   },

   plugins: [
      // Bug in webpack that causes a warning to occur with latest webpack and angular versions.
      // Below causes bug to disappear but should eventually remove when issue is resolved
      // https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(
         /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
         path.resolve(__dirname, 'NULL'),
         { }
      ),
      new webpack.optimize.UglifyJsPlugin({comments: false}),
      new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
      new HtmlWebpackPlugin({
         template: 'client/index.html'
      })
   ],

   module: {
      rules: [{
         test: /\.ts$/,
         loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      }, {
         test: /\.html$/,
         loader: 'html-loader'
      }, {
         test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
         loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }, {
         test: /\.css$/,
         exclude: helpers.root('client', 'app'),
         loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      }, {
         test: /\.css$/,
         include: helpers.root('client', 'app'),
         loader: 'raw-loader'
      }]
   },

};

