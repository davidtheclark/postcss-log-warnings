'use strict';

var test = require('tape');
var processResult = require('../lib/processResult');
var chalk = require('chalk');
var path = require('path');

var mockSimpleResult = {
  warnings: function() {
    return [{
      plugin: 'foo',
      text: 'foo warning'
    }, {
      plugin: 'bar',
      text: 'bar warning'
    }, {
      plugin: 'baz',
      text: 'baz warning'
    }];
  },
  root: {
    source: {
      input: {
        from: '<input css 1>'
      }
    }
  }
};

var simpleOutput = '\n<input css 1>' +
  '\n[foo] foo warning' +
  '\n[bar] bar warning' +
  '\n[baz] baz warning\n';

var simpleOutputNoBar = '\n<input css 1>' +
  '\n[foo] foo warning' +
  '\n[baz] baz warning\n';

test('processResult with simple mock', function(t) {
  t.plan(2);
  processResult(mockSimpleResult, function(r) {
    t.equal(chalk.stripColor(r), simpleOutput, 'basic');
  });
  processResult(mockSimpleResult, function(r) {
    t.equal(chalk.stripColor(r), simpleOutputNoBar, 'excluding bar');
  }, { plugins: ['foo', 'baz']});
});

var mockComplexResult = {
  warnings: function() {
    return [{
      plugin: 'foo',
      text: 'foo warning',
      node: {
        source: {
          start: {
            line: 3,
            column: 5
          }
        }
      }
    }, {
      plugin: 'bar',
      text: 'bar warning',
      node: {
        source: {
          start: {
            line: 1,
            column: 99
          }
        }
      }
    }];
  },
  root: {
    source: {
      input: {
        from: path.resolve(process.cwd(), 'style/rainbows/horses.css')
      }
    }
  }
};

var complexOutput = '\nstyle/rainbows/horses.css' +
  '\n3:5\t[foo] foo warning' +
  '\n1:99\t[bar] bar warning\n';

var complexOutputNoBar = '\nstyle/rainbows/horses.css' +
  '\n3:5\tfoo warning\n';


test('processResult with complex mock', function(t) {
  t.plan(2);
  processResult(mockComplexResult, function(r) {
    t.equal(chalk.stripColor(r), complexOutput, 'basic');
  });
  processResult(mockComplexResult, function(r) {
    t.equal(chalk.stripColor(r), complexOutputNoBar, 'excluding bar');
  }, { plugins: ['foo']});
});
