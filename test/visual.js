'use strict';

var postcss = require('postcss');
var bemLinter = require('postcss-bem-linter');
var logWarnings = require('..');
var fs = require('fs');

var display = process.argv[2] || 'console';

fs.readFile('test/forVisual.css', { encoding: 'utf8' }, function(readErr, data) {
  if (readErr) throw readErr;
  postcss()
    .use(bemLinter())
    .use(logWarnings({
      console: display === 'console',
      browser: display === 'browser',
      throwError: display === 'console'
    }))
    .process(data, { from: 'test/forVisual.css' })
    .then(function(result) {
      fs.writeFile('test/compiled.css', result.css, function(writeErr) {
        if (writeErr) throw writeErr;
        console.log('Now open test/visual.html in a browser!');
      });
    })
    .catch(function(ourErr) {
      console.log(ourErr);
      console.log('There\'s your visual confirmation that it works.');
    });
});
