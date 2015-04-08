# postcss-log-warnings [![Build Status](https://travis-ci.org/davidtheclark/postcss-log-warnings.svg?branch=master)](https://travis-ci.org/davidtheclark/postcss-log-warnings)

Log PostCSS warnings in the console.

## Purpose

As of PostCSS 4.1, a single PostCSS process can accumulate warnings from all of the plugins it uses.
Presumably, plugin authors want you to see those warnings.
So this plugin exists to read the accumulated warnings (or warnings from only the plugins you've specified), format them for human legibility, and print them to the console.

## Example Output

Something like this (using fake plugins) ...

```
test/forVisual.css
2:3   [reject-colors] no colors allowed
6:1	  [reject-colors] no colors allowed
7:6   [reject-backgrounds] no backgrounds allowed
```

... except that the plugin uses [chalk](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB4QFjAA&url=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fchalk&ei=O3QkVZ6QNoa4sAXjo4HgCQ&usg=AFQjCNFsl0WVrLJkcmEivcr4eAsYYAsdrw&bvm=bv.90237346,d.eXY) for helpful coloring & formatting in the console output.

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
