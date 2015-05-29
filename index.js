'use strict';

var postcss = require('postcss');
var chalk = require('chalk');
var processResult = require('./lib/processResult');
var formatBrowser = require('./lib/formatBrowser');

module.exports = postcss.plugin('postcss-log-warnings', function(options) {
  options = options || {};

  return function(css, result) {
    var warningLog = processResult(result, options);

    if (!warningLog) return;

    if (!('console' in options && !options.console)) {
      console.log(warningLog);
    }

    if (options.browser) {
      result.root.append(formatBrowser(warningLog));
    }

    if (options.throwError) {
      throw new Error(chalk.red.bold('\n** postcss-log-warnings: warnings were found **'));
    }
  };
});
