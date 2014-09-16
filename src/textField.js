define(['util', 'keyMap', 'devanagari', 'events'], function(util, keyMap, devanagari, events){

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
