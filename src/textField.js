define(['util', 'keyMap', 'devanagari', 'events'], function(util, keyMap, devanagari, events){

  function DevanagariTextField(element, options){

    var self      = this, 
        settings  = util.getSettings({

          autoAddVirama:true, 
          autoRemoveVirama:true,
          toggleScriptButton: false,
          toggleScriptKey: 'Ctrl+Shift+T',
          scriptMode: 'Devanagari',
          customKeyMap: false

        }, options);

    if(!util.isValidTextElement(element)){
      throw new Error('Element must be a text element.');
    }

    this.element                      = element;
    this.settings                     = settings;
    this.keyMap                       = keyMap.build(settings);
    this.devanagariCharObj            = null;

    this.keydownCount                 = 0;
    this.keyupCount                   = 0;

    this.caretIndex                   = this.getCaretIndex();
    this.cachedCaretIndex             = null;

    this.key                          = null;
    this.cachedKey                    = null;

    this.inputString                  = element.value;
    this.cachedInputString            = null;

    this.inputStringKeyRemoved        = null;
    this.cachedInputStringKeyRemoved  = null;

    util.addEvent(this.element, 'keyup', function(event){
      self.onKeyup(event || window.event);
    });

    util.addEvent(this.element, 'keydown', function(event){
      self.onKeydown(event || winow.event);
    });

    util.addEvent(this.element, 'click', function(){
      self.onClick();
    });

    util.addEvent(this.element, 'blur', function(){
      self.onBlur();
    });

    util.addEvent(this.element, 'change', function(){
      self.onChange();
    });

  }

  DevanagariTextField.prototype.autoRemoveVirama = function(){

    var output, spaceChar, inputStrSpaceCharRemoved, inputStrStartSubSpaceCharRemoved,
        caretIsAtEnd = (this.caretIndex === this.element.value.length);

    if(caretIsAtEnd){

      spaceChar                = this.inputString.slice(-1);
      inputStrSpaceCharRemoved = this.inputString.slice(0, -1);
      output                   = devanagari.removeVirama(inputStrSpaceCharRemoved) + spaceChar;

      this.outputString(output);

    } else {

      spaceChar                        = this.inputString.slice(this.caretIndex - 1, this.caretIndex);
      inputStrStartSubSpaceCharRemoved = this.inputString.slice(0, this.caretIndex - 1);
      inputStrEndSub                   = this.inputString.slice(this.caretIndex);
      outputStartSub                   = devanagari.removeVirama(inputStrStartSubSpaceCharRemoved);
      output                           = outputStartSub + spaceChar + inputStrEndSub;

      this.outputString(output);
      this.setCaretIndex(outputStartSub.length + 1);

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

        this.outputString(output);

        return;

      } else {

        if(removeLast){

          outputSubstr1 = devanagari.appendChar(cachedInputSubstr1, devanagariCharObj, settings);
          output = outputSubstr1 + inputSubstr2;

        } else {

          outputSubstr1 = devanagari.appendChar(inputSubstr1, devanagariCharObj, settings);
          output =  outputSubstr1 + inputSubstr2;

        }

        this.outputString(output);
        this.setCaretIndex(outputSubstr1.length);
        return;

      }

    } else {

      output = this.inputStringKeyRemoved;
      this.outputString(output);

      // -1 to account for the removed key
      this.setCaretIndex(caretIndex -1);

    }

  };

  /*
  * Adapted from Tim Down's answer see
  * http://stackoverflow.com/questions/4928586/get-caret-position-in-html-input
  */
  DevanagariTextField.prototype.getCaretIndex = function(){

    var normalizedValue, range, textInputRange, len, endRange,

        start = 0,
        end   = 0,
        el    = this.element;
        
      if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number'){
          start = el.selectionStart;
          end   = el.selectionEnd;
      } else {
          range = document.selection.createRange();

          if (range && range.parentElement() === el) {
              len = el.value.length;
              normalizedValue = el.value.replace(/\r\n/g, '\n');

              // Create a working TextRange that lives only in the input
              textInputRange = el.createTextRange();
              textInputRange.moveToBookmark(range.getBookmark());

              // Check if the start and end of the selection are at the very end
              // of the input, since moveStart/moveEnd doesn't return what we want
              // in those cases
              endRange = el.createTextRange();
              endRange.collapse(false);

              if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
                  start = end = len;
              } else {
                  start = -textInputRange.moveStart('character', -len);
                  start += normalizedValue.slice(0, start).split('\n').length - 1;

                  if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
                      end = len;
                  } else {
                      end = -textInputRange.moveEnd('character', -len);
                      end += normalizedValue.slice(0, end).split('\n').length - 1;
                  }
              }
          }
      }

      return end;
  };

  DevanagariTextField.prototype.setCaretIndex = function(caretIndex){

    var range;

      if(this.element != null){

          if(this.element.createTextRange){ // for < IE 9

              range = this.element.createTextRange();

              range.move('character', caretIndex);
              range.select();

          } else {

              if(this.element.selectionStart){

                  this.element.focus();
                  this.element.setSelectionRange(caretIndex, caretIndex);

              } else {
                  this.element.focus();
              }

          }

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

  DevanagariTextField.prototype.cacheShiftKey = function(shiftKey){
    this.cachedShiftKey = this.shiftKey;
    this.shiftKey       = shiftKey;
  };

  DevanagariTextField.prototype.cacheCtrlKey = function(ctrlKey){
    this.cachedCtrlKey  = this.ctrlKey;
    this.ctrlKey        = ctrlKey;
  };

  DevanagariTextField.prototype.cacheKeyCode = function(keyCode){
    this.cachedKeyCode  = this.keyCode;
    this.keyCode        = keyCode;
  };

  DevanagariTextField.prototype.cacheInputString = function(){
    this.cachedInputString  = (this.inputString != null) ? this.inputString : '';
    this.inputString        = this.element.value;
  };

  DevanagariTextField.prototype.cacheInputStringKeyRemoved = function(){

    var elVal                 = this.element.value,
        inputStringKeyRemoved = this.inputStringKeyRemoved,
        caretIndex            = this.caretIndex;

    this.cachedInputStringKeyRemoved = (inputStringKeyRemoved != null) ? inputStringKeyRemoved : '';
    this.inputStringKeyRemoved       = (caretIndex > 0) ? elVal.slice(0, caretIndex - 1 ) + elVal.slice(caretIndex): '';

  };

  DevanagariTextField.prototype.outputString = function(string){
    this.element.value = string;
  };

  DevanagariTextField.prototype.clearKeyAndStringCache = function(){
    this.key                          = null;
    this.cachedKey                    = null;
    this.cachedInputString            = null;
    this.cachedInputStringKeyRemoved  = null;
  };

  DevanagariTextField.prototype.cacheCaretIndex = function(){
    this.cachedCaretIndex = this.caretIndex;
    this.caretIndex       = this.getCaretIndex();
  };

  DevanagariTextField.prototype.cacheKey = function(){

    var caretIndex = this.caretIndex;

    this.cachedKey = this.key;
    this.key       = (caretIndex > 0) ? this.element.value[caretIndex - 1] : '';

  };

  DevanagariTextField.prototype.incrementKeyEventCount  = events.incrementKeyEventCount;
  DevanagariTextField.prototype.resetKeyEventCount      = events.resetKeyEventCount;
  DevanagariTextField.prototype.toggleScript            = events.toggleScript;
  DevanagariTextField.prototype.onKeyHeldDown           = events.onKeyHeldDown;
  DevanagariTextField.prototype.onKeydown               = events.onKeydown;
  DevanagariTextField.prototype.onKeyup                 = events.onKeyup;
  DevanagariTextField.prototype.onClick                 = events.onClick;
  DevanagariTextField.prototype.onChange                = events.onChange;
  DevanagariTextField.prototype.onBlur                  = events.onBlur;

  var init = function(elementId, options){
    var te = document.getElementById(elementId);
    return new DevanagariTextField(te, options);
  };

  return init;

});
