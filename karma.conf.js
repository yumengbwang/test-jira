// Karma configuration

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    reporters: ['dots', 'junit'],

    // the default configuration
    junitReporter: {
          outputFile: 'test-results.xml'
    },

    // list of files / patterns to load in the browser
    files: [
      'angular.min.js',
      'ui-bootstrap-tpls-0.12.0.js',
      'angular-mocks.js',
      'controller.js',
      'controllerSpec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR ||
    //                  LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests
    // whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
