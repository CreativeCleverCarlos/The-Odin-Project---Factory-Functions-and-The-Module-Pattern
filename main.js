
//as a refresher there are global variables and local variables

let globalAge = 23; // This is a global variable



// This is a function - a curly brace indicating this is block scoped or block (local)
function printAge (age) {

  var varAge = 34; // This is a function scoped variable

  // This is yet another curly brace, and thus a block
  if (age > 0) {

    // This is a block-scoped variable that exists

    // within its nearest enclosing block, the if's block

    //note, let, var, and const will behave differently when used within a function and called upon outside. in short, var can leak outside of it's local variable function. var are NOT block scoped, they are function scoped. That means they available outside of the if statement block

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

  const array = [1, 2, 3, 4, 5];
  const [zerothEle, firstEle] = array;

  //ZerothEle and firstEle both are elements that point towards the 0th and 1st indices in the array

  

  //it's not explained very well BUT here goes

  function createUser(name){
    const discordName = "@" + name;

    let reputation = 0; //this is a new metric within the createUser function. This is a private variable (local). It cannot be accessed directly within the object. It can only be accessed by the closures we defined. 

    const getReputation = () => reputation; //the getReputation would be a closure that is defined, Likewise, so is the giveReputation function. 

    const giveReputation = () => reputation++;
    
    return {name, discordName, getReputation, giveReputation};
  }

  const josh = createUser("josh");
  josh.giveReputation();
  josh.giveReputation();

  console.log({ // logs { discordName: "@josh", reputation: 2 }
    discordName: josh.discordName,
    reputation: josh.getReputation()
  });


  //IIEF or immediate invoked function expression is when you create a factory in parantheses and immediately call (invoke it). This is done to wrap sections of code together and to hide variables and function.

  const calculator = ( function (){
      const add = (a, b) => a + b;
      const sub = (a, b) => a - b;
      const mul = (a, b) => a * b;
      const div = (a, b) => a / b;
      return {add, sub, mul, div};
        })(); //so the () here is mandatory otherwise the the whole code doesn't run. The calculator color in the console.log below even goes to yellow rather than blue. dunno why.

console.log(calculator.add(3,5)); //8
console.log(calculator.sub(6,2)); //4
console.log(calculator.mul(8,4));//32
console.log(calculator.div(40,8));//5 

//so the notes are saying that by adding the () at the end, that is what is wrapping the factory function within parantheses, and immediately calling it. The result is returning the object stored in calculator. This is the "hiding/ tuckng away" private variables within the function

//Encapsulation is the process of bundling data, code, or w.e into a single unit, with selective access to the things inside of that unit. That is the wrapping. 

//through Encapsulation, namespacing is developed, which is how naming collisions is avoided. Namespacing being the common word add might want to be re-used to add strings instead, or arrays. But through encapsulation, it's used in the module called calculator, which generates an object with that name. calculator.add(a, b) or calculator.sub(a, b). This way, it is explicitly defined




//knowledge check notes


//BLOCKS AND SCOPING

//https://wesbos.com/javascript-scoping

//was good, talked about how you cannot have avvess to variables within functions, unless it is var, because that leaks out as a local variable. Functions cannot be called upon within other function as global functions... if that makes sense. 


//CLOSURE AND LEXICAL SCOPING

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#closure

//closure is basically calling upon/returning the a local function inside another function. Thus making access to the inside function unavaiable and creating a factory that cannot be accessed from the outside. Lexical scoping is an inside function having access to every it's surrounding or "global" function 


//IIFEs - immediately invoked function expression

//https://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html

// it's really short but basically its just this

(function (){
  //logic here
})(); // this is to make it so there is no global name that is used for one (it's wrapped up in a bracket)

//for two, it makes it so that it isn't run accidently by calling on its name

//also, it prevents there from being any name collisions. 

//it's actually really rather simple. It helps with security, cause now the inside of it can't be breached from the dom, and it doesn't create any global namespace

(function declaringAName(){
  let name2 = "Sarah"
  console.log(name2)
})();

let name2 = "Amanda" //this is a global variable. dis is baad
console.log(name2)


//MODULE

//https://dev.to/tomekbuszewski/module-pattern-in-javascript-56jm

//A module is described as a singleton class. It only has one instance and "exposes its members, but it doesn't have any kind of internal state"

//it's defined by having aIIFE created first

const SomeModule = (function() {})();

const Formatter = (function(){
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
})();

/**if**/
// Formatter.log("hello") //this returns uncaught error, because it doesn't return anything

//so in short, accessing a module, is actually accessing specifically whatever it returns. It's best to avoid returning a single function, return an object with it

const FormatterDoneRight = (function(){
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };
  return {
    makeUppercase,
  }
})(); //remember to add the () to the end, otherwise it won't be a Module

console.log(FormatterDoneRight.makeUppercase("tomek")); //returns TOMEK 

//so this get's a lot more complicated... but what ive seen in other videos is that this is the old way of doing things, and the new way is legit done by classes 


//this was how it was done before ES6
(function(){
  //declare private variables and/ or functions

  return {
    //declare public variables and/or functions
    //when returning, it's good practice to return objects because it can return all the data at once
    
  }
})();


//in short, just stick to classes now. If I have to come back to learn this I can, thats fine. I can for the most part understand what I'm seeing and follow along, I just need to practice it is all and copy out what I see in code