'use strict';

var test = require('tape');
var processResult = require('../lib/processResult');
var chalk = require('chalk');
var _ = require('lodash');
var path = require('path');

var mockSimpleResult = {
  messages: [{
    type: 'warning',
    plugin: 'foo',
    text: 'foo warning'
  }, {
    type: 'warning',
    plugin: 'bar',
    text: 'bar warning'
  }, {
    type: 'warning',
    plugin: 'baz',
    text: 'baz warning'
  }, {
    type: 'error',
    plugin: 'baz',
    text: 'baz error'
  }],
  root: {
    source: {
      input: {
        from: '<input css 1>'
      }
    }
  }
};

mockSimpleResult.warnings = function() {
  return this.messages.filter(function(m) {
    return m.type === 'warning';
  });
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
  processResult(_.cloneDeep(mockSimpleResult), function(r) {
    t.equal(chalk.stripColor(r), simpleOutput, 'basic');
  });
  processResult(_.cloneDeep(mockSimpleResult), function(r) {
    t.equal(chalk.stripColor(r), simpleOutputNoBar, 'excluding bar');
  }, { plugins: ['foo', 'baz']});
});

test('clearing warnings from result.messages', function(t) {
  t.plan(3);
  var resultA = _.cloneDeep(mockSimpleResult);
  var resultB = _.cloneDeep(mockSimpleResult);

  t.equal(resultA.warnings().length, 3, 'initial length accurate');
  processResult(resultA, function() {
    t.equal(resultA.warnings().length, 0, 'warnings are cleared');
  });
  processResult(resultB, function() {
    t.deepEqual(mockSimpleResult.messages, resultB.messages,
      'keepWarnings option preserves messages exactly');
  }, { keepWarnings: true });
});

var mockComplexResult = {
  messages: [{
    type: 'warning',
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
    type: 'warning',
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
  }, {
    type: 'error',
    plugin: 'baz',
    text: 'baz error'
  }],
  root: {
    source: {
      input: {
        from: path.resolve(process.cwd(), 'style/rainbows/horses.css')
      }
    }
  }
};

mockComplexResult.warnings = function() {
  return this.messages.filter(function(m) {
    return m.type === 'warning';
  });
};

var complexOutput = '\nstyle/rainbows/horses.css' +
  '\n3:5\t[foo] foo warning' +
  '\n1:99\t[bar] bar warning\n';

var complexOutputNoBar = '\nstyle/rainbows/horses.css' +
  '\n3:5\tfoo warning\n';


test('processResult with complex mock', function(t) {
  t.plan(2);
  processResult(_.cloneDeep(mockComplexResult), function(r) {
    t.equal(chalk.stripColor(r), complexOutput, 'basic');
  });
  processResult(_.cloneDeep(mockComplexResult), function(r) {
    t.equal(chalk.stripColor(r), complexOutputNoBar, 'excluding bar');
  }, { plugins: ['foo']});
});
