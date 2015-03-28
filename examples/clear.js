

var console, Console = require('..');

console = Console();

console.log('clear in 3s…');

setTimeout(function ()
{
	console.clear();

	console.log('cleared');
}
, 3000);
