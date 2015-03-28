


var
	reset = require('cli-color').reset,
	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'clear'))
	{
		console.clear = clear(console);
	}
}

function clear (console)
{
	return function clear ()
	{
		/* @todo: do multistream */
		/* @todo: stream(s) choosing */
		console.writer.write('stdout', reset);
		console.writer.write('stderr', reset);
	}
}
