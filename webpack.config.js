'use strict';

var logWarnings = require('./index.js');
var postcss = require('postcss');

var rejectColors = postcss.plugin('reject-colors', function() {
  return function(css, result) {
    css.eachDecl(function(decl) {
      if (decl.prop === 'color') {
        result.warn('no colors allowed', { node: decl });
      }
    });
  };
});

module.exports = {
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  postcss: [rejectColors(), logWarnings({ throwError: true })],
  entry: './webpack-entry.js',
  output: {
    filename: 'tmp/output.js'
  }
};
