'use strict';

var fs = require('fs');
var chalk = require('chalk');

var style = fs.readFileSync(require.resolve('./style.css')).toString();

module.exports = function(warningLog) {
  var output = escapeCssStringContents(chalk.stripColor(warningLog.trim()));
  return style.replace('$OUTPUT', output);
};

function escapeCssStringContents(stringContents) {
  return stringContents.split('').map(function(ch) {
    switch (ch) {
      case '\n':
      case '\r':
        return '\\A ';
      case '\\':
      case '\'':
      case '"':
        return '\\' + ch;
      default:
        return ch;
    }
  }).join('');
}
