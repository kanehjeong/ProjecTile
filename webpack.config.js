var webpack = require('webpack');
var path = require('path');

module.exports = {
   plugins: [
      // Bug in webpack that causes a warning to occur with latest webpack and angular versions.
      // Below causes bug to disappear but should eventually remove when issue is resolved
      // https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(
         /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
         path.resolve(__dirname, 'NULL'),
         { }
      ),
      new webpack.optimize.UglifyJsPlugin({comments: false})
   ],
   entry: {
      'app.bundle': './client/app.module.js'
   },
   output: {
      //path: './dist',
      path: './client', // use this when starting app from client
      filename: 'app.bundle.js'
   }
};

