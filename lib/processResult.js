'use strict';

var chalk = require('chalk');
var path = require('path');

module.exports = function(postcssResult, cb, opts) {
  opts = opts || {};
  opts.plugins = opts.plugins || [];

  var warnings = postcssResult.warnings();

  if (!warnings.length) {
    cb();
    return;
  }

  var output = '\n';

  output += chalk.red.underline(logFrom(postcssResult.root.source.input.from)) + '\n';

  var filteredWarnings = warnings.filter(shouldLog);
  filteredWarnings.forEach(function(w) {
    output += warningToString(w) + '\n';
  });

  cb(output);

  function shouldLog(warning) {
    if (opts.plugins.length && opts.plugins.indexOf(warning.plugin) === -1) {
      return false;
    }
    return true;
  }

  function warningToString(warning) {
    var str = '';
    if (warning.node) {
      str += chalk.bold(
        warning.node.source.start.line + ':' +
        warning.node.source.start.column + '\t'
      );
    }
    if (opts.plugins.length !== 1) {
      str += chalk.yellow('[' + warning.plugin + '] ');
    }
    str += warning.text;
    return str;
  }

  function logFrom(f) {
    if (f.charAt(0) === '<') return f;
    return path.relative(process.cwd(), f);
  }
};
