

var console, Console = require('..');

console = Console();

function capture (fn)
{
	try
	{
		fn();
	}
	catch (e)
	{
		console.log('caught:', e);
	}
}

capture(function ()
{
	console.assert(false, 'thats_wrong');
});
