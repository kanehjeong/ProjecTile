module.exports = function (config) {
   var testWebpackConfig = require('./webpack.test');

   var configuration = {

      basePath: '',

      frameworks: ['jasmine'],

      exclude: [],

      client: {
         captureConsole: false
      },

      files: [
         { pattern: './config/karma.entry.js', watched: false }
      ],

      /*proxies: {
         "/assets/": "/base/src/assets/"
      },*/

      preprocessors: {
         './config/karma.entry.js': ['coverage', 'webpack', 'sourcemap']
      },

      webpack: testWebpackConfig,

      webpackMiddleware: {
         noInfo: true,
         stats: {
            chunks: false
         }
      },

      reporters: ['mocha', 'coverage', 'remap-coverage'],

      coverageReporter: {
         type: 'in-memory'
      },

      remapCoverageReporter: {
         'text-summary': null,
         json: './coverage/coverage.json',
         html: './coverage/html'
      },

      port: 9876,

      colors: true,

      logLevel: config.LOG_WARN,

      autoWatch: false,

      browsers: [
         'Chrome'
      ],

      customLaunchers: {
         ChromeTravisCi: {
            base: 'Chrome',
            flags: ['--no-sandbox']
         }
      },

      singleRun: true
   };

   if (process.env.TRAVIS) {
      configuration.browsers = [
         'ChromeTravisCi'
      ];
   }

   config.set(configuration);
};
