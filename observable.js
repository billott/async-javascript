/**
 * Created by billdott on 12/23/2015.
 */
// Introducing observable within event processing...

console.log(  "\n" + "------------------------------------------------"
    + "\n" + "Running JavaScript > observable-index.observable"
    + "\n" + "------------------------------------------------" + "\n");

// Rx is provided by Rx.All
// Import script tag as follows...
//<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.0.7/rx.all.js"></script>
var Observable = Rx.Observable;

// Get element from DOM as a handle
var button = document.getElementById('button');

// Create an event handler for the button
var handler = function(e) {
    alert('clicked on first Event Handler');
    button.removeEventListener('click', handler);
};
// Add event handler to button
button.addEventListener('click', handler);

/*
// Use DOM event into Observable for asynchronous data collection
// First Observable that is watching the click stream from the UI
var clicks = Observable.fromEvent(button, 'click');

// event collection get each event data out of Observable
var clicksSubscription =
    // asynchronous collection (Observable)of events from UI
    // Observable.forEach() is different implementation of for [].forEach()
    clicks.forEach(
        // Callback handlers for errors
        function onNext(e) {
            // received the event in loop
            var message = "clicked on clicks subscription:" + JSON.stringify(e);
            alert(message);
            console.log(message);

            // End observable to remove event listener
            // Stop listening for the event
            clicksSubscription.dispose();
        },
        function onError(error) {
            // called on error condition
            console.log('ERROR!');
        },
        function onCompleted() {
            // Observable finished with the event stream
            // then finally display done
            console.log("done");
        });

*/

var clicks = Observable.fromEvent(button, 'click');

// Points stream of data from the event stream from the UI action
// Second Observable is defined to watch the mouse click
// and then get the actual point from the button press action of the UI
var points = clicks.map(function(e){
    console.log("pointerClicks");
    return {x: e.clientX, y: e.clientY};
});

// event collection get each event data out of Observable
var pointsSubscription =
    // asynchronous collection (Observable)of events from UI
    // Observable.forEach() is different implementation of for [].forEach()
    // Observable is a collection watching/subscribing to event boardcast from UI component
    points.forEach(
        // Callback handlers
        function onNext(points) {
            // received the event in loop
            var message = "clicked on points subscription:" + JSON.stringify(points);
            alert(message);
            console.log(message);
            console.log("clientX: " + points.x + ", clientY:" + points.y);
            // End observable to remove event listener
            // Stop listening for the event call dispose() function
            //pointsSubscription.dispose();
        },
        function onError(error) {
            // called on error condition
            console.log('ERROR!');
        },
        function onCompleted() {
            // Observable finished with the event stream
            // then finally display done
            console.log("done");
        });

// Using the map method with Observables
