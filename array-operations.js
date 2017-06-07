/**
 * Created by billdott on 12/23/2015.
 */
// Display the JavaScript filename from the nodemon
console.log(  "\n" + "------------------------------------------------"
    + "\n" + "Running JavaScript > nodemon " + __filename.substring(__filename.lastIndexOf('\\')+1)
    + "\n" + "------------------------------------------------" + "\n");

if (0){
    console.log("Show Window Shell Environment variables as follows...");
    console.log(process.env);
}
//
console.log('Illustrating Asynchronous Programming Examples...'
    + "\n" + "------------------------------------------------" + "\n");
//
// =======================================================
// Building example programs to illustrate techniques of coding without loops
// The Array forEach method example
//
function getStockSymbolsArray(stocks) {
    var symbols = [];
    var counter, stock;
    for(counter =0; counter < stocks.length; counter++) {
        stock = stocks[counter];
        symbols.push(stock.symbol);
    }

    symbols = [];
    // inject a closure into the array foreach method
    // stock object in an array and symbol is element
    stocks.forEach(function(stock) {
        symbols.push(stock.symbol);
    });
    return symbols;
}
//
// =======================================================
// The Array map method example
// Overwriting the map function
//
Array.prototype.map = function(projection){
    var results = [];
    this.forEach(function(item){
        // this closure
        results.push(projection(item));
    });
    return results;
}

function getStockSymbolsMap(stocks) {
    // injecting a projection function
    return stocks.map(function(stock) {
        return stock.symbol;
    })
}
//
// call function called getStockSymbols
var symbols = getStockSymbolsMap([
    { symbol: "XFX", price: 240.22, volume: 23432 },
    { symbol: "TNZ", price: 332.19, volume: 234 },
    { symbol: "JXJ", price: 120.22, volume: 5323 },
]);
console.log(JSON.stringify(symbols));
//
// =======================================================
// The Array filter method example
// match a certain expression
//
function getStocksOver(stocks, minPrice){
    var results = [];
    // comment out use filter prototype
    //stocks.forEach(function(stock) {
    //     custom filter test expression across the all elements in the array
    //    if (stock.price >= minPrice){
    //        results.push(stock);
    //    }
    //}
    // using filter to return the predicate results
    return stocks.filter(function(stock){
        return stock.price >= minPrice;
    });
    //return results;
};
//
// Creating a predicate function will return a boolean {true or false}
Array.prototype.filter = function(predicate){
    var results = [];
    this.forEach(function(item){
        if (predicate(item)) {
            results.push(item);
        }
    });
    return results;
};
//
var expensiveStocks = getStocksOver(
    [
        { symbol: "XFX", price: 240.22, volume: 23432 },
        { symbol: "TNZ", price: 332.19, volume: 234 },
        { symbol: "JXJ", price: 120.22, volume: 5323 },
    ],
    150.00);
// Above defines minimum price for the getStocksOver method
console.log(JSON.stringify(expensiveStocks));
//
// =======================================================
// The Chaining the Array map and filter methods example
// Combining methods to support asynchronously data arrival
//
var stocks = [
    { symbol: "XFX", price: 240.22, volume: 23432 },
    { symbol: "TNZ", price: 332.19, volume: 234 },
    { symbol: "JXJ", price: 120.22, volume: 5323 },
];
//
// =======================================================
// Implementing functional chaining
// Show me the stocks of price larger than $150 per share
// and then show me the stock symbol.
//
var filteredStockSymbols =
    stocks.
    filter(function(stock) {
        // this predicate adds to map by returning object
        return stock.price >= 150.00;
    }).
    map(function(stock) {
        // projection function to get symbol of stock
        return stock.symbol;
    })

console.log("\n"+"Show stock symbols of prices greater than 150 dollars...");
filteredStockSymbols.forEach(function(symbol) {
    console.log(symbol);
});
//
// =======================================================
// The create an Array concatAll method
// so lets flatten nested data structure called exchanges
// meaning from multiple stock markets.
//
var exchanges = [
    [
        { symbol: "DXFX", price: 240.22, volume: 23432 },
        { symbol: "ATNZ", price: 332.19, volume: 234 }
    ],
    [
        { symbol: "EXJ", price: 120.22, volume: 5323 },
        { symbol: "CNYN", price: 88.47, volume: 98275 }
    ]
];
//
// Notice the creation of second array for concat results
Array.prototype.concatAll = function() {
    var results = [];
    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });
    return results;
};
//
console.log("\n"+"Show concatenation of two arrays into one array...");
var stocks =  exchanges.concatAll();
//
stocks.forEach(function(stock) {
    console.log(JSON.stringify(stock));
});
//
console.log("\n"+"SORTING on stock SYMBOL using the concatenation of two arrays into one array...");
stocks.sort(function (a,b){
        if(a.symbol > b.symbol){
            return 1;
        }
        if(a.symbol < b.symbol){
            return 0;
        }
        return 0;
    })
    .forEach(function(stock) {
    console.log(JSON.stringify(stock));
});
//
// =======================================================
// The Observable Introduction
// Rx.JS an array where data is stored over time into the array
// Keeping size of JS Library smallest for JS build process
//
var Rx = require('rxjs');

