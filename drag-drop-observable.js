/**
 * Created by billdott on 12/26/2015.
 */

var Observable = Rx.Observable;

var parent = document.getElementById("parent");
var widget = document.getElementById("widget");

// DOM Event mapping with Observable collections
var mouseDowns = Observable.fromEvent(widget, "mousedown");
var parentMouseMoves = Observable.fromEvent(parent, "mousemove");
var parentMouseUps = Observable.fromEvent(parent, "mouseup");

// var stocks =
//   exchanges.
//     map(function(exchange) {
//       return exchange.stocks.
//         filter(function(stock) { return stock.price >= 100.00; });
//     }).
//     concatAll();

// Creates a two dimension collections
// Declaring Observable Expression as follows...
var drags =
    mouseDowns.
    map(function(e) {
        //throw "error";
        return parentMouseMoves.
        takeUntil(parentMouseUps);
        // All mouse moves until mouse up event from the parent
    }).
    concatAll();
// will always flatten observable, like multiple dimensional array implementation

// forEach will consume the collection of mouse move events
// Observable object will have for each functionality
var subscription =
    drags.forEach(
        function onNext(e) {
            widget.style.left = e.clientX + "px";
            widget.style.top = e.clientY + "px";
            console.log("Widget move top:  " + widget.style.top + ", left: "+widget.style.left);
        },
        function onError(error) {
            console.log('on Error');
            // Not called. DOM events don't emit error exceptions
        },
        function onCompleted() {
            console.log('on Complete');
            // Not called. Subscribing to DOM never ends.
        });

