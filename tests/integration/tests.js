(function(){

  var textBox, textArea,
     fixture = document.getElementById('qunit-fixture');

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

    },

    teardown: function( assert ) {

      fixture.removeChild(textBox);
      fixture.removeChild(textArea);

    }

  });

  QUnit.asyncTest( "test a", function( assert ) {

    expect(1);

    //Syn.type('ka[left][space][left]ka', textBox);

    setTimeout(function() {
      textBox.value = 'a'
    }, 250);

    setTimeout(function() {
      assert.deepEqual(textBox.value, 'a');
      QUnit.start();
    }, 500);

  });

  QUnit.asyncTest( "test b", function( assert ) {

   expect(1);

    setTimeout(function() {
      textBox.value = 'b'
    }, 250);

    setTimeout(function() {
      assert.deepEqual(textBox.value, 'b');
      QUnit.start();
    }, 500);

  });

}());
