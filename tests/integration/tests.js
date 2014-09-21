(function(){

  var textBox, textArea,
     fixture = document.getElementById('qunit-fixture');
     
   var vals = [
    {input: 'a', output: 'अ'},
    {input: '^a', output: 'ॲ'},
    {input: 'aa', output: 'आ'},
   ];

  QUnit.module( "module", {

    setup: function( assert ) {

      textBox        = document.createElement('input');
      textBox.type   = 'text';
      textBox.value  = '';

      textArea       = document.createElement('textarea');
      textArea.value = ' ';

      textBox.setAttribute("id", "textBox");
      textArea.setAttribute("id", "textArea");

      fixture.appendChild(textBox);
      fixture.appendChild(textArea);

      devanagariTextField('textBox');

    },

    teardown: function( assert ) {

      fixture.removeChild(textBox);
      fixture.removeChild(textArea);

    }

  });

  for(var i = 0; i < vals.length; i++){

    var v = vals[i];
    var inp = v.input;
    var out = v.output;

    QUnit.asyncTest( inp + " === " + out, function( assert ) {

      expect(1);

      Syn.type(inp, textBox);

      

      setTimeout(function() {
        assert.deepEqual(textBox.value, out);
        QUnit.start();
      }, 500);

    });

  }

  

}());
