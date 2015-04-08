# postcss-log-warnings [![Build Status](https://travis-ci.org/davidtheclark/postcss-log-warnings.svg?branch=master)](https://travis-ci.org/davidtheclark/postcss-log-warnings)

Log PostCSS warnings in the console.

## Purpose

As of PostCSS 4.1, a single PostCSS process can accumulate warnings from all of the plugins it uses.
Presumably, plugin authors want you to see those warnings.
So this plugin exists to read the accumulated warnings (or warnings from only the plugins you've specified), format them for human legibility, and print them to the console.

## Example Output

![Example](example.png?raw=true)

## Installation

```
npm install postcss-log-warnings
```

## Usage

Add it to your plugin list *after any plugins whose warnings you want to log*, and pass it an object of options.

For example, using [gulp-postcss](https://github.com/w0rm/gulp-postcss):

```js
gulp.task('css', function() {
  return gulp.src('./src/*.css')
    .pipe(postcss([
      bemLinter(),
      customProperties(),
      calc(),
      rejectAllColors(),
      logWarnings(myOptions) // <------ ding
    ]))
    .pipe(gulp.dest('./dist'));
});
```

### Options

- **plugins** (array of strings, default = [])

  If empty, `logWarnings` will log every warning, regardless of which plugin registered it.
  To limit output, name the plugins whose warnings you would like to see.
  For example, `{ plugins: ['postcss-bem-linter'] }` will only log warnings from the `postcss-bem-linter` plugin.
- **throwError** (boolean, default = `false`)

  If `true`, after `logWarnings` logs your warnings it will exit the process with code 1 if it found any warnings.