console.log("\n"+"Returning Observable MAP results: ");
var arrayData = [1,2,3];
Rx.Observable.of(arrayData)
    .map(function (x) {
        console.log(x + '!!!');
    });

console.log("\n"+"Returning Observable SUBSCRIBE results: ");
Rx.Observable.of('hello world')
    .subscribe(function(x) { console.log(x);
    });

console.log("\n"+"Returning 1-2-3 array forEach results: ");
// testing
try{
    // synchronously collection like array
    [1,2,3].forEach(
        function(i){
            console.log(i);
        }
    );
    throw e;
}
catch(e){
    console.log('ERROR! - caught by catch block.');
}
console.log("\n" + "END OF Returning Observable MAP results: " + "\n");
console.log("\n" + "------------------------------------------------" + "\n");
console.log(JSON.stringify(exchanges));
//
// =======================================================
// The Advance Flattening Declaration
// Rx.JS an array where data is stored over time into the array
// Nested data structure as follows...
//
// exchanges.[name,
//            stocks[
//                   symbol,
//                   closes[
//                          {date,price}
//                         ]
//                  ]
//           ]
// exchanges.stocks.closes.{date,price}
//
var exchanges = [
    {
        name: "NYSE",
        stocks: [
            {
                symbol: "XFX",
                closes: [
                    { date: new Date(2014,11,24), price: 240.10 },
                    { date: new Date(2014,11,23), price: 232.08 },
                    { date: new Date(2014,11,22), price: 241.09 }
                ]
            },
            {
                symbol: "TNZ",
                closes: [
                    { date: new Date(2014,11,24), price: 521.24 },
                    { date: new Date(2014,11,23), price: 511.00 },
                    { date: new Date(2014,11,22), price: 519.29 }
                ]
            },
        ]
    },
    {
        name: "TSX",
        stocks: [
            {
                symbol: "JXJ",
                closes: [
                    { date: new Date(2014,11,24), price: 423.22 },
                    { date: new Date(2014,11,23), price: 424.84 },
                    { date: new Date(2014,11,22), price: 419.72 }
                ]
            },
            {
                symbol: "NYN",
                closes: [
                    { date: new Date(2014,11,24), price: 16.82 },
                    { date: new Date(2014,11,23), price: 16.12 },
                    { date: new Date(2014,11,22), price: 15.77 }
                ]
            },
        ]
    }
];
//
Array.prototype.concatAll = function() {
    var results = [];

    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });

    return results;
};
//
// exchanges.{name,stocks}.{symbol,closes}.{date,price}
// Nested array, How many levels deep require in the collection?
//
//[1,2,3].map(function(num) { return num + 1; }) -> [2,3,4]
//[1,2].map(function(num) { return [num + 1, num + 2]; }) -> [[2,3],[3,4]]
//
console.log("\n"+"Christmas Eve Closes... ");
console.log("JS Note: Date(11=>12 December)");
//
// Return object/collection path
// exchanges.stocks.closes.{date,price}
//
var christmasEveCloses =
    exchanges.
    map(function(exchange) {
        // returning stocks array
        return exchange.stocks.
        map(function(stock) {
            // returning closes array
            return stock.closes.
            filter(function(close) {
                return close.date.getMonth() === 11 &&
                    close.date.getDate() === 24;
            }).
            map(function(close) {
                return {
                    symbol: stock.symbol,
                    price: close.price
                };
            });
        }).
        concatAll();  // flatten 2 dim collection (Stocks & Closes)
    }).
    concatAll();  // flatten 1 dim collection (Exchanges)
//
christmasEveCloses.forEach(function(christmasEveClose) {
    console.log(christmasEveClose);
});
//
console.log(  "\n" + "------------------------------------------------"
            + "\n" + "END OF JavaScript > nodemon " + __filename.substring(__filename.lastIndexOf('\\')+1)
            + "\n" + "------------------------------------------------" + "\n");