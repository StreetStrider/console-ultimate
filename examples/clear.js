

var console, Console = require('..');

console = Console(null, null,
{
	features:
	{
		clear:
		{
			streams: [ 'stdout', 'stderr', 'another' ]
		}
	}
});

console.log('clear in 3s…');

setTimeout(function ()
{
	console.clear();

	console.log('cleared');
}
, 3000);
