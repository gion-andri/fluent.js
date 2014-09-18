/* global it, assert:true, describe, beforeEach */
/* global window, navigator, process */
'use strict';

var assert = require('assert') || window.assert;

if (typeof navigator !== 'undefined') {
  var L10n = navigator.mozL10n._getInternalAPI();
  var Env = L10n.Env;
} else {
  var Env = process.env.L20N_COV ?
    require('../../../build/cov/lib/l20n/env').Env
    : require('../../../lib/l20n/env').Env;
}

describe('Creating Envs', function() {
  var l10n;

  beforeEach(function() {
    l10n = new Env('myapp', {
      version: 2.0,
      locales: {
        'pl': {
          'version': '1.0-1'
        },
        'de': {
          'version': '1.0-1'
        },
        'en-US': {
          'version': '1.0-1'
        }
      },
      default_locale: 'en-US'
    });
  });

  it('correctly sets the default language', function(done) {
    l10n.registered.then(function() {
      assert.strictEqual(l10n.default, 'en-US');
    }).then(done, done);
  });

  it('corectly sets the available languages', function(done) {
    l10n.registered.then(function() {
      assert.deepEqual(l10n.available, ['pl', 'de', 'en-US']);
    }).then(done, done);
  });

});
