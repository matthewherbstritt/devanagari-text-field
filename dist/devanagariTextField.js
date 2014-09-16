(function ( root, factory ) {

    if (typeof define === 'function' && define.amd) {

        // AMD
        define([], factory);
    } else {

        // Browser globals
        root.devanagariTextField = factory();
    }

}( this, function () {
/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice,
        main, req;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {},
            nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part;

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; (part = name[i]); i++) {
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var args = [],
            usingExports,
            cjsModule, depName, ret, map, i;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i++) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                    cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("../tools/almond", function(){});

define('util',[], function(){

  return {

    setCaretIndex: function(tf, caretIndex){

      var range;

      if(tf.element != null){

          if(tf.element.createTextRange){ // for < IE 9

              range = tf.element.createTextRange();

              range.move('character', caretIndex);
              range.select();

          } else {

              if(tf.element.selectionStart){

                  tf.element.focus();
                  tf.element.setSelectionRange(caretIndex, caretIndex);

              } else {
                  tf.element.focus();
              }

          }

      }

    },

    isDependentSign: function ( char ) {

      return ( [

          'ऀ', // INVERTED CANDRABINDU
          'ॕ', // CANDRA LONG E
          'ः', // VISARGA
          'ं', // ANUSVARA
          'ँ', // CANDRABINDU
          'ॎ', // PRISHTHAMATRA E
          '॑', // UDATTA
          '॒' // ANUDATTA

      ].indexOf( char ) > -1 );

    },

    isIndependentSign: function ( char ) {

      return ( [

          'ॐ',
          '।',
          '॥',
          '॰',
          'ॱ',
          'ॽ',
          'ऽ'

      ].indexOf( char ) > -1 );

    },

    isIndependentVowel: function ( char ) {

      return ( [

          'ॷ', // 'UUE'
          'ॶ', // 'UE',
          'ॵ', // 'AW',
          'ॴ', // 'OOE'
          'ॳ', // 'OE'
          'ॲ', // 'CANDRA A'
          'ॡ', // 'VOCALIC LL'
          'ॠ', // 'VOCALIC RR',
          'औ', // 'AU',
          'ओ', // 'O',
          'ऒ', // 'SHORT O',
          'ऑ', // 'CANDRA O'
          'ऐ', // 'AI',
          'ए', // 'E',
          'ऎ', // 'SHORT E',
          'ऍ', // 'CANDRA E',
          'ऌ', //  'VOCALIC L',
          'ऋ', // 'VOCALIC R'
          'ऊ', // 'UU',
          'उ', //  'U',
          'ई', // 'II'
          'इ', // 'I',
          'आ', // 'AA',
          'अ', // 'A',
          'ऄ' // 'SHORT A',

      ].indexOf( char ) > -1 );

    },

    isDependentVowel: function ( char ) {

      return ( [

          'ॗ', // 'UUE',
          'ॖ', // 'UE' '\u0956'
          'ॏ', // 'AW' '\u094F'
          'ऻ', // 'OOE' '\u093B'
          'ऺ', // 'OE' '\u093A'.
          'ॣ', // 'VOCALIC LL' '\u0963'
          'ॄ', // 'VOCALIC RR', '\u0944'
          'ौ', // 'AU' '\u094C'
          'ो', // O '\u094B'
          'ॊ', // 'SHORT O', '\u094A'
          'ॉ', // 'CANDRA O' '\u0949'
          'ै', // 'AI', '\u0948'
          'े', // 'E', '\u0947'
          'ॆ', // 'SHORT E', '\u0946'
          'ॅ', // 'CANDRA E', '\u0945'
          'ॢ', // 'VOCALIC L' '\u0962'
          'ृ', // 'VOCALIC R' '\u0943'
          'ू', // 'UU', '\u0942'
          'ु', // 'U', '\u0941'
          'ी', // 'II' '\u0940'
          'ि', // 'I', '\u093F'
          'ा' // '\u093E'

      ].indexOf( char ) > -1 );

    },

    isConsonant: function ( char ) {

      return ( [
          'क',
          'ख',
          'ग',
          'घ',
          'ङ',
          'च',
          'छ',
          'ज',
          'झ',
          'ञ',
          'ट',
          'ठ',
          'ड',
          'ढ',
          'ण',
          'त',
          'थ',
          'द',
          'ध',
          'न',
          'प',
          'फ',
          'ब',
          'भ',
          'म',
          'य',
          'र',
          'ल',
          'ळ',
          'व',
          'श',
          'ष',
          'स',
          'ह',
          'ॹ',
          'ॺ',
          'ॻ',
          'ॼ',
          'ॾ',
          'ॿ'
      ].indexOf( char ) > -1 );

    },

    isNumeral: function( char ){
      return ( ['०','१','२','३','४','५','६','७','८','९'].indexOf( char ) > -1 );
    },

    isViramaConsonant: function ( char ) {

      return ( [
          'क्',
          'ख्',
          'ग्',
          'घ्',
          'ङ्',
          'च्',
          'छ्',
          'ज्',
          'झ्',
          'ञ्',
          'ट्',
          'ठ्',
          'ड्',
          'ढ्',
          'ण्',
          'त्',
          'थ्',
          'द्',
          'ध्',
          'न्',
          'प्',
          'फ्',
          'ब्',
          'भ्',
          'म्',
          'य्',
          'र्',
          'ल्',
          'ळ्',
          'व्',
          'श्',
          'ष्',
          'स्',
          'ह्',
          'ॹ्',
          'ॺ्',
          'ॻ्',
          'ॼ्',
          'ॾ्',
          'ॿ्'
      ].indexOf( char ) > -1 );
    },

    isNuktaConsonant: function ( char ) {

      return ( [
          'क़',
          'ख़',
          'ग़',
          'ज़',
          'ड़',
          'ढ़',
          'फ़',
          'य़',
          'ऱ',
          'ऴ',
          'ऩ'
      ].indexOf( char ) > -1 );

    },

    isAnusvara: function ( char ) {
      return ( 'ं' === char );
    },

    isVirama: function ( char ) {
      return ( '्' === char );
    },

    isNukta: function ( char ) {
      return ( '़' === char );
    },

    vowelExtendsSchwa: function ( vowel ) {
      return ( [ 'आ', 'ऐ', 'औ', 'ा', 'ै', 'ौ' ].indexOf( vowel ) > -1 );
    },

    vowelExtendsMatra: function ( matra1, matra2 ) {

      return (
          ( matra1 === 'ि' && matra2 === 'ी' ) ||
          ( matra1 === 'ु' && matra2 === 'ू' ) ||
          ( matra1 === 'े' && matra2 === 'ै' ) ||
          ( matra1 === 'ो' && matra2 === 'ौ' ) ||
          ( matra1 === 'ॖ' && matra2 === 'ॗ' ) || // UE - UUE
          ( matra1 === 'ऺ' && matra2 === 'ऻ' ) || // OE - OOE
          ( matra1 === 'ॢ' && matra2 === 'ॣ' ) || // L - LL
          ( matra1 === 'ृ' && matra2 === '-R' ) // -r -R

      );

    },

    getMatra: function ( charObject ) {
      return ( charObject.hasOwnProperty( 'matra' ) ) ? charObject.matra : false;
    },

    isDevanagari: function ( str ) {
      var devanagari = [ '०',
          '१',
          '२',
          '३',
          '४',
          '५',
          '६',
          '७',
          '८',
          '९',
          'अ',
          'ॲ',
          'ॅ',
          'आ',
          'ा',
          'इ',
          'ि',
          'ई',
          'ी',
          'ए',
          'े',
          'ऐ',
          'ै',
          'ओ',
          'ो',
          'औ',
          'ौ',
          'उ',
          'ु',
          'ऊ',
          'ू',
          'ऋ',
          'ृ',
          'ॠ',
          'ॄ',
          'ऌ',
          'ॢ',
          'ॡ',
          'ॣ',
          'ऍ',
          'ॅ',
          'ऑ',
          'ॉ',
          'ऎ',
          'ॆ',
          'ऒ',
          'ॊ',
          'ॳ',
          'ऺ',
          'ॴ',
          'ऻ',
          'ॵ',
          'ॏ',
          'ॶ',
          'ॖ',
          'ॷ',
          'ॗ',
          'क',
          'ख',
          'ग',
          'घ',
          'ङ',
          'च',
          'छ',
          'ज',
          'झ',
          'ञ',
          'ट',
          'ठ',
          'ड',
          'ढ',
          'ण',
          'त',
          'थ',
          'द',
          'ध',
          'न',
          'प',
          'फ',
          'ब',
          'भ',
          'म',
          'य',
          'र',
          'ल',
          'ळ',
          'व',
          'श',
          'ष',
          'स',
          'ह',
          'ॹ',
          'ॺ',
          'ॻ',
          'ॼ',
          'ॾ',
          'ॿ',
          'क़',
          'ख़',
          'ग़',
          'ज़',
          'ड़',
          'ढ़',
          'फ़',
          'य़',
          'ऱ',
          'ऴ',
          'ऩ',
          '्',
          '़',
          'ॎ',
          'ॕ',
          'ऀ',
          'ँ',
          'ं',
          'ः',
          '॑',
          '॒',
          'ॐ',
          '।',
          '॥',
          '॰',
          'ॱ',
          'ॽ',
          'ऽ'
      ];

      return ( devanagari.indexOf( str ) > -1 );

    },

    suppressesVirama: function ( char ) {
      return ( [ 'अ' ].indexOf( char ) > -1 );
    },

    addEvent: function( elem, event, fn ) {

        // Lifted from jfriend00 http://stackoverflow.com/questions/10149963/adding-event-listener-cross-browser

        // avoid memory overhead of new anonymous functions for every event handler that's installed
        // by using local functions
        function listenHandler( e ) {

            var ret = fn.apply( this, arguments );

            if ( ret === false ) {

                e.stopPropagation();
                e.preventDefault();

            }

            return( ret );

        }

        function attachHandler() {

            // set the this pointer same as addEventListener when fn is called
            // and make sure the event is passed to the fn also so that works the same too
            var ret = fn.call( elem, window.event );

            if ( ret === false ) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }

            return( ret );
        }

        if ( elem.addEventListener ) {
            elem.addEventListener( event, listenHandler, false );
        } else {
            elem.attachEvent( 'on' + event, attachHandler );
        }

    },

    getCaretIndex: function( el ){

      var start = 0,
          end = 0,
          normalizedValue, range,
          textInputRange, len, endRange;

      if ( typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number' ) {
          start = el.selectionStart;
          end = el.selectionEnd;


      } else {
          range = document.selection.createRange();

          if ( range && range.parentElement() === el ) {
              len = el.value.length;
              normalizedValue = el.value.replace( /\r\n/g, '\n' );

              // Create a working TextRange that lives only in the input
              textInputRange = el.createTextRange();
              textInputRange.moveToBookmark( range.getBookmark() );

              // Check if the start and end of the selection are at the very end
              // of the input, since moveStart/moveEnd doesn't return what we want
              // in those cases
              endRange = el.createTextRange();
              endRange.collapse( false );

              if ( textInputRange.compareEndPoints( 'StartToEnd', endRange ) > -1 ) {
                  start = end = len;
              } else {
                  start = -textInputRange.moveStart( 'character', -len );
                  start += normalizedValue.slice( 0, start ).split( '\n' ).length - 1;

                  if ( textInputRange.compareEndPoints( 'EndToEnd', endRange ) > -1 ) {
                      end = len;
                  } else {
                      end = -textInputRange.moveEnd( 'character', -len );
                      end += normalizedValue.slice( 0, end ).split( '\n' ).length - 1;
                  }
              }
          }
      }

      return end;
    },

    getSettings: function( defaults, options ){

      var key,
          settings = {};

      if( options && typeof options === 'object' ){

        for( key in defaults ){
            settings[ key ] = ( options.hasOwnProperty( key ) ) ? options[ key ] : defaults[ key ];
        }

        return settings;

      }

      return defaults;

    },

    keyCodeAltersInputString: function(  keyCode, shiftKey, ctrlKey ){

      var nonTransKeys = [
          0, // Firefox arrow keys
          8, // Backspace
          9, // Tab
          13, // Enter
          16, // Shift
          17, // Control
          18, // Alt
          20, // Caps Lock
          27, // Escape
          33, // Page Up
          34, // Page Down
          35, // End
          36, // Home
          37, // Left Arrow
          38, // Up Arrow
          39, // Right Arrow
          40, // Down Arrow
          45, // Insert
          46, // Delete
          112, // F1
          113, // F2
          114, // F3
          115, // F4
          116, // F5
          117, // F6
          118, // F7
          119, // F8
          120, // F9
          121, // F10
          122, // F11
          123, // F12
          144, // Num Lock
          255
      ];

      if( shiftKey === true ) {
        return true;
      } else
      if (
          ( ctrlKey === true && keyCode === 65 ) || // select all
          ( ctrlKey === true && keyCode === 67 ) || // copy
          ( ctrlKey === true && keyCode === 86 ) || // paste
          ( ctrlKey === true && keyCode === 88 ) || // cut
          ( ctrlKey === true && keyCode === 90 ) // back
      ) {
          return false;
      } else {
          return nonTransKeys.indexOf( keyCode ) === -1;
      }
    },

    isArrowKey: function ( keyCode ) {
        return ( [ 37, 38, 39, 40 ].indexOf( keyCode ) > -1 );
    },

    isSpaceKey: function ( keyCode ) {
        return ( 32 === keyCode );
    },

    isShiftKey: function( keyCode ){
        return ( 16 === keyCode );
    },

    isBackspaceKey: function ( keyCode ) {
        return ( 8 === keyCode );
    },

    isValidTextElement: function ( element ) {
        return (
            ( element.nodeName === 'INPUT' && element.type === 'text' ) ||
            ( element.nodeName === 'TEXTAREA' && element.type === 'textarea' )
        );
    },

    isBlankOrEmptyString: function ( char ) {
        return ( [ ' ', '', '\n', '\r', '\t' ].indexOf( char ) > -1 );
    },

    isWhiteSpaceChar: function ( char ) {
        return ( [ ' ', '\n', '\r', '\t' ].indexOf( char ) > -1 );
    }

  };

});

define('keyMap',[], function(){

  var map = {

      ///////////////////////// VOWELS /////////////////////////

      'a': {
          code: '\u0905',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'A',
          char: 'अ'
      },
      '^a': {
          code: '\u0972',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'CANDRA A',
          char: 'ॲ',
          matra: 'ॅ',
          matraCode: '\u0945'
      },


      'aa': {
          code: '\u0906',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'AA',
          char: 'आ',
          matra: 'ा',
          matraCode: '\u093E'
      },
      'i': {
          code: '\u0907',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'I',
          char: 'इ',
          matra: 'ि',
          matraCode: '\u093F'
      },
      'ii': {
          code: '\u0908',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'II',
          char: 'ई',
          matra: 'ी',
          matraCode: '\u0940'
      },
      'e': {
          code: '\u090F',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'E',
          char: 'ए',
          matra: 'े',
          matraCode: '\u0947'
      },
      'ai': {
          code: '\u0910',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'AI',
          char: 'ऐ',
          matra: 'ै',
          matraCode: '\u0948'
      },

      'o': {
          code: '\u0913',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'O',
          char: 'ओ',
          matra: 'ो',
          matraCode: '\u094B'
      },
      'au': {
          code: '\u0914',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'AU',
          char: 'औ',
          matra: 'ौ',
          matraCode: '\u094C'
      },

      'u': {
          code: '\u0909',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'U',
          char: 'उ',
          matra: 'ु',
          matraCode: '\u0941'
      },
      'uu': {
          code: '\u090A',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'UU',
          char: 'ऊ',
          matra: 'ू',
          matraCode: '\u0942'
      },

      '-r': {
          code: '\u090B',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'VOCALIC R',
          char: 'ऋ',
          matra: 'ृ',
          matraCode: '\u0943'
      },
      '-R': {
          code: '\u0960',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'VOCALIC RR',
          char: 'ॠ',
          matra: 'ॄ',
          matraCode: '\u0944'
      },
      '-l': {
          code: '\u090C',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'VOCALIC L',
          char: 'ऌ',
          matra: 'ॢ',
          matraCode: '\u0962'
      },
      '-L': {
          code: '\u0961',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'VOCALIC LL',
          char: 'ॡ',
          matra: 'ॣ',
          matraCode: '\u0963'
      },

      '^e': {
          code: '\u090D',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'CANDRA E',
          char: 'ऍ',
          matra: 'ॅ',
          matraCode: '\u0945'
      },
      '^o': {
          code: '\u0911',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'CANDRA O',
          char: 'ऑ',
          matra: 'ॉ',
          matraCode: '\u0949'
      },

      '-e': {
          code: '\u090E',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'SHORT E',
          char: 'ऎ',
          matra: 'ॆ',
          matraCode: '\u0946'
      },
      '-o': {
          code: '\u0912',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'SHORT O',
          char: 'ऒ',
          matra: 'ॊ',
          matraCode: '\u094A'
      },

      'oE': {
          code: '\u0973',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'OE',
          char: 'ॳ',
          matra: 'ऺ',
          matraCode: '\u093A'
      },
      'OE': {
          code: '\u0974',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'OOE',
          char: 'ॴ',
          matra: 'ऻ',
          matraCode: '\u093B'
      },
      'aW': {
          code: '\u0975',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'AW',
          char: 'ॵ',
          matra: 'ॏ',
          matraCode: '\u094F'
      },
      '_u': {
          code: '\u0976',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'UE',
          char: 'ॶ',
          matra: 'ॖ',
          matraCode: '\u0956'
      },
      '_U': {
          code: '\u0977',
          category: 'VOWEL',
          type: 'LETTER',
          name: 'UUE',
          char: 'ॷ',
          matra: 'ॗ',
          matraCode: '\u0957'
      },

      ///////////////////////// END VOWELS /////////////////////////

      ///////////////////////// CONSONANTS /////////////////////////

      'k': {
          code: '\u0915',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'KA',
          char: 'क'
      },
      'kh': {
          code: '\u0916',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'KHA',
          char: 'ख'
      },
      'g': {
          code: '\u0917',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'GA',
          char: 'ग'
      },
      'gh': {
          code: '\u0918',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'GHA',
          char: 'घ'
      },
      'Ng': {
          code: '\u0919',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'NGA',
          char: 'ङ'
      },
      'c': {
          code: '\u091A',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'C',
          char: 'च'
      },
      'ch': {
          code: '\u091B',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'CHA',
          char: 'छ'
      },
      'j': {
          code: '\u091C',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'JA',
          char: 'ज'
      },
      'jh': {
          code: '\u091D',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'JHA',
          char: 'झ'
      },
      'Nj': {
          code: '\u091E',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'NYA',
          char: 'ञ'
      },
      'T': {
          code: '\u091F',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'TTA',
          char: 'ट'
      },
      'Th': {
          code: '\u0920',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'TTHA',
          char: 'ठ'
      },
      'D': {
          code: '\u0921',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DDA',
          char: 'ड'
      },
      'Dh': {
          code: '\u0922',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DDHA',
          char: 'ढ'
      },
      'Nd': {
          code: '\u0923',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'NNA',
          char: 'ण'
      },
      't': {
          code: '\u0924',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'TA',
          char: 'त'
      },
      'th': {
          code: '\u0925',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'THA',
          char: 'थ'
      },
      'd': {
          code: '\u0926',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DA',
          char: 'द'
      },
      'dh': {
          code: '\u0927',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DHA',
          char: 'ध'
      },
      'n': {
          code: '\u0928',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'NA',
          char: 'न'
      },

      'p': {
          code: '\u092A',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'PA',
          char: 'प'
      },
      'ph': {
          code: '\u092B',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'PHA',
          char: 'फ'
      },
      'b': {
          code: '\u092C',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'BA',
          char: 'ब'
      },
      'bh': {
          code: '\u092D',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'BHA',
          char: 'भ'
      },
      'm': {
          code: '\u092E',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'MA',
          char: 'म'
      },
      'y': {
          code: '\u092F',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'YA',
          char: 'य'
      },
      'r': {
          code: '\u0930',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'RA',
          char: 'र'
      },
      'l': {
          code: '\u0932',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'LA',
          char: 'ल'
      },
      'L': {
          code: '\u0933',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'LLA',
          char: 'ळ'
      },
      'v': {
          code: '\u0935',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'VA',
          char: 'व'
      },
      'sh': {
          code: '\u0936',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'SHA',
          char: 'श'
      },
      'S': {
          code: '\u0937',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'SSA',
          char: 'ष'
      },
      's': {
          code: '\u0938',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'SA',
          char: 'स'
      },
      'h': {
          code: '\u0939',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'HA',
          char: 'ह'
      },

      ////////// RARE CONSONANTS //////////
      //{ code: '\u0978', keys: [ 'N/A' ],     category: 'CONSONANT', type: 'LETTER', name: 'MARWARI DDA',    char: 'ॸ'  },

      'zh': {
          code: '\u0979',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'ZHA',
          char: 'ॹ'
      },
      'YY': {
          code: '\u097A',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'HEAVY YA',
          char: 'ॺ'
      },

      '-G': {
          code: '\u097B',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'GGA',
          char: 'ॻ'
      },
      '-J': {
          code: '\u097C',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'JJA',
          char: 'ॼ'
      },
      '-D': {
          code: '\u097E',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DDDA',
          char: 'ॾ'
      },
      '-B': {
          code: '\u097F',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'BBA',
          char: 'ॿ'
      },
      ////////// END RARE CONSONANTS //////////

      ////////// NUKTA CONSONANTS //////////
      'Q': {
          code: '\u0958',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'QA',
          char: 'क़'
      },
      'X': {
          code: '\u0959',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'KHHA',
          char: 'ख़'
      },
      'G': {
          code: '\u095A',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'GHHA',
          char: 'ग़'
      },
      'Z': {
          code: '\u095B',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'ZA',
          char: 'ज़'
      },
      'R': {
          code: '\u095C',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'DDDHA',
          char: 'ड़'
      },
      'Rh': {
          code: '\u095D',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'RHA',
          char: 'ढ़'
      },
      'F': {
          code: '\u095E',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'FA',
          char: 'फ़'
      },
      'Y': {
          code: '\u095F',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'YYA',
          char: 'य़'
      },

      '.R': {
          code: '\u0931',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'RRA',
          char: 'ऱ'
      },
      '.L': {
          code: '\u0934',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'LLLA',
          char: 'ऴ'
      },
      '.N': {
          code: '\u0929',
          category: 'CONSONANT',
          type: 'LETTER',
          name: 'NNNA',
          char: 'ऩ'
      },
      ////////// END NUKTA CONSONANTS //////////

      ///////////////////////// END CONSONANTS /////////////////////////

      /////////////////////////END LETTERS/////////////////////////

      /////////////////////////DIGITS/////////////////////////
      '0': {
          code: '\u0966',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'ZERO',
          char: '०'
      },
      '1': {
          code: '\u0967',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'ONE',
          char: '१'
      },
      '2': {
          code: '\u0968',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'TWO',
          char: '२'
      },
      '3': {
          code: '\u0969',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'THREE',
          char: '३'
      },
      '4': {
          code: '\u096A',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'FOUR',
          char: '४'
      },
      '5': {
          code: '\u096B',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'FIVE',
          char: '५'
      },
      '6': {
          code: '\u096C',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'SIX',
          char: '६'
      },
      '7': {
          code: '\u096D',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'SEVEN',
          char: '७'
      },
      '8': {
          code: '\u096E',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'EIGHT',
          char: '८'
      },
      '9': {
          code: '\u096F',
          category: 'NUMBER',
          type: 'DIGIT',
          name: 'NINE',
          char: '९'
      },
      /////////////////////////END DIGITS/////////////////////////

      /////////////////////////DEPENDENT SIGNS/////////////////////////
      ///// SPECIAL SIGNS /////
      '#': {
          code: '\u094D',
          category: 'SIGN: DEP',
          type: 'VOWEL SIGN',
          name: 'VIRAMA',
          char: '्'
      },
      '##': {
          code: '\u093C',
          category: 'SIGN: DEP',
          type: 'SIGN',
          name: 'NUKTA',
          char: '़'
      },

      ///// REGULAR /////

      '^E': {
          code: '\u094E',
          category: 'VOWEL',
          type: 'VOWEL SIGN',
          name: 'PRISHTHAMATRA E',
          char: 'ॎ'
      },
      '-^': {
          code: '\u0955',
          category: 'VOWEL',
          type: 'VOWEL SIGN',
          name: 'CANDRA LONG E',
          char: 'ॕ'
      },
      '-M': {
          code: '\u0900',
          category: 'SIGN: DEP',
          type: 'SIGN',
          name: 'INVERTED CANDRABINDU',
          char: 'ऀ'
      },
      'MM': {
          code: '\u0901',
          category: 'SIGN: DEP',
          type: 'SIGN',
          name: 'CANDRABINDU',
          char: 'ँ'
      },
      'M': {
          code: '\u0902',
          category: 'SIGN: DEP',
          type: 'SIGN',
          name: 'ANUSVARA',
          char: 'ं'
      },
      'H': {
          code: '\u0903',
          category: 'SIGN: DEP',
          type: 'SIGN',
          name: 'VISARGA',
          char: 'ः'
      },

      '-|': {
          code: '\u0951',
          category: 'SIGN: DEP',
          type: 'STRESS SIGN',
          name: 'UDATTA',
          char: '॑'
      },
      '-_': {
          code: '\u0952',
          category: 'SIGN: DEP',
          type: 'STRESS SIGN',
          name: 'ANUDATTA',
          char: '॒'
      },

      /////////////////////////END DEPENDENT SIGNS/////////////////////////

      /////////////////////////INDEPENDENT SIGNS/////////////////////////
      'O': {
          code: '\u0950',
          category: 'SIGN: IND',
          type: 'UNCLASSIFIED',
          name: 'OM',
          char: 'ॐ'
      },
      '\\': {
          code: '\u0964',
          category: 'SIGN: IND',
          type: 'PUNCTUATION',
          name: 'DANDA',
          char: '।'
      },
      '|': {
          code: '\u0965',
          category: 'SIGN: IND',
          type: 'PUNCTUATION',
          name: 'DOUBLE DANDA',
          char: '॥'
      },
      '-0': {
          code: '\u0970',
          category: 'SIGN: IND',
          type: 'ABBREVIATION SIGN',
          name: 'ABBREVIATION SIGN',
          char: '॰'
      },
      '^.': {
          code: '\u0971',
          category: 'SIGN: IND',
          type: 'ABBREVIATION SIGN',
          name: 'HIGH SPACING DOT',
          char: 'ॱ'
      },
      '-:': {
          code: '\u097D',
          category: 'SIGN: IND',
          type: 'LETTER',
          name: 'GLOTTAL STOP',
          char: 'ॽ'
      },
      '-s': {
          code: '\u093D',
          category: 'SIGN: IND',
          type: 'SIGN',
          name: 'AVAGRAHA',
          char: 'ऽ'
      },
      /////////////////////////END INDEPENDENT SIGNS/////////////////////////

      /*
       *  DEPRICATED
       *  '-a': { code: '\u0904', category: 'VOWEL', type: 'LETTER',      name: 'SHORT A',            char: 'ऄ'  },
       *  '-;': { code: '\u0953', category: 'SIGN: DEP', type: '',               name: 'GRAVE ACCENT',           char: '॓' },      //   '॓'
       *  '-'': { code: '\u0954', category: 'SIGN: DEP', type: '',               name: 'ACUTE ACCENT',           char: '\u0954' },   //'॔'
       */
  };

  function validateKeys() {

      var reserved = [ 'do', 'if', 'in' ];

      for ( var key in map ) {
          if ( reserved.indexOf( key ) > -1 ) {
              throw new Error( 'Invalid key used. \'' + key + '\' is a reserved word.' );
          }
      }

  }

  function addIsOverridableProperty(keyMap){

    var key, key2, obj;

    for(key in keyMap){

      obj = keyMap[key];

      if(key.length === 1){

        for(key2 in keyMap){

          if(key2.length === 2 && key2[0] === key){
            keyMap[key].isOverridable = true;
            break;
          }

        }

      }

    }

  }

  function addRemoveLastProperty(keyMap){

    var key;

    for(key in keyMap){
        keyMap[key].removeLast = (key.length === 2 && keyMap.hasOwnProperty(key[0]));
    }

  }

  function getCharsToBeCustomized(customMap){

    var charsToBeCustomized = {};

    if(!customMap) {return false};

    for( var cmKeys in customMap){

      var cmChar = customMap[cmKeys];
      var matched = false;

      for(var dfKey in map){

        var dfCharObj = map[dfKey];

        if(dfCharObj.char === cmChar){
          charsToBeCustomized[dfKey] = dfCharObj;
          matched = true;
          break;
        }

      }

      if(!matched){
        console.warn('Character: ' + cmChar + ' is not supported.')
      }

    }

    return (charsToBeCustomized && Object.keys(charsToBeCustomized).length > 0) ? charsToBeCustomized : false;
  }

  function buildCustomMap(customMap){

    var newMap      = buildDefaultMap(),
        oldKeys = getCharsToBeCustomized(customMap);

    if(oldKeys){

      for(var oldKey in oldKeys){

        var charObj = oldKeys[oldKey];
        var targetChar = charObj.char;

        delete newMap[oldKey];

        for(var newKey in customMap){

          if(customMap[newKey] === targetChar){

            newMap[newKey] = {};
            newMap[newKey].char  = charObj.char;

            if(charObj.hasOwnProperty('matra')){
              newMap[newKey].matra = charObj.matra;
            }

            addIsOverridableProperty(newMap);
            addRemoveLastProperty(newMap);

          }

        }

      }

    }

    return newMap;

  }

  function buildDefaultMap(){

    var key, obj,
        keyMap = {};

    for(key in map){

      keyMap[key]       = {};
      obj               = map[key];
      keyMap[key].char  = obj.char;

      if(obj.hasOwnProperty('matra')){
        keyMap[key].matra = obj.matra;
      }

    }

    addIsOverridableProperty(keyMap);
    addRemoveLastProperty(keyMap);

    return keyMap;

  }

  return {

      build: function(settings){
        return (settings.customKeyMap) ? buildCustomMap(settings.customKeyMap) : buildDefaultMap();
      }

  };

});

define('devanagari',['util'], function(util){

  var VIRAMA  = '्',
      NUKTA   = '़';

  function getLastChar(inputString){
    return (inputString.length > 0) ? inputString.slice(-1) : '';
  }

  function getChar(inputString, charObj, settings) {

      var matra         = (charObj.hasOwnProperty('matra')) ? charObj.matra : false,
          defaultChar   = charObj.char,
          lastChar      = getLastChar(inputString),
          autoAddVirama = settings.autoAddVirama;

      if (util.isConsonant(defaultChar) || util.isNuktaConsonant(defaultChar)) {
          return (autoAddVirama) ? defaultChar + VIRAMA : defaultChar;
      } else
      if (util.isIndependentVowel(defaultChar)) {

          if (util.isVirama(lastChar)) {
              return (matra !== false) ? matra : defaultChar;
          } else
          if (
              util.isConsonant(lastChar) ||
              util.isNukta(lastChar) ||
              util.isNuktaConsonant(lastChar)
         ) {
              return (matra && util.vowelExtendsSchwa(defaultChar)) ? matra : defaultChar;
          } else
          if (util.isDependentVowel(lastChar)) {

              return (matra && util.vowelExtendsMatra(lastChar, matra)) ? matra : defaultChar;
          }

      } else
      if (util.isDependentSign(defaultChar)) {

          return defaultChar;
      }

      return defaultChar;

  }

  function appendToVowel(inputString, charObj, settings ) {

      var char = getChar(inputString, charObj, settings);

      if (util.isVirama(char) || util.isNukta(char)) {
          return inputString;
      }

      return inputString + char;
  }

  function appendToVirama(inputString, charObj, settings) {

      var charBeforeVirama = inputString.slice(-2, -1),
          char = getChar(inputString, charObj, settings);

      if (util.isDependentVowel(char)) {
          return inputString.slice(0, -1) + char;
      } else
      if (util.isIndependentVowel(char)) {
          return (util.suppressesVirama(char)) ? inputString.slice(0, -1) : inputString + char;
      } else
      if (util.isConsonant(char) || util.isViramaConsonant(char) || util.isNuktaConsonant(char)) {
          return inputString + char;
      } else
      if (util.isNukta(char)) { // insert nukta inbetween cons and virama so dependent vowels can be added to cons
          return (util.isConsonant(charBeforeVirama)) ? inputString.slice(0, -1) + NUKTA + VIRAMA : inputString;
      } else
      if (util.isVirama(char)) {
          return inputString;
      } else
      if (util.isDependentSign(char)) { // remove virama
          return (util.isConsonant(charBeforeVirama) || util.isNukta(charBeforeVirama)) ? inputString.slice(0, -1) + char : inputString;
      }

      return inputString + char;

  }

  function appendToDependentSign(inputString, charObj, settings ) {

      var char = getChar(inputString, charObj, settings );

      /*
       * blocks consecutive dependent signs
       */
      return (util.isDependentSign(char)) ? inputString : inputString + char;

  }

  function appendDevanagariChar(inputString, charObj, settings) {

      var lastChar = getLastChar(inputString),
          char = (charObj) ? getChar(inputString, charObj, settings) : false;

      if(!util.isDevanagari(lastChar) && !util.isBlankOrEmptyString(lastChar)){
        return inputString + char;
      }

      if(!char){
        return inputString;
      }

      if (util.isIndependentVowel(lastChar) || util.isDependentVowel(lastChar)) {
          return appendToVowel(inputString, charObj, settings );
      } else

      if (util.isVirama(lastChar)) {
          return appendToVirama(inputString, charObj, settings );
      } else
      if (util.isDependentSign(lastChar)) {
          return appendToDependentSign(inputString, charObj, settings );
      } else
      if (
          util.isConsonant(lastChar) ||
          util.isNuktaConsonant(lastChar) ||
          util.isNukta(lastChar) ||
          util.isIndependentSign(lastChar) ||
          util.isBlankOrEmptyString(lastChar) ||
          util.isNumeral(lastChar)
     ) {
          return inputString + char;
      }

      return inputString;

  }

  function removeVirama(inputString){
    var lastChar = getLastChar(inputString);
    return (lastChar === VIRAMA) ? inputString.slice(0, -1) : inputString;
  }

  return {
    appendChar: appendDevanagariChar,
    removeVirama: removeVirama
  };

});

define('events',['util'], function(util){

  var events = {};

  function keyHeldDown(tf){
    return(tf.keyupCount !== tf.keydownCount)
  }

  function undoKeyHeldDown(tf){

    var caretIndex    = util.getCaretIndex(tf.element),
        newCaretIndex = caretIndex - tf.keydownCount;

    tf.element.value  = tf.inputString;
    tf.keydownCount   = 0;
    tf.keyupCount     = 0;

    util.setCaretIndex(tf, newCaretIndex);

  }

  function canIgnoreKeyCode(keyCode){
     return([
         0, // Firefox arrow keys
         8, // Backspace
         9, // Tab
         13, // Enter
         16, // Shift
         17, // Control
         18, // Alt
         20, // Caps Lock
         27, // Escape
         33, // Page Up
         34, // Page Down
         35, // End
         36, // Home
         37, // Left Arrow
         38, // Up Arrow
         39, // Right Arrow
         40, // Down Arrow
         45, // Insert
         46, // Delete
         112, // F1
         113, // F2
         114, // F3
         115, // F4
         116, // F5
         117, // F6
         118, // F7
         119, // F8
         120, // F9
         121, // F10
         122, // F11
         123, // F12
         144, // Num Lock
         255
     ].indexOf(keyCode) > -1);
  }

  function toggleScript(tf){

    var caretIndex  = util.getCaretIndex(tf.element);

    if(tf.settings.scriptMode === 'Devanagari'){

      tf.settings.scriptMode = 'Roman';
      tf.key = null;
      tf.cachedKey = null;
      tf.cachedInputString = null;
      tf.cachedInputStringKeyRemoved = null;
      tf.keydownCount   = 0;
      tf.keyupCount     = 0;

    } else {

      tf.settings.scriptMode = 'Devanagari';

      tf.keydownCount = 0;
      tf.keyupCount = 0;

      tf.devanagariCharObj = null;

      tf.key = null;
      tf.cachedKey = null;

      tf.inputString = tf.element.value;
      tf.cachedInputString = null;

      tf.inputStringKeyRemoved = null;
      tf.cachedInputStringKeyRemoved = null;
    }

  }

  function isValidCtrlCombo(ctrlKey, keyCode){
    return (
      (ctrlKey && keyCode === 17) || // control keydown
      (ctrlKey && keyCode === 65) || // control + a = select all
      (ctrlKey && keyCode === 67) || // control + c = copy
      (ctrlKey && keyCode === 86) || // control + v = paste
      (ctrlKey && keyCode === 88) || // control + x = cut
      (ctrlKey && keyCode === 89) || // control + y = back
      (ctrlKey && keyCode === 90)    // control + z = back
    );
  }

  function incrementKeyEventCount(tf, eventType, keyCode, ctrlKey, shiftKey){

    if(eventType === 'keydown'){
      if(isValidCtrlCombo(ctrlKey, keyCode)){
        return;
      }
    } else
    if(eventType === 'keyup'){
      if(
        (tf.cachedCtrlKey && tf.keyCode === 17) || // ctrl + ctrl
        (tf.cachedCtrlKey && tf.keyCode === 65) || // ctrl + a
        (tf.cachedCtrlKey && tf.keyCode === 67) || // ctrl + c
        (tf.cachedCtrlKey && tf.keyCode === 86) || // ctrl + v
        (tf.cachedCtrlKey && tf.keyCode === 88) || // ctrl + x
        (tf.cachedCtrlKey && tf.keyCode === 89) || // ctrl + x
        (tf.cachedCtrlKey && tf.keyCode === 90) || // ctrl + z

        (tf.cachedKeyCode === 65 && tf.keyCode === 17) || // a keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 65) || // control keyup then a keyup

        (tf.cachedKeyCode === 67 && tf.keyCode === 17) || // c keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 67) || // control keyup then c keyup

        (tf.cachedKeyCode === 86 && tf.keyCode === 17) || // c keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 86) || // control keyup then c keyup

        (tf.cachedKeyCode === 88 && tf.keyCode === 17) || // x keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 88) || // control keyup then x keyup

        (tf.cachedKeyCode === 89 && tf.keyCode === 17) || // y keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 89) || // control keyup then y keyup

        (tf.cachedKeyCode === 90 && tf.keyCode === 17) || // z keyup then control keyup
        (tf.cachedKeyCode === 17 && tf.keyCode === 90)  // control keyup then z keyup

      ){ return; }
    }

    if(!canIgnoreKeyCode(keyCode)){
      if(eventType === 'keyup'){
        tf.keyupCount = tf.keyupCount += 1;
      } else
      if(eventType === 'keydown'){
        tf.keydownCount = tf.keydownCount += 1;
      }
    }

  };

  events.onKeydown = function(e){

    var keyCode     = e.keyCode ? e.keyCode : e.which,
        eventType   = e.type,
        shiftKey    = e.shiftKey,
        ctrlKey     = e.ctrlKey,
        settings    = this.settings;

    this.cachedCtrlKey = this.ctrlKey;
    this.ctrlKey = ctrlKey;

    this.cachedShiftKey = this.shiftKey;
    this.shiftKey = shiftKey;

    this.cachedKeyCode = this.keyCode;
    this.keyCode = keyCode;

    incrementKeyEventCount(this, eventType, keyCode, ctrlKey, shiftKey);
  }

  events.onKeyup = function(event){

      var keyCode     = event.keyCode ? event.keyCode : event.which,
          eventType   = event.type,
          shiftKey    = event.shiftKey,
          ctrlKey     = event.ctrlKey,
          settings    = this.settings;

      this.cachedCtrlKey = this.ctrlKey;
      this.ctrlKey = ctrlKey;

      this.cachedShiftKey = this.shiftKey;
      this.shiftKey = shiftKey;

      this.cachedKeyCode = this.keyCode;
      this.keyCode = keyCode;

      if(shiftKey && ctrlKey && keyCode === 54){
        toggleScript(this);
        return
      }

      if( settings.scriptMode === 'Roman' ){ return; };

      incrementKeyEventCount(this, eventType, keyCode, ctrlKey, shiftKey);

      if(keyHeldDown(this)){

        undoKeyHeldDown(this);
        return ;
      }

      this.keydownCount = 0;
      this.keyupCount = 0;

      this.cachedInputString = (this.inputString != null) ? this.inputString : '';
      this.inputString = this.element.value;

      if(this.inputString.length > this.cachedInputString.length){

        this.cachedCaretIndex = this.caretIndex;
        this.caretIndex = util.getCaretIndex(this.element);

        this.cachedKey = this.key;
        this.key = (this.caretIndex > 0) ? this.element.value[ this.caretIndex - 1 ] : '';

        if(!util.isDevanagari(this.key)){

          var elVal = this.element.value;

          this.cachedInputStringKeyRemoved  = (this.inputStringKeyRemoved != null) ? this.inputStringKeyRemoved : '';
          this.inputStringKeyRemoved = (this.caretIndex > 0) ? elVal.slice(0, this.caretIndex - 1 ) + elVal.slice(this.caretIndex): '';

        } else {
          return false;
        }

        if(!util.isWhiteSpaceChar(this.key)){

          this.setDevObj();
          this.appendDevanagariChar();

          this.cachedInputString = (this.inputString !== undefined) ? this.inputString : '';
          this.inputString = this.element.value;

        } else {

          if(settings.autoRemoveVirama){
            this.autoRemoveVirama();
            this.cachedInputString = (this.inputString !== undefined) ? this.inputString : '';
            this.inputString = this.element.value;
            return;
          }

          this.key = null;
          this.cachedKey = null;
          this.cachedInputString = null;
          this.cachedInputStringKeyRemoved = null;
        }

      } else {

        // don't clear cache on shift key keyup, otherwise keys accessed via shift key combos won't work
        if(keyCode !== 16 && keyCode !== 17){
          this.key = null;
          this.cachedKey = null;
          this.cachedInputString = null;
          this.cachedInputStringKeyRemoved = null;
        }

      }

    };

  return events;
});

define('textField',['util', 'keyMap', 'devanagari', 'events'], function(util, keyMap, devanagari, events){

  var outputString = function(tf, string){
    tf.element.value = string;
  };

  var handleClick = function(tf){

    tf.key = null;
    tf.cachedKey = null;
    tf.cachedInputString = null;
    tf.cachedInputStringKeyRemoved = null;

  };

  var handleBlur = function(tf){

    tf.key = null;
    tf.cachedKey = null;
    tf.cachedInputString = null;
    tf.cachedInputStringKeyRemoved = null;

  };

  /*
  * Not sure if this is needed. Affects
  * testing with Syn, so commented out for now.
  */
  var handleFocus = function(tf){
    //tf.inputString = tf.element.value;
  };

  var handleChange = function(tf){
    tf.inputString = tf.element.value;
  };

  function DevanagariTextField(element, options){

      var startingCaretIndex,

          self = this,
          settings = util.getSettings({

            autoAddVirama:true,
            autoRemoveVirama:true,
            allowModeToggle:true,
            toggleScriptButton: false,
            toggleScriptKey: 'Ctrl+Shift+T',
            scriptMode: 'Devanagari',
            customKeyMap: false

          }, options);

      if(util.isValidTextElement(element)){

        startingCaretIndex = util.getCaretIndex(element);

        this.keyMap = keyMap.build(settings);

        this.keydownCount = 0;
        this.keyupCount = 0;

        this.element = element;
        this.settings = settings;

        this.caretIndex = util.getCaretIndex(this.element);
        this.cachedCaretIndex = null;

        this.devanagariCharObj = null;

        this.key = null;
        this.cachedKey = null;

        this.inputString = this.element.value;
        this.cachedInputString = null;

        this.inputStringKeyRemoved = null;
        this.cachedInputStringKeyRemoved = null;

        util.addEvent(this.element, 'keyup', function(event){
          self.onKeyup(event || window.event);
        });

        util.addEvent(this.element, 'keydown', function(event){
          self.onKeydown(event || winow.event);
        });

        util.addEvent(this.element, 'click', function(){
          handleClick(self);
        });

        util.addEvent(this.element, 'blur', function(event){
          handleBlur(self, event || window.event);
        });

        util.addEvent(this.element, 'focus', function(event){
          handleFocus(self, event || window.event);
        });

        util.addEvent(this.element, 'change', function(event){
          handleChange(self, event || window.event);
        });

      } else {
        throw new Error('Element must be a text element.');
      }

    }

    DevanagariTextField.prototype.autoRemoveVirama = function(){

      var output, spaceChar, inputStrSpaceCharRemoved, inputStrStartSubSpaceCharRemoved,
          caretIsAtEnd = caretIsAtEnd      = (this.caretIndex === this.element.value.length);

      if(caretIsAtEnd){

        spaceChar                = this.inputString.slice(-1);
        inputStrSpaceCharRemoved = this.inputString.slice(0, -1);
        output                   = devanagari.removeVirama(inputStrSpaceCharRemoved) + spaceChar;

        outputString(this, output);

      } else {

        spaceChar                        = this.inputString.slice(this.caretIndex - 1, this.caretIndex);
        inputStrStartSubSpaceCharRemoved = this.inputString.slice(0, this.caretIndex - 1);
        inputStrEndSub                   = this.inputString.slice(this.caretIndex);
        outputStartSub                   = devanagari.removeVirama(inputStrStartSubSpaceCharRemoved);
        output                           = outputStartSub + spaceChar + inputStrEndSub;

        outputString(this, output);
        util.setCaretIndex(this, outputStartSub.length + 1);

      }

    };

    DevanagariTextField.prototype.appendDevanagariChar = function(){

      var output, outputSubstr1, removeLast,

          caretIndex        = this.caretIndex,
          cachedCaretIndex  = this.cachedCaretIndex,
          cachedInputString = (this.cachedInputStringKeyRemoved !== null) ? this.cachedInputStringKeyRemoved :false,
          cachedInputSubstr1= (cachedInputString) ? cachedInputString.slice(0, cachedCaretIndex -1) : false,
          caretIsAtEnd      = (this.caretIndex === this.element.value.length),
          inputString       = (this.inputStringKeyRemoved !== null) ? this.inputStringKeyRemoved : false,
          inputSubstr1      = (inputString) ? inputString.slice(0, caretIndex - 1) : false,
          inputSubstr2      = (inputString) ? inputString.slice(caretIndex - 1) : false,
          devanagariCharObj = this.devanagariCharObj,
          settings          = this.settings;

      if(devanagariCharObj != null){

        removeLast = devanagariCharObj.removeLast;

        if(caretIsAtEnd){

          if(removeLast){
            output = devanagari.appendChar(cachedInputString, devanagariCharObj, settings);
          } else {
            output = devanagari.appendChar(inputString, devanagariCharObj, settings);
          }

          outputString(this, output);

          return;

        } else {

          if(removeLast){

            outputSubstr1 = devanagari.appendChar(cachedInputSubstr1, devanagariCharObj, settings);
            output = outputSubstr1 + inputSubstr2;

          } else {

            outputSubstr1 = devanagari.appendChar(inputSubstr1, devanagariCharObj, settings);
            output =  outputSubstr1 + inputSubstr2;

          }

          outputString(this, output);
          util.setCaretIndex(this, outputSubstr1.length);
          return;

        }

      } else {

        output = this.inputStringKeyRemoved;
        outputString(this, output);

        // -1 to account for the removed key
        util.setCaretIndex(this, caretIndex -1);

      }

    };

    DevanagariTextField.prototype.setDevObj = function(){

      var twoCharKey = (this.cachedKey != null) ? this.cachedKey + this.key : false,
          oneCharKey = (this.key !== null) ? this.key : false;

      var map = this.keyMap;

      if(twoCharKey && map.hasOwnProperty(twoCharKey)){
        this.devanagariCharObj  = map[twoCharKey];
        this.cachedKey          = null;
        this.key                = null;
      } else
      if(oneCharKey && map.hasOwnProperty(oneCharKey)){
        this.devanagariCharObj = map[oneCharKey];
      } else {
        this.devanagariCharObj = null;
      }

    };

    DevanagariTextField.prototype.onKeydown = events.onKeydown;

    DevanagariTextField.prototype.onKeyup   = events.onKeyup;

    var init = function(elementId, options){
      var te = document.getElementById(elementId);
      return new DevanagariTextField(te, options);
    };

    return init;

});

/*global define */

define('main',['require','textField'],function (require) {


    var devanagariTextField = require('textField');

    //Return the module value.
    return devanagariTextField;

});

  //The modules for your project will be inlined above
    //this snippet. Ask almond to synchronously require the
    //module value for 'main' here and return it as the
    //value to use for the public API for the built file.
    return require('main');
}));
