/**
 * Created by billdott on 12/29/2015.
 */
var __filename = "es6-arrow.js";
// Display the JavaScript filename from the nodemon
console.log(  "\n" + "------------------------------------------------"
    + "\n" + "Running JavaScript > nodemon " + __filename.substring(__filename.lastIndexOf('\\')+1)
    + "\n" + "------------------------------------------------" + "\n");

/**
 * ECMAscript version 6 offers the "arrow function"
 * for creating anonymous functions with the scope bound to this operator.
*/
var wdSep = ', ';

var createGreeting = function (message, name){
    return message + wdSep + name;
}

var cg1 = createGreeting('some message 1','MyName1');
console.log('cg1: '+cg1+'\n');

var arrowGreeting1 = (message, name ) => {
    return message + wdSep + name;
}
var ag1 = arrowGreeting1('some message 2','MyName2');
console.log('ag1: '+ag1+'\n');

// No braces then no return keyword
var arrowGreeting2 = (message, name ) => message + wdSep + name;

var ag2 = arrowGreeting2('some message 3','MyName3');
console.log('ag2: '+ag2+'\n');

var arrowGreeting3 = message => "Hello, Donald Trump";
console.log('arrowGreeting3: '+arrowGreeting3+'\n');

var squaredOperator = x => x*x;
console.log('squared: '+squaredOperator(2)+'\n');


//
var customer1 ={
    // scope level of this
    name: "Donald Trump I",

    handleMessage: function (message,handler){
        handler(message);
    },

    receive: function () {
        var that = this;

        // Immediate Invocation
        this.handleMessage("Hello", function(message){
            that.name; // public name at this scope level

            console.log('customer1.handleMessage: ' +
                        'Passin message: ' + message +
                        ', Parent scope name: ' + that.name + '\n');
        })
    }
}

console.log('Calling customer1.receive() now.')
customer1.receive();

// Improved arrow function
var customer2 ={
    name: "Donald Trump II",

    // Immediate Invocation
    // Second argument as handler is the arrow (=>) function pointer reference
    handleMessage: function (message,handler){
        console.log('customer2.handleMessage invoked.')
        // passing message into arrow (=>) function pointer referenced within receive() function below.
        handler(message);
    },

    receive: function () {
        // Arrow operator used below in function...
        // this is referring to parent scope outside of function, within var braces
        // first param argument is first param named message on handleMessage()
        // second param argument is arrow (=>) function pointer returning console log function
        this.handleMessage("Hello, ", message => console.log(message + this.name+'\n'))
    }
}

console.log('Calling customer2.receive() now.')
customer2.receive();
