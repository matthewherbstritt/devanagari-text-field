var keyMap = (function(){

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

}());
