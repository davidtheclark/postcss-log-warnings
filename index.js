'use strict';

var postcss = require('postcss');
var chalk = require('chalk');
var processResult = require('./lib/processResult');

var exitCode = 0;

module.exports = postcss.plugin('postcss-log-warnings', function(opts) {
  return function(css, result) {
    var p = new Promise(function(resolve) {
      processResult(result, resolve, opts);
    });
    p.then(function(r) {
      if (r) console.log(r);
      if (opts.throwError) exitCode = 1;
    });
    return p;
  };
});

process.on('exit', function() {
  if (!exitCode) return;

  console.log(chalk.red.bold('\n** PostCSS warnings were logged **'));
  process.exit(exitCode);
});
