define(['util'], function(util){

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

    setCaretIndex(tf, newCaretIndex);

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
      (typeof ctrlKey !== undefined && typeof keyCode !== undefined) ||
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
