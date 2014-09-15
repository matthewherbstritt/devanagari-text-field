define([], function(){

  return {

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
