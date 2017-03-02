


var
	noop = require('aux.js/noop'),
	get = require('object-path').get,

	format = require('../format').format,

	isOn = require('../feature').isOn;

var PE = require('pretty-error')


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
	var isAdvanced = get(console.options, 'features.trace.advanced', true)

	if (isAdvanced)
	{
		var pe = new PE()

		console.trace = function trace ()
		{
			var error = produce(arguments, trace)

			console.writer.writeln('stdout', pe.render(error))
		}
	}
	else
	{
		console.trace = function trace ()
		{
			var error = produce(arguments, trace)

			console.error(error.stack)
		}
	}
}

function produce (args, trace)
{
	var error = new Error(format(args))

	error.name = 'Trace';
	Error.captureStackTrace(error, trace)

	return error
}

function stub (console)
{
	console.trace = noop;
}
