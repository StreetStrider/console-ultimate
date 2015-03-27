


var
	noop = require('aux.js/noop'),

	format = require('../format').format

	defaultEnabled = require('../options').defaultEnabled;

module.exports = function (console)
{
	if (defaultEnabled(console.options, 'trace'))
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
	console.trace = function trace ()
	{
		/* @todo: better stack traces */
		var error = new Error(format(arguments));

		error.name = 'Trace';
		Error.captureStackTrace(error, trace);

		console.error(error.stack);
	}
}

function stub (console)
{
	console.trace = noop;
}
