
//as a refresher there are global variables and local variables

let globalAge = 23; // This is a global variable



// This is a function - a curly brace indicating this is block scoped or block (local)
function printAge (age) {

  var varAge = 34; // This is a function scoped variable

  // This is yet another curly brace, and thus a block
  if (age > 0) {

    // This is a block-scoped variable that exists

    // within its nearest enclosing block, the if's block

    const constAge = age * 2;
    console.log(constAge);
  }

  console.log(constAge);
}

//so what is Closure?

//closure is the combination of a function within a function, where the inside function has access to the outer functions's scope. Them being bundled together is an enclosure, and the inner using the surrounding function is "the lexical environment"

//ex

function init() {
    var name = "Mozilla"; // name is a local variable created by init

    function displayName() { //this is doing lexical scoping. It has access to the variable labelled name, because it is within the function that it is declared in

      // displayName() is the inner function, that forms the closure
     // console.log(name); // shows Mozilla use variable declared in the parent function
    }
    displayName();
  }
  init();

  

  //One problem with constructors is that they look like functions, (the "new" keyword being used after it's been made), but function differently. To the point where it's hard to find the error in your code if used. That's where Factory functions come in


  //for the shorthand method, if the name of the variable is the same name as the property, it doesn't have to be recorded twice

  //ex

  const name = "Bob";
  const age = "28";
  const color = "red";

  const thatObject = {name: name, age: age, color: color};

  console.log(name, age, color) //logs Bob 28 red
  console.log({name, age, color}); //logs name: Bob, age: 28, color: red thanks to the curly brace, it makes it easier to read. wrapping it around in a curly brace turns it into an object

  

  //to "extract" or "unpack" values from an object is called destructuring

  const obj = {a: 1, b: 2};
  const {a, b} = obj;

  //this has created two variables, a and b
  //which are then equal to
  //const a = obj.a
  //const b = obj.b

  console.log(obj.a) // will return 1