var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');

var index = require('./api/index');
var app = express();

// uncomment after placing your favicon in /client
//app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
   src: path.join(__dirname, '../client'),
   dest: path.join(__dirname, '../client'),
   indentedSyntax: true,
   sourceMap: true
}));

(function() {

   // Step 1: Create & configure a webpack compiler
   var webpack = require('webpack');
   var webpackConfig = require('../config/webpack.dev');
   var compiler = webpack(webpackConfig);

   // Step 2: Attach the dev middleware to the compiler & the server
   app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
   }));

   // Step 3: Attach the hot middleware to the compiler & the server
   app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
   }));
})();

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// error handler
app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.send({error : err});
});

module.exports = app;
