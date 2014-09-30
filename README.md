# Devanagari Text Field


## About

Devanagari Text Field is small open source JavaScript plugin which enables
users to type Devanagari characters in HTML text inputs and textareas
using standard Roman script keyboards. The default key mappings are designed to reflect the
sound of each Devanagari character rather than attempt to mimic the layout of
<a href='http://en.wikipedia.org/wiki/InScript_keyboard'>InScript keyboards</a>. It is hoped
that in future versions there will be support for adding custom key mappings.





## Installation

As a global variable:


```html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    	<input type='text' id='myTextElement'/>
        <script src='path/to/devanagariTextField.js'></script>
        <script src='path/to/myExternalJSFile.js'></script>
    </body>
</html>
```
```javascript
// myExternalJSFile.js

(function(devanagariTextField){
	devanagariTextField('myTextElement');
}(devanagariTextField));

```
Using an AMD loader:

```javascript
require(['devanagariTextField'], function(devanagariTextField) {
	devanagariTextField('myTextElement');
});
```


## Options
It is possible to change some default behaviour by passing in an options object as a second argument.

```javascript
var options = {
	autoAddVirama: false,
    // etc.
};

devanagariTextField('myTextElement', options);
```

Currently, the configurable parameters are as follows:

**autoAddVirama**  (boolean) default: true

Adds a virama (also known as a *halant*) character after every consonant.

**autoRemoveVirama**  (boolean) default: true

Removes any trailing virama character when the presses space.

**toggleScriptKey:**  (string) default: 'Ctrl+Shift+T'

Sometimes Roman script characters may need to be used amongst the Devanagari characters, such as question marks, exclamation marks etc. Since many of these characters are mapped to a Devanagari character it is necessary to be able to switch back to the standard Roman script keys (i.e. to temporarily turn off the Devanagari script mode) to input the required character. For this you can type the key combination defined in this parameter to toggle back and forth between Roman and Devanagari scripts.


## Support

The project is still in development and is largely untested. It has been manually tested in the following browsers:

* Chrome
* Firefox
* IE 11
* Opera


## To Do

* Find an effective way to do automated integration tests which reliably reproduce keyboard events. Currently experimenting with [Syn]( https://github.com/bitovi/syn).
* Support for user defined options is incomplete and needs work. Specifically:
 * Values need to be validated.
 * No support for changing the default script toggle key combination.
 * No support for adding user defined key mappings. If it's not feasible to provide a totally customizable interface it would be
 nice to be able to offer some predefined alternatives, e.g. mimicking the IndoScript keyboard layout.
* Add support for mobile devices.
* Complete online demo.
