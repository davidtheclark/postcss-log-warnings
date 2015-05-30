'use strict';

var postcss = require('postcss');
var bemLinter = require('postcss-bem-linter');
var logWarnings = require('..');
var fs = require('fs');

fs.readFile('test/forVisual.css', { encoding: 'utf8' }, function(readErr, data) {
  if (readErr) throw readErr;
  postcss()
    .use(bemLinter())
    .use(logWarnings({ throwError: true }))
    .process(data, { from: 'test/forVisual.css' })
    .then(function() {
      console.error('`throwError: true` failed!');
    })
    .catch(function(ourErr) {
      console.log(ourErr);
      console.log('There\'s your visual confirmation that it works.');
    });
});
