'use strict';

var postcss = require('postcss');
var chalk = require('chalk');
var processResult = require('./lib/processResult');

module.exports = postcss.plugin('postcss-log-warnings', function(options) {
  options = options || {};

  return function(css, result) {
    var warningLog = processResult(result, options);

    if (!warningLog) return;

    var callback = options.callback || defaultCallback;
    callback(warningLog, result);

    if (options.throwError) {
      throw new Error(chalk.red.bold('\n** postcss-log-warnings: warnings were found **'));
    }
  };
});

function defaultCallback(warningLog) {
  console.log(warningLog);
}
