'use strict';

var test = require('tape');
var formatBrowser = require('../lib/formatBrowser');
var chalk = require('chalk');

var input = [
  '',
  '|',
  '||',
  '" |"',
  '\' |\'',
  '\r',
  chalk.red('foo'),
  ''
].join('\n').replace(/\|/g, '\\');

var escaped = '|||A |||||A |" |||"|A |\' |||\'|A |A |A foo'.replace(/\|/g, '\\');

test('formatBrowser with really tricky input', function(t) {
  t.ok(
    formatBrowser(input).indexOf('content: \'' + escaped + '\'') !== -1,
    'includes escaped content'
  );

  t.end();
});
