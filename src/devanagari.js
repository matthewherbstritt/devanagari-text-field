define(['util'], function(util){

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
