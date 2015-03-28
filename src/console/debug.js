


var
	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'debug'))
	{
		console.debug = debug(console);
	}
}

function debug (console)
{
	return function debug ()
	{
		return console.log.apply(console, arguments);
	}
}
