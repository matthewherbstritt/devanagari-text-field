
"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       }
    }
});


require(
    ['QUnit', 'util'],
    function(QUnit, util) {

        util.run();

        QUnit.load();
        QUnit.start();
    }
);
