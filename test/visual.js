'use strict';

var postcss = require('postcss');
var logWarnings = require('..');
var fs = require('fs');

var rejectColors = postcss.plugin('reject-colors', function() {
  return function(css, result) {
    css.eachDecl(function(decl) {
      if (decl.prop === 'color') {
        result.warn('no colors allowed', { node: decl });
      }
    });
  };
});

var rejectBackgrounds = postcss.plugin('reject-backgrounds', function() {
  return function(css, result) {
    css.eachDecl(function(decl) {
      if (decl.prop === 'background') {
        result.warn('no backgrounds allowed', { node: decl });
      }
    });
  };
});

fs.readFile('test/forVisual.css', { encoding: 'utf8' }, function(err, data) {
  if (err) throw err;
  postcss()
    .use(rejectColors())
    .use(rejectBackgrounds())
    .use(logWarnings())
    .process(data, { from: 'test/forVisual.css' })
    .then(function() {
      console.log('There\'s your visual confirmation that it works.');
    });
});
