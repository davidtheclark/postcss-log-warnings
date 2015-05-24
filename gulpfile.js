'use strict';

var gulp = require('gulp');
var gulpPostcss = require('gulp-postcss');
var gulpPlumber = require('gulp-plumber');
var postcss = require('postcss');
var logWarnings = require('./index.js');

var rejectColors = postcss.plugin('reject-colors', function() {
  return function(css, result) {
    css.eachDecl(function(decl) {
      if (decl.prop === 'color') {
        result.warn('no colors allowed', { node: decl });
      }
    });
  };
});

gulp.task('test', function() {
  gulp.src('./test/forVisual.css')
    .pipe(gulpPlumber())
    .pipe(gulpPostcss([
      rejectColors(),
      logWarnings({ throwError: true })
    ]))
    .pipe(gulp.dest('./tmp'));
});
