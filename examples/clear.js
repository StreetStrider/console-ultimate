

var console, Console = require('..');

console = Console(null, null, {
	clear: true
});

console.log('clear in 3s…');

setTimeout(function ()
{
	console.clear();

	console.log('cleared');
}
, 3000);
