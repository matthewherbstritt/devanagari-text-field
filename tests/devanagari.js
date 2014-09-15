define([
    'intern!object',
    'intern/chai!assert',
    '../src/devanagari'
], function (registerSuite, assert, devanagari) {
  registerSuite({
        name: 'devanagari',

        greet: function () {
            assert.strictEqual(devanagari.test, 0,
                'devanagari.test = 0');

        }
    });
});
