'use strict';

var postcss = require('postcss');
var chalk = require('chalk');
var processResult = require('./lib/processResult');

var exitCode = 0;

module.exports = postcss.plugin('postcss-log-warnings', function(options) {
  options = options || {};

  if (options.throwError) {
    exitCode = 1;
  }

  return function(css, result) {
    var warningLog = processResult(result, options);
    if (warningLog) {
      console.log(warningLog);
    }
  };
});

process.on('exit', function() {
  if (!exitCode) return;

  console.log(chalk.red.bold('\n** postcss-log-warnings: warnings were found **'));
  process.exit(exitCode);
});
