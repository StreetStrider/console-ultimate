


var
	noop = require('aux.js/noop'),
	get = require('object-path').get,

	format = require('../format').format,

	isOn = require('../feature').isOn;

module.exports = function (console)
{
	if (isOn(console, 'trace'))
	{
		setup(console);
	}
	else
	{
		stub(console);
	}
}

function setup (console)
{
	var isAdvanced = get(console.options, 'features.trace.advanced', 'linux')

	if (isAdvancedPlatform(isAdvanced))
	{
		require('trace')
	}
	if (isAdvanced)
	{
		require('clarify')
	}

	console.trace = function trace ()
	{
		var error = new Error(format(arguments));

		error.name = 'Trace';
		Error.captureStackTrace(error, trace);

		console.error(error.stack);
	}
}

function isAdvancedPlatform (value)
{
	if (typeof value === 'string')
	{
		return value === process.platform
	}
	else
	{
		return !! value
	}
}

function stub (console)
{
	console.trace = noop;
}
