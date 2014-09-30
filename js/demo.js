(function(){

  'use strict';
  devanagariTextField( 'default-tb' );
  devanagariTextField( 'default-ta' );

  devanagariTextField( 'no-auto-virama-tb', {
    autoAddVirama: false
  });

  devanagariTextField( 'no-auto-virama-ta', {
    autoAddVirama: false
  } );

  devanagariTextField( 'no-auto-remove-tb', {
    autoRemoveVirama: false
  });

  devanagariTextField( 'no-auto-remove-ta', {
    autoRemoveVirama: false
  } );

  devanagariTextField( 'no-auto-remove-no-add-tb', {
    autoAddVirama: false,
    autoRemoveVirama: false
  });

  devanagariTextField( 'no-auto-remove-no-add-ta', {
    autoRemoveVirama: false
  } );

  var demo = angular.module('demo', []);

  demo.directive('removeOnClick', function() {
      return {
          link: function(scope, elt, attrs) {
              scope.remove = function() {
                console.log('asdf')
                  elt.html('');
              };
          }
      }
  });

  demo.directive("ngPortlet", function ($compile) {
    return {
        template: "<input type='text' id='default-tb' class='' ng-class=''ng-model='textInputs.default_tb' autocomplete='off'/>",
        restrict: 'E',
        link: function (scope, elm) {
            scope.addInput = function(){
                console.log(elm);
               elm.after($compile('<ng-portlet></ng-portlet>')(scope));
            }
        }
    };
  });

  demo.controller('demoController', function($scope){

    var map = {

        ///////////////////////// VOWELS /////////////////////////

        'a': {
            code: 'U+0905',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'A',
            char: 'अ'
        },
        '^a': {
            code: 'U+0972',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'CANDRA A',
            char: 'ॲ',
            matra: 'ॅ',
            matraCode: 'U+0945'
        },


        'aa': {
            code: 'U+0906',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'AA',
            char: 'आ',
            matra: 'ा',
            matraCode: 'U+093E'
        },
        'i': {
            code: 'U+0907',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'I',
            char: 'इ',
            matra: 'ि',
            matraCode: 'U+093F'
        },
        'ii': {
            code: 'U+0908',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'II',
            char: 'ई',
            matra: 'ी',
            matraCode: 'U+0940'
        },
        'e': {
            code: 'U+090F',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'E',
            char: 'ए',
            matra: 'े',
            matraCode: 'U+0947'
        },
        'ai': {
            code: 'U+0910',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'AI',
            char: 'ऐ',
            matra: 'ै',
            matraCode: 'U+0948'
        },

        'o': {
            code: 'U+0913',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'O',
            char: 'ओ',
            matra: 'ो',
            matraCode: 'U+094B'
        },
        'au': {
            code: 'U+0914',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'AU',
            char: 'औ',
            matra: 'ौ',
            matraCode: 'U+094C'
        },

        'u': {
            code: 'U+0909',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'U',
            char: 'उ',
            matra: 'ु',
            matraCode: 'U+0941'
        },
        'uu': {
            code: 'U+090A',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'UU',
            char: 'ऊ',
            matra: 'ू',
            matraCode: 'U+0942'
        },

        '-r': {
            code: 'U+090B',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'VOCALIC R',
            char: 'ऋ',
            matra: 'ृ',
            matraCode: 'U+0943'
        },
        '-R': {
            code: 'U+0960',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'VOCALIC RR',
            char: 'ॠ',
            matra: 'ॄ',
            matraCode: 'U+0944'
        },
        '-l': {
            code: 'U+090C',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'VOCALIC L',
            char: 'ऌ',
            matra: 'ॢ',
            matraCode: 'U+0962'
        },
        '-L': {
            code: 'U+0961',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'VOCALIC LL',
            char: 'ॡ',
            matra: 'ॣ',
            matraCode: 'U+0963'
        },

        '^e': {
            code: 'U+090D',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'CANDRA E',
            char: 'ऍ',
            matra: 'ॅ',
            matraCode: 'U+0945'
        },
        '^o': {
            code: 'U+0911',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'CANDRA O',
            char: 'ऑ',
            matra: 'ॉ',
            matraCode: 'U+0949'
        },

        '-e': {
            code: 'U+090E',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'SHORT E',
            char: 'ऎ',
            matra: 'ॆ',
            matraCode: 'U+0946'
        },
        '-o': {
            code: 'U+0912',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'SHORT O',
            char: 'ऒ',
            matra: 'ॊ',
            matraCode: 'U+094A'
        },

        'oE': {
            code: 'U+0973',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'OE',
            char: 'ॳ',
            matra: 'ऺ',
            matraCode: 'U+093A'
        },
        'OE': {
            code: 'U+0974',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'OOE',
            char: 'ॴ',
            matra: 'ऻ',
            matraCode: 'U+093B'
        },
        'aW': {
            code: 'U+0975',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'AW',
            char: 'ॵ',
            matra: 'ॏ',
            matraCode: 'U+094F'
        },
        '_u': {
            code: 'U+0976',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'UE',
            char: 'ॶ',
            matra: 'ॖ',
            matraCode: 'U+0956'
        },
        '_U': {
            code: 'U+0977',
            category: 'VOWEL',
            type: 'LETTER',
            name: 'UUE',
            char: 'ॷ',
            matra: 'ॗ',
            matraCode: 'U+0957'
        },

        ///////////////////////// END VOWELS /////////////////////////

        ///////////////////////// CONSONANTS /////////////////////////

        'k': {
            code: 'U+0915',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'KA',
            char: 'क'
        },
        'kh': {
            code: 'U+0916',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'KHA',
            char: 'ख'
        },
        'g': {
            code: 'U+0917',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'GA',
            char: 'ग'
        },
        'gh': {
            code: 'U+0918',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'GHA',
            char: 'घ'
        },
        'Ng': {
            code: 'U+0919',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'NGA',
            char: 'ङ'
        },
        'c': {
            code: 'U+091A',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'C',
            char: 'च'
        },
        'ch': {
            code: 'U+091B',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'CHA',
            char: 'छ'
        },
        'j': {
            code: 'U+091C',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'JA',
            char: 'ज'
        },
        'jh': {
            code: 'U+091D',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'JHA',
            char: 'झ'
        },
        'Nj': {
            code: 'U+091E',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'NYA',
            char: 'ञ'
        },
        'T': {
            code: 'U+091F',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'TTA',
            char: 'ट'
        },
        'Th': {
            code: 'U+0920',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'TTHA',
            char: 'ठ'
        },
        'D': {
            code: 'U+0921',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DDA',
            char: 'ड'
        },
        'Dh': {
            code: 'U+0922',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DDHA',
            char: 'ढ'
        },
        'Nd': {
            code: 'U+0923',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'NNA',
            char: 'ण'
        },
        't': {
            code: 'U+0924',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'TA',
            char: 'त'
        },
        'th': {
            code: 'U+0925',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'THA',
            char: 'थ'
        },
        'd': {
            code: 'U+0926',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DA',
            char: 'द'
        },
        'dh': {
            code: 'U+0927',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DHA',
            char: 'ध'
        },
        'n': {
            code: 'U+0928',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'NA',
            char: 'न'
        },

        'p': {
            code: 'U+092A',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'PA',
            char: 'प'
        },
        'ph': {
            code: 'U+092B',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'PHA',
            char: 'फ'
        },
        'b': {
            code: 'U+092C',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'BA',
            char: 'ब'
        },
        'bh': {
            code: 'U+092D',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'BHA',
            char: 'भ'
        },
        'm': {
            code: 'U+092E',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'MA',
            char: 'म'
        },
        'y': {
            code: 'U+092F',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'YA',
            char: 'य'
        },
        'r': {
            code: 'U+0930',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'RA',
            char: 'र'
        },
        'l': {
            code: 'U+0932',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'LA',
            char: 'ल'
        },
        'L': {
            code: 'U+0933',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'LLA',
            char: 'ळ'
        },
        'v': {
            code: 'U+0935',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'VA',
            char: 'व'
        },
        'sh': {
            code: 'U+0936',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'SHA',
            char: 'श'
        },
        'S': {
            code: 'U+0937',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'SSA',
            char: 'ष'
        },
        's': {
            code: 'U+0938',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'SA',
            char: 'स'
        },
        'h': {
            code: 'U+0939',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'HA',
            char: 'ह'
        },

        ////////// RARE CONSONANTS //////////
        //{ code: 'U+0978', keys: [ 'N/A' ],     category: 'CONSONANT', type: 'LETTER', name: 'MARWARI DDA',    char: 'ॸ'  },

        'zh': {
            code: 'U+0979',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'ZHA',
            char: 'ॹ'
        },
        'YY': {
            code: 'U+097A',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'HEAVY YA',
            char: 'ॺ'
        },

        '-G': {
            code: 'U+097B',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'GGA',
            char: 'ॻ'
        },
        '-J': {
            code: 'U+097C',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'JJA',
            char: 'ॼ'
        },
        '-D': {
            code: 'U+097E',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DDDA',
            char: 'ॾ'
        },
        '-B': {
            code: 'U+097F',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'BBA',
            char: 'ॿ'
        },
        ////////// END RARE CONSONANTS //////////

        ////////// NUKTA CONSONANTS //////////
        'Q': {
            code: 'U+0958',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'QA',
            char: 'क़'
        },
        'X': {
            code: 'U+0959',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'KHHA',
            char: 'ख़'
        },
        'G': {
            code: 'U+095A',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'GHHA',
            char: 'ग़'
        },
        'Z': {
            code: 'U+095B',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'ZA',
            char: 'ज़'
        },
        'R': {
            code: 'U+095C',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'DDDHA',
            char: 'ड़'
        },
        'Rh': {
            code: 'U+095D',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'RHA',
            char: 'ढ़'
        },
        'F': {
            code: 'U+095E',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'FA',
            char: 'फ़'
        },
        'Y': {
            code: 'U+095F',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'YYA',
            char: 'य़'
        },

        '.R': {
            code: 'U+0931',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'RRA',
            char: 'ऱ'
        },
        '.L': {
            code: 'U+0934',
            category: 'CONSONANT',
            type: 'LETTER',
            name: 'LLLA',
            char: 'ऴ'
        },
        '.N': {
            code: 'U+0929',
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
            code: 'U+0966',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'ZERO',
            char: '०'
        },
        '1': {
            code: 'U+0967',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'ONE',
            char: '१'
        },
        '2': {
            code: 'U+0968',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'TWO',
            char: '२'
        },
        '3': {
            code: 'U+0969',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'THREE',
            char: '३'
        },
        '4': {
            code: 'U+096A',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'FOUR',
            char: '४'
        },
        '5': {
            code: 'U+096B',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'FIVE',
            char: '५'
        },
        '6': {
            code: 'U+096C',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'SIX',
            char: '६'
        },
        '7': {
            code: 'U+096D',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'SEVEN',
            char: '७'
        },
        '8': {
            code: 'U+096E',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'EIGHT',
            char: '८'
        },
        '9': {
            code: 'U+096F',
            category: 'NUMBER',
            type: 'DIGIT',
            name: 'NINE',
            char: '९'
        },
        /////////////////////////END DIGITS/////////////////////////

        /////////////////////////DEPENDENT SIGNS/////////////////////////
        ///// SPECIAL SIGNS /////
        '#': {
            code: 'U+094D',
            category: 'SIGN: DEP',
            type: 'VOWEL SIGN',
            name: 'VIRAMA',
            char: '्'
        },
        '##': {
            code: 'U+093C',
            category: 'SIGN: DEP',
            type: 'SIGN',
            name: 'NUKTA',
            char: '़'
        },

        ///// REGULAR /////

        '^E': {
            code: 'U+094E',
            category: 'SIGN: DEP',
            type: 'VOWEL SIGN',
            name: 'PRISHTHAMATRA E',
            char: 'ॎ'
        },
        '-^': {
            code: 'U+0955',
            category: 'SIGN: DEP',
            type: 'VOWEL SIGN',
            name: 'CANDRA LONG E',
            char: 'ॕ'
        },
        '-M': {
            code: 'U+0900',
            category: 'SIGN: DEP',
            type: 'SIGN',
            name: 'INVERTED CANDRABINDU',
            char: 'ऀ'
        },
        'MM': {
            code: 'U+0901',
            category: 'SIGN: DEP',
            type: 'SIGN',
            name: 'CANDRABINDU',
            char: 'ँ'
        },
        'M': {
            code: 'U+0902',
            category: 'SIGN: DEP',
            type: 'SIGN',
            name: 'ANUSVARA',
            char: 'ं'
        },
        'H': {
            code: 'U+0903',
            category: 'SIGN: DEP',
            type: 'SIGN',
            name: 'VISARGA',
            char: 'ः'
        },

        '-|': {
            code: 'U+0951',
            category: 'SIGN: DEP',
            type: 'STRESS SIGN',
            name: 'UDATTA',
            char: '॑'
        },
        '-_': {
            code: 'U+0952',
            category: 'SIGN: DEP',
            type: 'STRESS SIGN',
            name: 'ANUDATTA',
            char: '॒'
        },

        /////////////////////////END DEPENDENT SIGNS/////////////////////////

        /////////////////////////INDEPENDENT SIGNS/////////////////////////
        'O': {
            code: 'U+0950',
            category: 'SIGN: IND',
            type: 'UNCLASSIFIED',
            name: 'OM',
            char: 'ॐ'
        },
        '\\': {
            code: 'U+0964',
            category: 'SIGN: IND',
            type: 'PUNCTUATION',
            name: 'DANDA',
            char: '।'
        },
        '|': {
            code: 'U+0965',
            category: 'SIGN: IND',
            type: 'PUNCTUATION',
            name: 'DOUBLE DANDA',
            char: '॥'
        },
        '-0': {
            code: 'U+0970',
            category: 'SIGN: IND',
            type: 'ABBREVIATION SIGN',
            name: 'ABBREVIATION SIGN',
            char: '॰'
        },
        '^.': {
            code: 'U+0971',
            category: 'SIGN: IND',
            type: 'ABBREVIATION SIGN',
            name: 'HIGH SPACING DOT',
            char: 'ॱ'
        },
        '-:': {
            code: 'U+097D',
            category: 'SIGN: IND',
            type: 'LETTER',
            name: 'GLOTTAL STOP',
            char: 'ॽ'
        },
        '-s': {
            code: 'U+093D',
            category: 'SIGN: IND',
            type: 'SIGN',
            name: 'AVAGRAHA',
            char: 'ऽ'
        },
        /////////////////////////END INDEPENDENT SIGNS/////////////////////////

        /*
         *  DEPRICATED
         *  '-a': { code: 'U+0904', category: 'VOWEL', type: 'LETTER',      name: 'SHORT A',            char: 'ऄ'  },
         *  '-;': { code: 'U+0953', category: 'SIGN: DEP', type: '',               name: 'GRAVE ACCENT',           char: '॓' },      //   '॓'
         *  '-'': { code: 'U+0954', category: 'SIGN: DEP', type: '',               name: 'ACUTE ACCENT',           char: 'U+0954' },   //'॔'
         */
    };

    var hasProp = function( obj, prop ){
      return( obj.hasOwnProperty( prop ) );
    };

    var getRows = function(){

      var char,
          rows = [];

      for(var key in map){

        var o         = map[key],
            category  = o.category;

        if(hasProp( o, 'matra' )){
          char = o.char + ' - क' + o.matra;
        } else
        if(category === 'SIGN: DEP'){
          char = 'क' + o.char;
        } else {
          char = o.char;
        }

        rows.push({
          name: o.name,
          code: o.code,
          cat: category,
          key: key,
          char: char
        });

      }

      return rows;
    }

    $scope.charTypeOptions = [
      { text: 'Vowels',  value: 'VOWEL'},
      { text: 'Consonants',  value: 'CONSONANT'},
      { text: 'Digits',  value: 'NUMBER'},
      { text: 'Dependent Signs',  value: 'SIGN: DEP'},
      { text: 'Independent Signs',  value: 'SIGN: IND'},
    ];



    $scope.options = [
      { text: 'Rajdhani',  value: 'rajdhani'},
      { text: 'Glegoo',  value: 'glegoo'},
      { text: 'Halant',  value: 'halant'},
      { text: 'Teko',  value: 'teko'},
      { text: 'Noto Sans',  value: 'noto-sans'},
      { text: 'Khand',  value: 'khand'},
      { text: 'Rozha One',  value: 'rozha-one'},
      { text: 'Ek Mukta',  value: 'ek-mukta'},
      { text: 'Hind',  value: 'hind'},
      { text: 'Kalam',  value: 'kalam'},
      { text: 'Karma',  value: 'karma'},
      { text: 'Vesper Libre',  value: 'vesper-libre'},
      { text: 'Sarpanch',  value: 'sarpanch'},
      { text: 'Laila',  value: 'laila'}
    ];

    $scope.selectedFont   = $scope.options[0];
    $scope.demoFont       = $scope.options[0];

    $scope.showDemoOptions = true;
    $scope.showOptions = true;



    $scope.hideMobileMenu = true;
    $scope.hideDefaultOpt = false;


    $scope.rows           = getRows();

    $scope.showFontOpts = true;
    $scope.showFilterOpts = false;

    $scope.showOneOpts = function(icon){
      if(icon === 'fonts'){
        $scope.showFontOpts = !$scope.showFontOpts;
        $scope.showFilterOpts = false;
      } else
      if(icon === 'filters'){
        $scope.showFilterOpts = !$scope.showFilterOpts;
        $scope.showFontOpts = false;
      }
    };

    $scope.cbmodel = {
      autoAddVirama:true,
      autoRemoveVirama:true
    };

    $scope.textInputs = {
      defaultInput:                   '',
      autoAddVirama:                  '',
      autoRemoveVirama:               '',
      autoRemoveViramaAutoAddVirama:  ''
    };

    $scope.hideInputs = {
      defaultInput:                   false,
      autoAddVirama:                  true,
      autoRemoveVirama:               true,
      autoRemoveViramaAutoAddVirama:  true
    };

    $scope.onChange = function(cbmodel){

      var autoAddViramaIsChecked    = cbmodel.autoAddVirama,
          autoRemoveViramaIsChecked = cbmodel.autoRemoveVirama;

      if(autoAddViramaIsChecked && autoRemoveViramaIsChecked){

        $scope.hideInputs = {
          defaultInput:                   false,
          autoAddVirama:                  true,
          autoRemoveVirama:               true,
          autoRemoveViramaAutoAddVirama:  true
        };

      } else
      if(autoAddViramaIsChecked && !autoRemoveViramaIsChecked){

        $scope.hideInputs = {
          defaultInput:                   true,
          autoAddVirama:                  true,
          autoRemoveVirama:               false,
          autoRemoveViramaAutoAddVirama:  true
        };

      } else
      if(!autoAddViramaIsChecked && autoRemoveViramaIsChecked){

        $scope.hideInputs = {
          defaultInput:                   true,
          autoAddVirama:                  false,
          autoRemoveVirama:               true,
          autoRemoveViramaAutoAddVirama:  true
        };

      } else
      if(!autoAddViramaIsChecked && !autoRemoveViramaIsChecked){

        $scope.hideInputs = {
          defaultInput:                   true,
          autoAddVirama:                  true,
          autoRemoveVirama:               true,
          autoRemoveViramaAutoAddVirama:  false
        };

      }

      // Reset the value of text fields to ''
      $scope.textInputs = {
        defaultInput:                   '',
        autoAddVirama:                  '',
        autoRemoveVirama:               '',
        autoRemoveViramaAutoAddVirama:  ''
      };


    };

  });

}());
