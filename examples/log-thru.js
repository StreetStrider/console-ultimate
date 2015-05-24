

var
	partial = require('aux.js/fn/partial');

var
	Console = require('..'),
	console = Console();

[ 'a', [ 'b' ], { c: 3 } ]
.map(console.log.thru)
.map(console.info.thru)
.map(console.dir.thru);
