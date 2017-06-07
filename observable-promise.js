/**
 * Created by billdott on 12/27/2015.
 *
 *  RxJS observables vs promises
    Asynchronous functions typically get managed by callbacks or promises
 */
var Rx = require('rx');

// Promise will always fires the event handler
// or make the AJAX call (NO WAIT)

// Arrow functions / closures
var promise = new Promise((resolve) => {
    // Promise Block always fires off and no wait
    setTimeout(() => { console.log('promise 42 timeout hit');
                       resolve(42);},
                     500 );
    console.log('promise 42 started');
});

// Execute the Promise and are NOT LAZY
promise.then(x => console.log(x));

// What are the advantage of Observable over Promise?
// Setup and Teardown function returns

// Create an Observable which are LAZY
var source = Rx.Observable.create((observer) => {
    // id tracks the observable block of functions
    var id = setTimeout(() => {
        console.log('observable 43 timeout hit');
        observer.onNext(43);
        }, 1000);

    console.log('observable 43 started');

    return () => {
        // Teardown block as follows...
        console.log('dispose 43 called');
        clearTimeout(id);
    };
});

// Use forEach instead of "THEN"
// Observable are LAZY execution
var disposable = source.forEach(x =>
    console.log(x));

// Overwrites the setTimeout in the Observable
// Calling dispose quicker than the observable block
setTimeout(() => {
    disposable.dispose();},
    500);
