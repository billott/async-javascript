/**
 * Created by billdott on 12/23/2015.
 */
var Rx = require('rx');

//console.clear();
//+ "\n" + "Running JavaScript > observable-index.observable-array "

console.log(  "\n" + "------------------------------------------------"
    + "\n" + "Running JavaScript > nodemon  observable-array.js "
    + "\n" + "------------------------------------------------" + "\n");

/*

// Observable Array Sample Data
// Creating Observable assigned array as follows...
var source1 = Rx.Observable.fromArray([0,1,2,3,4,5,6,7]);

// Asynchronous collection increments over time
// 500 milli-seconds equals a half second interval to increment number
source1 = Rx.Observable.interval(200).take(6);

// high order functions to be used on async data
// filter down to getting the odd numbers from the array
source1.filter(x=> x % 2 === 1)
    .map(x=>x+'!')
    .forEach(x=>console.log(x));
*/


// rxjs contains some of the same functions as underscore and lowdash js libraries
// Such as functions like: zip, merge, concat,

// Creating an Observable with RxJS
var source = Rx.Observable.create(function(observer){

    var timeDelay = 1000;

    // operator chain from Observable collection
    var id =
    setTimeout(function(){
        try{
            // Custom logic for the observable

            // create an error to test the functional flow
            //throw 'my bad error';
            console.log('timeout hit, Start timeout timer for <'+timeDelay+'> milliseconds.');
            // Emit a value onNext
            observer.onNext(42);
            observer.onCompleted();

        }
        catch (error){
            observer.onError(error);
        }
    }, timeDelay);

    console.log('started, Observable.');

    return function (){
        // Suggest calling cleanup functions related to observable here
        console.log('disposal called');
        clearTimeout(id);
    };
});

// never means never emits a value on completion
//Rx.Observable.never();

// Observable will be observed with the following hanlders...
var sub = source.subscribe(function(x){
    console.log('next (' + x + ') from onNext() with parameter value passed here.');
}, function(err){
    console.log('onError from subscribe.');
    console.error(err);
}, function(){
    console.log('done, onCompleted called now.');
});

/*
    // May overwrite the setTimeout function
    setTimeout(function(){
        sub.dispose();
    }, 500);
*/

// RxJS Observables vs. Promises

console.log("\n" + "END OF Returning Observable Array and Subscribe ");
console.log("------------------------------------------------" + "\n");
