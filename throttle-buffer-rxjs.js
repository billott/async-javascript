/**
 * Created by billdott on 12/27/2015.
 */
var btn = document.querySelector('#clickMe');

var clicks = Rx.Observable.fromEvent(btn, 'click');

/*
var open = Rx.Observable.interval(1000);
clicks.scan(0, (s) => s + 1)
    .buffer(open)
    .forEach(x => sendValues(x));
*/

// Stream of button click events from web page
// Observable.Throttle
// If delay greater one second then flush the buffer
// and then send buffer element to display
clicks.scan(0, (s) => s + 1)
.buffer(clicks.throttle(1000))
    .forEach(x => sendValues(x));

function sendValues(arr) {
    var pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(arr);
    document.querySelector('#results')
        .appendChild(pre);
}
