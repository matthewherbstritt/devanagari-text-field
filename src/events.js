define(['util'], function(util){

  var events = {};

  function keyIsHeldDown(keydownCount, keyupCount){
    return(keydownCount > keyupCount);
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

  events.toggleScript = function(){

    var caretIndex    = this.getCaretIndex(),
        switchToRoman = (this.settings.scriptMode === 'Devanagari');

    if(switchToRoman){

      this.settings.scriptMode = 'Roman';

      this.clearKeyAndStringCache();
      this.resetKeyEventCount();

    } else {

      this.settings.scriptMode    = 'Devanagari';
      this.devanagariCharObj      = null;
      this.inputStringKeyRemoved  = null;
      this.inputString            = this.element.value;

      this.clearKeyAndStringCache();
      this.resetKeyEventCount();
      
    }

  };

  events.resetKeyEventCount = function(){
    this.keydownCount = 0;
    this.keyupCount   = 0;
  };

  events.incrementKeyEventCount = function(eventType){

    var cachedCtrlKey = this.cachedCtrlKey,
        ctrlKey       = this.ctrlKey,
        cachedKeyCode = this.cachedKeyCode,
        keyCode       = this.keyCode;

    if(eventType === 'keydown'){
      if(isValidCtrlCombo(ctrlKey, keyCode)){
        return;
      }
    } else
    if(eventType === 'keyup'){
      if(
        (cachedCtrlKey && keyCode === 17) || // ctrl + ctrl
        (cachedCtrlKey && keyCode === 65) || // ctrl + a
        (cachedCtrlKey && keyCode === 67) || // ctrl + c
        (cachedCtrlKey && keyCode === 86) || // ctrl + v
        (cachedCtrlKey && keyCode === 88) || // ctrl + x
        (cachedCtrlKey && keyCode === 89) || // ctrl + x
        (cachedCtrlKey && keyCode === 90) || // ctrl + z

        (cachedKeyCode === 65 && keyCode === 17) || // a keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 65) || // control keyup then a keyup

        (cachedKeyCode === 67 && keyCode === 17) || // c keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 67) || // control keyup then c keyup

        (cachedKeyCode === 86 && keyCode === 17) || // c keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 86) || // control keyup then c keyup

        (cachedKeyCode === 88 && keyCode === 17) || // x keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 88) || // control keyup then x keyup

        (cachedKeyCode === 89 && keyCode === 17) || // y keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 89) || // control keyup then y keyup

        (cachedKeyCode === 90 && keyCode === 17) || // z keyup then control keyup
        (cachedKeyCode === 17 && keyCode === 90)  // control keyup then z keyup

      ){ return; }
    }

    if(!canIgnoreKeyCode(keyCode)){
      if(eventType === 'keyup'){
        this.keyupCount = this.keyupCount += 1;
      } else
      if(eventType === 'keydown'){
        this.keydownCount = this.keydownCount += 1;
      }
    }

  };

  events.onKeyHeldDown = function(){

    var caretIndex    = this.getCaretIndex(),
        newCaretIndex = caretIndex - this.keydownCount;

    this.element.value = this.inputString;

    this.resetKeyEventCount();
    this.setCaretIndex(newCaretIndex);

  };

  events.onKeydown = function(e){

    var keyCode     = e.keyCode ? e.keyCode : e.which,
        eventType   = e.type,
        shiftKey    = e.shiftKey,
        ctrlKey     = e.ctrlKey,
        settings    = this.settings;

    this.cacheCtrlKey(ctrlKey);
    this.cacheShiftKey(shiftKey);
    this.cacheKeyCode(keyCode);

    this.incrementKeyEventCount(eventType);

  }

  events.onKeyup = function(event){

      var keyCode     = event.keyCode ? event.keyCode : event.which,
          eventType   = event.type,
          shiftKey    = event.shiftKey,
          ctrlKey     = event.ctrlKey,
          settings    = this.settings;

      this.cacheCtrlKey(ctrlKey);
      this.cacheShiftKey(shiftKey);
      this.cacheKeyCode(keyCode);

      if(shiftKey && ctrlKey && keyCode === 54){
        this.toggleScript();
        return
      }

      if(settings.scriptMode === 'Roman'){ return; };

      this.incrementKeyEventCount(eventType);

      if(keyIsHeldDown(this.keydownCount, this.keyupCount)){
        this.onKeyHeldDown();
        return;
      }

      this.resetKeyEventCount();
      this.cacheInputString();

      if(this.inputString.length > this.cachedInputString.length){

        this.cacheCaretIndex();
        this.cacheKey();

        if(!util.isDevanagari(this.key)){

          this.cacheInputStringKeyRemoved();

        } else {
          return false;
        }

        if(!util.isWhiteSpaceChar(this.key)){

          this.setDevObj();
          this.appendDevanagariChar();
          this.cacheInputString();

        } else {

          if(settings.autoRemoveVirama){

            this.autoRemoveVirama();
            this.cacheInputString();
            return;

          }

          this.clearKeyAndStringCache();

        }

      } else {

        // don't clear cache on shift key keyup, otherwise keys accessed via shift key combos won't work
        if(keyCode !== 16 && keyCode !== 17){
          this.clearKeyAndStringCache();
        }

      }

  };

  events.onClick = function(){
    this.clearKeyAndStringCache();
  }

  events.onChange = function(){
    this.inputString = this.element.value;
  }

  events.onBlur = function(){
    this.clearKeyAndStringCache();
  }

  return events; 

});
