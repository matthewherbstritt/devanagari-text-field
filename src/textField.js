var devanagariTextField = (function(){

  var canIgnoreKeyCode  = function(keyCode){
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
  };

  var setCaretIndex = function(tf, caretIndex){

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

  };

  var isValidCtrlCombo = function(ctrlKey, keyCode){
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

  var outputString = function(tf, string){
    tf.element.value = string;
  };

  var incrementKeyEventCount = function(tf, event){

    var eventType = event.type,
        keyCode   = event.which || event.keyCode;

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

      ){
        return;
      }
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

  var keyHeldDown = function(tf){
    return(tf.keyupCount !== tf.keydownCount)
  };

  var undoKeyHeldDown = function(tf){

    var caretIndex    = util.getCaretIndex(tf.element),
        newCaretIndex = caretIndex - tf.keydownCount;

    tf.element.value  = tf.inputString;
    tf.keydownCount   = 0;
    tf.keyupCount     = 0;
    console.log('undoKeyHeldDown')
    setCaretIndex(tf, newCaretIndex);

  }

  var handleClick = function(tf){
    tf.key = null;
    tf.cachedKey = null;
    tf.cachedInputString = null;
    tf.cachedInputStringKeyRemoved = null;

  };

  var handleBlur = function(tf){

    console.log('--------blur--------');
    tf.key = null;
    tf.cachedKey = null;
    tf.cachedInputString = null;
    tf.cachedInputStringKeyRemoved = null;

  };


  var handleFocus = function(tf){

    console.log('--------focus--------');

    tf.inputString = tf.element.value;
  };

  var handleChange = function(tf){

    console.log('--------focus--------');

    tf.inputString = tf.element.value;
  };



  var handleKeydown = function(tf, event){

    var keyCode     = event.keyCode ? event.keyCode : event.which,
        shiftKey    = event.shiftKey,
        ctrlKey     = event.ctrlKey,
        settings    = tf.settings;

    tf.cachedCtrlKey = tf.ctrlKey;
    tf.ctrlKey = ctrlKey;

    tf.cachedShiftKey = tf.shiftKey;
    tf.shiftKey = shiftKey;

    tf.cachedKeyCode = tf.keyCode;
    tf.keyCode = keyCode;

    var shiftKey =  event.shiftKey,
        ctrlKey  = event.ctrlKey,
        keyCode  = event.keyChar || event.which;

    incrementKeyEventCount(tf, event);

  };

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

        util.addEvent(this.element, 'click', function(){
          handleClick(self);
        });

        util.addEvent(this.element, 'keydown', function(event){
          handleKeydown(self, event || window.event);
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

  DevanagariTextField.prototype.onKeyup = function(event){

      var keyCode     = event.keyCode ? event.keyCode : event.which,
          shiftKey    = event.shiftKey,
          ctrlKey     = event.ctrlKey,
          settings    = this.settings;

      this.cachedCtrlKey = this.ctrlKey;
      this.ctrlKey = ctrlKey;

      this.cachedShiftKey = this.shiftKey;
      this.shiftKey = shiftKey;

      this.cachedKeyCode = this.keyCode;
      this.keyCode = keyCode;

      if(ctrlKey && keyCode === 90){console.log( 'ctrl + z'); return;}

      if(shiftKey && ctrlKey && keyCode === 54){
        toggleScript(this);
        return
      }

      if( settings.scriptMode === 'Roman' ){ return; };


      incrementKeyEventCount(this, event);

      if(keyHeldDown(this)){

        undoKeyHeldDown(this);
        return ;
      }

      this.keydownCount = 0;
      this.keyupCount = 0;

      console.log('this.inputString: ' + this.inputString);
      console.log('this.cachedInputString: ' + this.cachedInputString);
      //console.log('this.inputString.length: ' + this.inputString.length);
      //console.log('this.cachedInputString.length: ' + this.cachedInputString.length);
      console.log('-------------------------------------------------------------------')

      this.cachedInputString = (this.inputString != null) ? this.inputString : '';
      this.inputString = this.element.value;

      console.log('this.inputString: ' + this.inputString);
      console.log('this.cachedInputString: ' + this.cachedInputString);
      console.log('this.inputString.length: ' + this.inputString.length);
      console.log('this.cachedInputString.length: ' + this.cachedInputString.length);

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
        setCaretIndex(this, outputStartSub.length + 1);

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
          setCaretIndex(this, outputSubstr1.length);
          return;

        }

      } else {

        output = this.inputStringKeyRemoved;
        outputString(this, output);

        // -1 to account for the removed key
        setCaretIndex(this, caretIndex -1);

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

    }

    var init = function(elementId, options){
      var te = document.getElementById(elementId);
      return new DevanagariTextField(te, options);
    };

    return init;

}());
